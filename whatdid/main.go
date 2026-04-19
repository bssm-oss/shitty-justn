package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"
	"net/http"
	"io"
	"sort"
)

const version = "0.2.0"

// --- Types ---

type CommitInfo struct {
	Repo    string `json:"repo"`
	SHA     string `json:"sha"`
	Message string `json:"message"`
	Date    string `json:"date"`
	Author  string `json:"author"`
}

type PullRequestInfo struct {
	Repo      string `json:"repo"`
	Number    int    `json:"number"`
	Title     string `json:"title"`
	State     string `json:"state"`
	URL       string `json:"url"`
	UpdatedAt string `json:"updated_at"`
}

type IssueInfo struct {
	Repo   string `json:"repo"`
	Number int    `json:"number"`
	Title  string `json:"title"`
	Action string `json:"action"`
	URL    string `json:"url"`
}

type Report struct {
	Period struct {
		Start string `json:"start"`
		End   string `json:"end"`
	} `json:"period"`
	Commits      []CommitInfo      `json:"commits"`
	PullRequests []PullRequestInfo `json:"pull_requests"`
	Issues       []IssueInfo       `json:"issues"`
	Summary      struct {
		Repos        []string `json:"repos"`
		TotalCommits int      `json:"total_commits"`
		TotalPRs     int      `json:"total_prs"`
		TotalIssues  int      `json:"total_issues"`
	} `json:"summary"`
}

// --- GitHub API ---

type ghClient struct {
	token  string
	http   *http.Client
}

func newGHClient() *ghClient {
	token := getToken()
	return &ghClient{
		token: token,
		http: &http.Client{
			Timeout: 30 * time.Second,
			Transport: &http.Transport{
				MaxIdleConns:        100,
				MaxIdleConnsPerHost: 100,
				IdleConnTimeout:     30 * time.Second,
				ForceAttemptHTTP2:   true,
			},
		},
	}
}

func getToken() string {
	// 1. env
	if t := os.Getenv("GITHUB_TOKEN"); t != "" {
		return t
	}
	// 2. gh auth token
	out, err := exec.Command("gh", "auth", "token").Output()
	if err == nil {
		t := strings.TrimSpace(string(out))
		if t != "" {
			return t
		}
	}
	fmt.Fprintln(os.Stderr, "❌ GitHub token required.")
	fmt.Fprintln(os.Stderr, "  Run: gh auth login")
	fmt.Fprintln(os.Stderr, "  Or:  export GITHUB_TOKEN=ghp_...")
	os.Exit(1)
	return ""
}

var linkNextRe = regexp.MustCompile(`<([^>]+)>;\s*rel="next"`)

const maxRetries = 3

func (c *ghClient) get(url string) ([]byte, error) {
	return c.doGet(url, 0)
}

func (c *ghClient) doGet(url string, attempt int) ([]byte, error) {
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+c.token)
	req.Header.Set("Accept", "application/vnd.github+json")
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Rate limit: 403 (abuse) or 429 (secondary) → wait and retry
	if (resp.StatusCode == 403 || resp.StatusCode == 429) && attempt < maxRetries {
		wait := rateLimitWait(resp)
		fmt.Fprintf(os.Stderr, "⏳ Rate limited, waiting %v...\n", wait)
		time.Sleep(wait)
		return c.doGet(url, attempt+1)
	}

	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body[:min(len(body), 200)]))
	}
	return io.ReadAll(resp.Body)
}

// getAll follows Link pagination and returns all pages concatenated as a JSON array.
func (c *ghClient) getAll(url string) ([]byte, error) {
	var allItems []json.RawMessage
	cur := url
	for cur != "" {
		data, next, err := c.getPage(cur)
		if err != nil {
			return nil, err
		}
		var page []json.RawMessage
		if err := json.Unmarshal(data, &page); err != nil {
			return data, nil // not an array, return as-is
		}
		allItems = append(allItems, page...)
		cur = next
	}
	return json.Marshal(allItems)
}

func (c *ghClient) getPage(url string) (body []byte, next string, err error) {
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+c.token)
	req.Header.Set("Accept", "application/vnd.github+json")
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, "", err
	}
	defer resp.Body.Close()

	// Rate limit retry
	if resp.StatusCode == 403 || resp.StatusCode == 429 {
		wait := rateLimitWait(resp)
		fmt.Fprintf(os.Stderr, "⏳ Rate limited, waiting %v...\n", wait)
		time.Sleep(wait)
		return c.getPage(url)
	}

	if resp.StatusCode >= 400 {
		b, _ := io.ReadAll(resp.Body)
		return nil, "", fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(b[:min(len(b), 200)]))
	}

	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, "", err
	}

	// Parse Link header for next page
	if link := resp.Header.Get("Link"); link != "" {
		if m := linkNextRe.FindStringSubmatch(link); len(m) == 2 {
			next = m[1]
		}
	}
	return b, next, nil
}

func rateLimitWait(resp *http.Response) time.Duration {
	if reset := resp.Header.Get("X-RateLimit-Reset"); reset != "" {
		if ts, err := strconv.ParseInt(reset, 10, 64); err == nil {
			wait := time.Until(time.Unix(ts, 0)) + time.Second
			if wait > 0 && wait < 10*time.Minute {
				return wait
			}
		}
	}
	// Retry-After (secondary rate limit)
	if ra := resp.Header.Get("Retry-After"); ra != "" {
		if secs, err := strconv.Atoi(ra); err == nil {
			return time.Duration(secs) * time.Second
		}
	}
	return 60 * time.Second // fallback
}

func (c *ghClient) getUser() string {
	data, err := c.get("https://api.github.com/user")
	if err != nil {
		fmt.Fprintf(os.Stderr, "⚠️  Failed to get user: %v\n", err)
		return ""
	}
	var user struct{ Login string }
	json.Unmarshal(data, &user)
	return user.Login
}

func (c *ghClient) getRepos(since time.Time) []string {
	data, err := c.getAll("https://api.github.com/user/repos?sort=pushed&per_page=100&affiliation=owner,collaborator,organization_member")
	if err != nil {
		fmt.Fprintf(os.Stderr, "⚠️  Failed to fetch repos: %v\n", err)
		return nil
	}
	var repos []struct {
		FullName string `json:"full_name"`
		PushedAt string `json:"pushed_at"`
	}
	if err := json.Unmarshal(data, &repos); err != nil {
		fmt.Fprintf(os.Stderr, "⚠️  Failed to parse repos: %v\n", err)
		return nil
	}

	var result []string
	for _, r := range repos {
		pushed, _ := time.Parse(time.RFC3339, r.PushedAt)
		if pushed.After(since) || pushed.Equal(since) {
			result = append(result, r.FullName)
		}
	}
	return result
}

func (c *ghClient) getOrgRepos(org string) []string {
	data, err := c.getAll(fmt.Sprintf("https://api.github.com/orgs/%s/repos?sort=pushed&per_page=100", org))
	if err != nil {
		return nil
	}
	var repos []struct{ FullName string `json:"full_name"` }
	json.Unmarshal(data, &repos)
	result := make([]string, len(repos))
	for i, r := range repos {
		result[i] = r.FullName
	}
	return result
}

func (c *ghClient) getCommits(owner, repo, author, since, until string) []CommitInfo {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/commits?author=%s&since=%s&until=%s&per_page=100", owner, repo, author, since, until)
	data, err := c.getAll(url)
	if err != nil {
		return nil
	}
	var raw []struct {
		SHA    string
		Commit struct {
			Message string
			Author  struct {
				Date string
				Name string
			}
		}
		Author struct{ Login string }
	}
	json.Unmarshal(data, &raw)

	commits := make([]CommitInfo, 0, len(raw))
	for _, r := range raw {
		msg := r.Commit.Message
		if i := strings.IndexByte(msg, '\n'); i >= 0 {
			msg = msg[:i]
		}
		author := r.Author.Login
		if author == "" {
			author = r.Commit.Author.Name
		}
		commits = append(commits, CommitInfo{
			Repo:    owner + "/" + repo,
			SHA:     r.SHA,
			Message: msg,
			Date:    r.Commit.Author.Date,
			Author:  author,
		})
	}
	return commits
}

func (c *ghClient) getPRs(owner, repo, author, since, until string) []PullRequestInfo {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/pulls?state=all&sort=updated&direction=desc&per_page=100", owner, repo)
	data, err := c.getAll(url)
	if err != nil {
		return nil
	}
	var raw []struct {
		Number    int
		Title     string
		State     string
		HTMLURL   string `json:"html_url"`
		MergedAt  *string `json:"merged_at"`
		UpdatedAt string `json:"updated_at"`
		User      struct{ Login string }
	}
	json.Unmarshal(data, &raw)

	sinceT, _ := time.Parse(time.RFC3339, since)
	untilT, _ := time.Parse(time.RFC3339, until)

	var prs []PullRequestInfo
	for _, r := range raw {
		updated, _ := time.Parse(time.RFC3339, r.UpdatedAt)
		if r.User.Login != author || updated.Before(sinceT) || !updated.Before(untilT) {
			continue
		}
		state := r.State
		if r.MergedAt != nil {
			state = "merged"
		}
		prs = append(prs, PullRequestInfo{
			Repo:      owner + "/" + repo,
			Number:    r.Number,
			Title:     r.Title,
			State:     state,
			URL:       r.HTMLURL,
			UpdatedAt: r.UpdatedAt,
		})
	}
	return prs
}

func (c *ghClient) getIssues(owner, repo, author, since, until string) []IssueInfo {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/issues?creator=%s&since=%s&state=all&per_page=100", owner, repo, author, since)
	data, err := c.getAll(url)
	if err != nil {
		return nil
	}
	var raw []struct {
		Number      int
		Title       string
		State       string
		HTMLURL     string  `json:"html_url"`
		CreatedAt   string  `json:"created_at"`
		ClosedAt    *string `json:"closed_at"`
		PullRequest *struct{} `json:"pull_request"`
	}
	json.Unmarshal(data, &raw)

	sinceT, _ := time.Parse(time.RFC3339, since)
	untilT, _ := time.Parse(time.RFC3339, until)

	var issues []IssueInfo
	for _, r := range raw {
		if r.PullRequest != nil {
			continue // skip PRs
		}
		created, _ := time.Parse(time.RFC3339, r.CreatedAt)
		var closed time.Time
		if r.ClosedAt != nil {
			closed, _ = time.Parse(time.RFC3339, *r.ClosedAt)
		}
		inRange := (created.After(sinceT) || created.Equal(sinceT)) && created.Before(untilT)
		closedInRange := r.ClosedAt != nil && (closed.After(sinceT) || closed.Equal(sinceT)) && closed.Before(untilT)
		if !inRange && !closedInRange {
			continue
		}
		action := "opened"
		if closedInRange {
			action = "closed"
		}
		issues = append(issues, IssueInfo{
			Repo:   owner + "/" + repo,
			Number: r.Number,
			Title:  r.Title,
			Action: action,
			URL:    r.HTMLURL,
		})
	}
	return issues
}

// --- Aggregator ---

type repoResult struct {
	fullName string
	commits  []CommitInfo
	prs      []PullRequestInfo
	issues   []IssueInfo
}

func collect(client *ghClient, repos []string, user, since, until string) Report {
	var (
		mu      sync.Mutex
		wg      sync.WaitGroup
		results []repoResult
	)

	for _, fullName := range repos {
		wg.Add(1)
		go func(fn string) {
			defer wg.Done()
			parts := strings.SplitN(fn, "/", 2)
			if len(parts) != 2 {
				return
			}
			owner, repo := parts[0], parts[1]

			// 3 calls in parallel per repo
			var cwg sync.WaitGroup
			var commits []CommitInfo
			var prs []PullRequestInfo
			var issues []IssueInfo

			cwg.Add(3)
			go func() { defer cwg.Done(); commits = client.getCommits(owner, repo, user, since, until) }()
			go func() { defer cwg.Done(); prs = client.getPRs(owner, repo, user, since, until) }()
			go func() { defer cwg.Done(); issues = client.getIssues(owner, repo, user, since, until) }()
			cwg.Wait()

			mu.Lock()
			results = append(results, repoResult{fn, commits, prs, issues})
			mu.Unlock()
		}(fullName)
	}
	wg.Wait()

	var report Report
	report.Period.Start = since[:10]
	report.Period.End = until[:10]
	repoSet := map[string]bool{}

	for _, r := range results {
		report.Commits = append(report.Commits, r.commits...)
		report.PullRequests = append(report.PullRequests, r.prs...)
		report.Issues = append(report.Issues, r.issues...)
		if len(r.commits) > 0 || len(r.prs) > 0 || len(r.issues) > 0 {
			repoSet[r.fullName] = true
		}
	}

	for k := range repoSet {
		report.Summary.Repos = append(report.Summary.Repos, k)
	}
	sort.Strings(report.Summary.Repos)
	report.Summary.TotalCommits = len(report.Commits)
	report.Summary.TotalPRs = len(report.PullRequests)
	report.Summary.TotalIssues = len(report.Issues)
	return report
}

// --- Formatters ---

func formatText(r Report) string {
	var b strings.Builder
	b.WriteString(fmt.Sprintf("📅 %s ~ %s\n\n", r.Period.Start, r.Period.End))

	if len(r.Commits) > 0 {
		// Group by repo
		grouped := map[string][]CommitInfo{}
		for _, c := range r.Commits {
			grouped[c.Repo] = append(grouped[c.Repo], c)
		}
		b.WriteString(fmt.Sprintf("🔨 Commits: %d\n", len(r.Commits)))
		for repo, commits := range grouped {
			msgs := make([]string, 0, min(3, len(commits)))
			for i, c := range commits {
				if i >= 3 {
					break
				}
				msgs = append(msgs, c.Message)
			}
			b.WriteString(fmt.Sprintf("  %s: %s (%d)\n", repo, strings.Join(msgs, ", "), len(commits)))
		}
		b.WriteByte('\n')
	}

	if len(r.PullRequests) > 0 {
		b.WriteString(fmt.Sprintf("🔀 PRs: %d\n", len(r.PullRequests)))
		for _, pr := range r.PullRequests {
			b.WriteString(fmt.Sprintf("  %s#%d %s\n", pr.Repo, pr.Number, pr.State))
		}
		b.WriteByte('\n')
	}

	if len(r.Issues) > 0 {
		b.WriteString(fmt.Sprintf("✅ Issues: %d\n", len(r.Issues)))
		for _, iss := range r.Issues {
			b.WriteString(fmt.Sprintf("  %s#%d %s\n", iss.Repo, iss.Number, iss.Action))
		}
		b.WriteByte('\n')
	}

	b.WriteString(fmt.Sprintf("📊 Summary: %d repos, %d commits, %d PRs, %d issues\n",
		len(r.Summary.Repos), r.Summary.TotalCommits, r.Summary.TotalPRs, r.Summary.TotalIssues))
	return b.String()
}

func formatMarkdown(r Report) string {
	var b strings.Builder
	b.WriteString(fmt.Sprintf("# Daily Report (%s ~ %s)\n\n", r.Period.Start, r.Period.End))

	if len(r.Commits) > 0 {
		grouped := map[string][]CommitInfo{}
		for _, c := range r.Commits {
			grouped[c.Repo] = append(grouped[c.Repo], c)
		}
		b.WriteString(fmt.Sprintf("## 🔨 Commits (%d)\n", len(r.Commits)))
		b.WriteString("| Repo | Count | Highlights |\n|------|-------|------------|\n")
		for repo, commits := range grouped {
			msgs := make([]string, 0, min(3, len(commits)))
			for i, c := range commits {
				if i >= 3 {
					break
				}
				msgs = append(msgs, c.Message)
			}
			b.WriteString(fmt.Sprintf("| %s | %d | %s |\n", repo, len(commits), strings.Join(msgs, ", ")))
		}
		b.WriteByte('\n')
	}

	if len(r.PullRequests) > 0 {
		b.WriteString(fmt.Sprintf("## 🔀 PRs (%d)\n", len(r.PullRequests)))
		for _, pr := range r.PullRequests {
			b.WriteString(fmt.Sprintf("- %s#%d %s\n", pr.Repo, pr.Number, pr.State))
		}
		b.WriteByte('\n')
	}

	if len(r.Issues) > 0 {
		b.WriteString(fmt.Sprintf("## ✅ Issues (%d)\n", len(r.Issues)))
		for _, iss := range r.Issues {
			b.WriteString(fmt.Sprintf("- %s#%d %s\n", iss.Repo, iss.Number, iss.Action))
		}
		b.WriteByte('\n')
	}

	return b.String()
}

func formatJSON(r Report) string {
	data, _ := json.MarshalIndent(r, "", "  ")
	return string(data)
}

func formatSlack(r Report) string {
	var b strings.Builder
	b.WriteString(fmt.Sprintf("*📅 %s ~ %s*\n\n", r.Period.Start, r.Period.End))

	if len(r.Commits) > 0 {
		grouped := map[string][]CommitInfo{}
		for _, c := range r.Commits {
			grouped[c.Repo] = append(grouped[c.Repo], c)
		}
		b.WriteString(fmt.Sprintf("*🔨 Commits: %d*\n", len(r.Commits)))
		for repo, commits := range grouped {
			b.WriteString(fmt.Sprintf("  `%s`: %d commits\n", repo, len(commits)))
		}
		b.WriteByte('\n')
	}

	if len(r.PullRequests) > 0 {
		b.WriteString(fmt.Sprintf("*🔀 PRs: %d*\n", len(r.PullRequests)))
		for _, pr := range r.PullRequests {
			b.WriteString(fmt.Sprintf("  %s#%d _%s_\n", pr.Repo, pr.Number, pr.State))
		}
		b.WriteByte('\n')
	}

	b.WriteString(fmt.Sprintf("_📊 %d repos, %d commits, %d PRs, %d issues_\n",
		len(r.Summary.Repos), r.Summary.TotalCommits, r.Summary.TotalPRs, r.Summary.TotalIssues))
	return b.String()
}

// --- Date helpers ---

func todayRange() (string, string) {
	now := time.Now()
	start := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).UTC()
	end := start.Add(24 * time.Hour)
	return start.Format(time.RFC3339), end.Format(time.RFC3339)
}

func yesterdayRange() (string, string) {
	now := time.Now()
	end := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).UTC()
	start := end.Add(-24 * time.Hour)
	return start.Format(time.RFC3339), end.Format(time.RFC3339)
}

func weekRange() (string, string) {
	now := time.Now()
	end := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).UTC().Add(24 * time.Hour)
	weekday := int(now.Weekday())
	if weekday == 0 {
		weekday = 7
	}
	start := end.Add(-time.Duration(weekday) * 24 * time.Hour)
	return start.Format(time.RFC3339), end.Format(time.RFC3339)
}

// --- Main ---

func main() {
	args := os.Args[1:]
	if len(args) == 0 {
		args = []string{"today"}
	}

	cmd := args[0]
	format := "text"
	var user, org, repo string

	for i := 1; i < len(args); i++ {
		switch args[i] {
		case "--format":
			if i+1 < len(args) {
				format = args[i+1]
				i++
			}
		case "--user":
			if i+1 < len(args) {
				user = args[i+1]
				i++
			}
		case "--org":
			if i+1 < len(args) {
				org = args[i+1]
				i++
			}
		case "--repo":
			if i+1 < len(args) {
				repo = args[i+1]
				i++
			}
		}
	}

	switch cmd {
	case "--help", "-h":
		fmt.Println("whatdid - Auto-generate daily/weekly reports from GitHub activity")
		fmt.Println()
		fmt.Println("Usage: whatdid <command> [options]")
		fmt.Println()
		fmt.Println("Commands:")
		fmt.Println("  today       Today's activity (default)")
		fmt.Println("  yesterday   Yesterday's activity")
		fmt.Println("  week        This week's activity (Mon-today)")
		fmt.Println()
		fmt.Println("Options:")
		fmt.Println("  --format <text|markdown|json|slack>")
		fmt.Println("  --user <username>")
		fmt.Println("  --org <org>")
		fmt.Println("  --repo <owner/repo>")
		return
	case "--version", "-v":
		fmt.Printf("whatdid v%s\n", version)
		return
	}

	var since, until string
	switch cmd {
	case "today":
		since, until = todayRange()
	case "yesterday":
		since, until = yesterdayRange()
	case "week":
		since, until = weekRange()
	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n", cmd)
		os.Exit(1)
	}

	client := newGHClient()

	// Fetch user and repos in parallel
	var repos []string
	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		if user == "" {
			user = client.getUser()
			if user == "" {
				fmt.Fprintln(os.Stderr, "❌ Failed to get authenticated user.")
				os.Exit(1)
			}
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		if repo != "" {
			repos = []string{repo}
		} else if org != "" {
			repos = client.getOrgRepos(org)
		} else {
			sinceT, _ := time.Parse(time.RFC3339, since)
			repos = client.getRepos(sinceT)
		}
	}()

	wg.Wait()

	report := collect(client, repos, user, since, until)

	var output string
	switch format {
	case "text":
		output = formatText(report)
	case "markdown":
		output = formatMarkdown(report)
	case "json":
		output = formatJSON(report)
	case "slack":
		output = formatSlack(report)
	default:
		output = formatText(report)
	}
	fmt.Print(output)
}
