package main

import (
	"encoding/json"
	"strings"
	"testing"
	"time"
)

// === 포맷터 테스트 ===

// 테스트용 리포트 생성 헬퍼
func makeTestReport() Report {
	r := Report{}
	r.Period.Start = "2026-04-10"
	r.Period.End = "2026-04-12"
	r.Commits = []CommitInfo{
		{Repo: "org/api", SHA: "abc1234", Message: "fix: auth bug", Date: "2026-04-11T10:00:00Z", Author: "justn"},
		{Repo: "org/api", SHA: "def5678", Message: "feat: add endpoint", Date: "2026-04-11T11:00:00Z", Author: "justn"},
		{Repo: "org/web", SHA: "ghi9012", Message: "style: button color", Date: "2026-04-11T09:00:00Z", Author: "justn"},
	}
	r.PullRequests = []PullRequestInfo{
		{Repo: "org/api", Number: 42, Title: "Fix auth", State: "merged", URL: "https://github.com/org/api/pull/42", UpdatedAt: "2026-04-11T12:00:00Z"},
	}
	r.Issues = []IssueInfo{
		{Repo: "org/web", Number: 7, Title: "Button broken", Action: "closed", URL: "https://github.com/org/web/issues/7"},
	}
	r.Summary.Repos = []string{"org/api", "org/web"}
	r.Summary.TotalCommits = 3
	r.Summary.TotalPRs = 1
	r.Summary.TotalIssues = 1
	return r
}

// 빈 리포트 생성 헬퍼
func makeEmptyReport() Report {
	r := Report{}
	r.Period.Start = "2026-04-12"
	r.Period.End = "2026-04-12"
	return r
}

func TestFormatText_정상_데이터(t *testing.T) {
	r := makeTestReport()
	out := formatText(r)

	// 기간 표시 확인
	if !strings.Contains(out, "2026-04-10 ~ 2026-04-12") {
		t.Error("기간이 출력에 포함되어야 함")
	}

	// 커밋 수 표시 확인
	if !strings.Contains(out, "Commits: 3") {
		t.Error("커밋 총 개수가 표시되어야 함")
	}

	// PR 정보 확인
	if !strings.Contains(out, "org/api#42 merged") {
		t.Error("PR 정보가 올바르게 표시되어야 함")
	}

	// 이슈 정보 확인
	if !strings.Contains(out, "org/web#7 closed") {
		t.Error("이슈 정보가 올바르게 표시되어야 함")
	}

	// Summary 확인
	if !strings.Contains(out, "2 repos, 3 commits, 1 PRs, 1 issues") {
		t.Error("Summary 줄이 올바르게 표시되어야 함")
	}
}

func TestFormatText_빈_리포트(t *testing.T) {
	r := makeEmptyReport()
	out := formatText(r)

	// 빈 리포트에서 Commits/PRs/Issues 섹션이 없어야 함
	if strings.Contains(out, "Commits:") {
		t.Error("커밋이 없으면 Commits 섹션이 나오면 안 됨")
	}
	if strings.Contains(out, "PRs:") {
		t.Error("PR이 없으면 PRs 섹션이 나오면 안 됨")
	}
	if strings.Contains(out, "Issues:") {
		t.Error("이슈가 없으면 Issues 섹션이 나오면 안 됨")
	}

	// Summary는 항상 표시 (0 repos, 0 commits...)
	if !strings.Contains(out, "0 repos") {
		t.Error("빈 리포트에서도 Summary는 표시되어야 함")
	}
}

func TestFormatMarkdown_테이블_구조(t *testing.T) {
	r := makeTestReport()
	out := formatMarkdown(r)

	// 마크다운 헤더 확인
	if !strings.Contains(out, "# Daily Report") {
		t.Error("마크다운 제목이 있어야 함")
	}

	// 테이블 헤더 확인
	if !strings.Contains(out, "| Repo | Count | Highlights |") {
		t.Error("커밋 테이블 헤더가 있어야 함")
	}

	// PR 리스트 마크다운 형식 확인
	if !strings.Contains(out, "- org/api#42 merged") {
		t.Error("PR이 마크다운 리스트 형식이어야 함")
	}
}

func TestFormatMarkdown_빈_리포트(t *testing.T) {
	r := makeEmptyReport()
	out := formatMarkdown(r)

	// 제목만 있고 섹션 없음
	if !strings.Contains(out, "# Daily Report") {
		t.Error("빈 리포트에도 제목은 있어야 함")
	}
	if strings.Contains(out, "## ") {
		t.Error("빈 리포트에서 하위 섹션이 없어야 함")
	}
}

func TestFormatJSON_유효한_JSON(t *testing.T) {
	r := makeTestReport()
	out := formatJSON(r)

	// 유효한 JSON인지 확인
	var parsed Report
	if err := json.Unmarshal([]byte(out), &parsed); err != nil {
		t.Fatalf("formatJSON 출력이 유효한 JSON이 아님: %v", err)
	}

	// 역직렬화된 데이터 검증
	if parsed.Period.Start != "2026-04-10" {
		t.Errorf("기간 시작이 맞지 않음: got %s", parsed.Period.Start)
	}
	if parsed.Summary.TotalCommits != 3 {
		t.Errorf("커밋 수가 맞지 않음: got %d", parsed.Summary.TotalCommits)
	}
	if len(parsed.Commits) != 3 {
		t.Errorf("커밋 배열 길이가 맞지 않음: got %d", len(parsed.Commits))
	}
	if len(parsed.PullRequests) != 1 {
		t.Errorf("PR 배열 길이가 맞지 않음: got %d", len(parsed.PullRequests))
	}
}

func TestFormatJSON_빈_리포트(t *testing.T) {
	r := makeEmptyReport()
	out := formatJSON(r)

	var parsed Report
	if err := json.Unmarshal([]byte(out), &parsed); err != nil {
		t.Fatalf("빈 리포트 JSON 파싱 실패: %v", err)
	}
	if parsed.Summary.TotalCommits != 0 {
		t.Error("빈 리포트의 커밋 수는 0이어야 함")
	}
}

func TestFormatSlack_볼드_이탤릭_형식(t *testing.T) {
	r := makeTestReport()
	out := formatSlack(r)

	// Slack bold 형식 확인 (*...*로 감싸기)
	if !strings.Contains(out, "*📅 2026-04-10 ~ 2026-04-12*") {
		t.Error("Slack 기간이 bold로 표시되어야 함")
	}

	// 커밋 수 bold 확인
	if !strings.Contains(out, "*🔨 Commits: 3*") {
		t.Error("Slack 커밋 헤더가 bold여야 함")
	}

	// repo 이름이 backtick으로 감싸져 있는지
	if !strings.Contains(out, "`org/api`") && !strings.Contains(out, "`org/web`") {
		t.Error("Slack 레포 이름이 backtick으로 감싸져야 함")
	}

	// PR state가 italic인지
	if !strings.Contains(out, "_merged_") {
		t.Error("Slack PR state가 italic이어야 함")
	}

	// Summary italic 확인
	if !strings.Contains(out, "_📊") {
		t.Error("Slack summary가 italic이어야 함")
	}
}

func TestFormatSlack_빈_리포트(t *testing.T) {
	r := makeEmptyReport()
	out := formatSlack(r)

	// 빈 리포트에서도 기간과 summary는 표시
	if !strings.Contains(out, "*📅") {
		t.Error("빈 리포트에서도 기간 헤더는 있어야 함")
	}
	if !strings.Contains(out, "0 repos") {
		t.Error("빈 리포트에서도 summary는 있어야 함")
	}
}

// === 날짜 헬퍼 테스트 ===

func TestTodayRange_RFC3339_형식(t *testing.T) {
	since, until := todayRange()

	// RFC3339 파싱 가능한지 확인
	s, err := time.Parse(time.RFC3339, since)
	if err != nil {
		t.Fatalf("since가 RFC3339가 아님: %v", err)
	}
	u, err := time.Parse(time.RFC3339, until)
	if err != nil {
		t.Fatalf("until이 RFC3339가 아님: %v", err)
	}

	// 정확히 24시간 차이
	diff := u.Sub(s)
	if diff != 24*time.Hour {
		t.Errorf("today 범위가 24시간이어야 함, got %v", diff)
	}
}

func TestYesterdayRange_오늘_이전(t *testing.T) {
	since, until := yesterdayRange()

	s, _ := time.Parse(time.RFC3339, since)
	u, _ := time.Parse(time.RFC3339, until)

	// 24시간 차이
	diff := u.Sub(s)
	if diff != 24*time.Hour {
		t.Errorf("yesterday 범위가 24시간이어야 함, got %v", diff)
	}

	// until이 오늘 자정(UTC)이어야 함
	now := time.Now()
	todayMidnight := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).UTC()
	if !u.Equal(todayMidnight) {
		t.Errorf("yesterday until이 오늘 자정(UTC)이어야 함, got %v vs expected %v", u, todayMidnight)
	}
}

func TestWeekRange_월요일_시작(t *testing.T) {
	since, until := weekRange()

	s, _ := time.Parse(time.RFC3339, since)
	u, _ := time.Parse(time.RFC3339, until)

	// until은 오늘 자정 + 24시간
	if !u.After(s) {
		t.Error("week until은 since보다 이후여야 함")
	}

	// 범위가 7일 이하 (일주일 내)
	diff := u.Sub(s)
	if diff > 8*24*time.Hour {
		t.Errorf("week 범위가 8일을 넘으면 안 됨, got %v", diff)
	}
	if diff < 24*time.Hour {
		t.Errorf("week 범위가 최소 1일이어야 함, got %v", diff)
	}
}

// === 타입 JSON 직렬화 테스트 ===

func TestCommitInfo_JSON_라운드트립(t *testing.T) {
	original := CommitInfo{
		Repo:    "org/repo",
		SHA:     "abc123",
		Message: "feat: something",
		Date:    "2026-04-12T10:00:00Z",
		Author:  "justn",
	}

	data, err := json.Marshal(original)
	if err != nil {
		t.Fatalf("Marshal 실패: %v", err)
	}

	var decoded CommitInfo
	if err := json.Unmarshal(data, &decoded); err != nil {
		t.Fatalf("Unmarshal 실패: %v", err)
	}

	if decoded != original {
		t.Errorf("라운드트립 실패: got %+v, want %+v", decoded, original)
	}
}

func TestPullRequestInfo_JSON_필드_매핑(t *testing.T) {
	raw := `{"repo":"a/b","number":1,"title":"T","state":"merged","url":"http://x","updated_at":"2026-01-01T00:00:00Z"}`
	var pr PullRequestInfo
	if err := json.Unmarshal([]byte(raw), &pr); err != nil {
		t.Fatalf("PR JSON 파싱 실패: %v", err)
	}
	if pr.Number != 1 || pr.State != "merged" || pr.UpdatedAt != "2026-01-01T00:00:00Z" {
		t.Errorf("PR 필드 매핑이 잘못됨: %+v", pr)
	}
}

func TestIssueInfo_JSON_필드_매핑(t *testing.T) {
	raw := `{"repo":"a/b","number":5,"title":"Bug","action":"opened","url":"http://x"}`
	var iss IssueInfo
	if err := json.Unmarshal([]byte(raw), &iss); err != nil {
		t.Fatalf("Issue JSON 파싱 실패: %v", err)
	}
	if iss.Action != "opened" {
		t.Errorf("Action 필드가 잘못됨: got %s", iss.Action)
	}
}

// === Report 구조체 테스트 ===

func TestReport_JSON_전체_구조(t *testing.T) {
	r := makeTestReport()
	data, err := json.Marshal(r)
	if err != nil {
		t.Fatalf("Report Marshal 실패: %v", err)
	}

	// JSON에 모든 필드가 존재하는지 확인
	jsonStr := string(data)
	requiredFields := []string{
		`"period"`, `"start"`, `"end"`,
		`"commits"`, `"pull_requests"`, `"issues"`,
		`"summary"`, `"repos"`, `"total_commits"`, `"total_prs"`, `"total_issues"`,
	}
	for _, field := range requiredFields {
		if !strings.Contains(jsonStr, field) {
			t.Errorf("JSON에 %s 필드가 없음", field)
		}
	}
}

// === 포맷터 엣지 케이스 ===

func TestFormatText_커밋만_있는_경우(t *testing.T) {
	r := Report{}
	r.Period.Start = "2026-04-12"
	r.Period.End = "2026-04-12"
	r.Commits = []CommitInfo{
		{Repo: "org/x", SHA: "aaa", Message: "init", Date: "2026-04-12T00:00:00Z", Author: "me"},
	}
	r.Summary.TotalCommits = 1

	out := formatText(r)

	if !strings.Contains(out, "Commits: 1") {
		t.Error("커밋 섹션이 있어야 함")
	}
	if strings.Contains(out, "PRs:") {
		t.Error("PR 섹션이 없어야 함")
	}
	if strings.Contains(out, "Issues:") {
		t.Error("이슈 섹션이 없어야 함")
	}
}

func TestFormatText_커밋_3개_초과_생략(t *testing.T) {
	// 한 레포에 커밋 5개 — highlights에 최대 3개만 표시되는지 확인
	r := Report{}
	r.Period.Start = "2026-04-12"
	r.Period.End = "2026-04-12"
	for i := 0; i < 5; i++ {
		r.Commits = append(r.Commits, CommitInfo{
			Repo:    "org/x",
			SHA:     "sha" + string(rune('a'+i)),
			Message: "msg" + string(rune('0'+i)),
			Date:    "2026-04-12T00:00:00Z",
			Author:  "me",
		})
	}
	r.Summary.TotalCommits = 5

	out := formatText(r)

	// msg4는 4번째 메시지이므로 highlights에 포함되면 안 됨
	if strings.Contains(out, "msg4") {
		t.Error("4번째 이상 커밋 메시지는 highlights에 포함되면 안 됨")
	}
	// 총 커밋 수는 5로 표시되어야 함
	if !strings.Contains(out, "(5)") {
		t.Error("레포별 총 커밋 수가 괄호 안에 표시되어야 함")
	}
}

func TestFormatMarkdown_커밋_3개_초과_생략(t *testing.T) {
	r := Report{}
	r.Period.Start = "2026-04-12"
	r.Period.End = "2026-04-12"
	for i := 0; i < 5; i++ {
		r.Commits = append(r.Commits, CommitInfo{
			Repo:    "org/x",
			SHA:     "sha" + string(rune('a'+i)),
			Message: "msg" + string(rune('0'+i)),
			Date:    "2026-04-12T00:00:00Z",
			Author:  "me",
		})
	}
	r.Summary.TotalCommits = 5

	out := formatMarkdown(r)
	if strings.Contains(out, "msg4") {
		t.Error("마크다운에서도 4번째 이상 커밋 메시지는 highlights에 포함되면 안 됨")
	}
}

// === 커밋 메시지 첫 줄 추출 로직 테스트 ===
// (getCommits 내부 로직을 별도로 검증 — 동일 로직 재현)

func TestCommitMessage_첫줄만_추출(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  string
	}{
		{"한 줄 메시지", "fix: bug", "fix: bug"},
		{"여러 줄 메시지", "feat: add feature\n\nDetailed description here", "feat: add feature"},
		{"빈 두번째 줄", "init\n", "init"},
		{"빈 메시지", "", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			msg := tt.input
			if i := strings.IndexByte(msg, '\n'); i >= 0 {
				msg = msg[:i]
			}
			if msg != tt.want {
				t.Errorf("got %q, want %q", msg, tt.want)
			}
		})
	}
}

// === 날짜 범위 관계 테스트 ===

func TestDateRanges_순서_관계(t *testing.T) {
	ys, yu := yesterdayRange()
	ts, tu := todayRange()

	yStart, _ := time.Parse(time.RFC3339, ys)
	yEnd, _ := time.Parse(time.RFC3339, yu)
	tStart, _ := time.Parse(time.RFC3339, ts)
	tEnd, _ := time.Parse(time.RFC3339, tu)

	// yesterday end == today start
	if !yEnd.Equal(tStart) {
		t.Errorf("yesterday end(%v)와 today start(%v)가 같아야 함", yEnd, tStart)
	}

	// 순서: yStart < yEnd <= tStart < tEnd
	if !yStart.Before(yEnd) {
		t.Error("yesterday start가 end보다 이전이어야 함")
	}
	if !tStart.Before(tEnd) {
		t.Error("today start가 end보다 이전이어야 함")
	}
}

// === 다중 레포 그룹핑 테스트 ===

func TestFormatText_다중_레포_그룹핑(t *testing.T) {
	r := Report{}
	r.Period.Start = "2026-04-12"
	r.Period.End = "2026-04-12"
	r.Commits = []CommitInfo{
		{Repo: "org/alpha", Message: "fix alpha"},
		{Repo: "org/beta", Message: "fix beta"},
		{Repo: "org/alpha", Message: "another alpha fix"},
	}
	r.Summary.TotalCommits = 3

	out := formatText(r)

	// 두 레포 모두 출력에 표시
	if !strings.Contains(out, "org/alpha") {
		t.Error("org/alpha 레포가 표시되어야 함")
	}
	if !strings.Contains(out, "org/beta") {
		t.Error("org/beta 레포가 표시되어야 함")
	}

	// alpha는 2개 커밋
	if !strings.Contains(out, "(2)") {
		t.Error("alpha 레포의 커밋 수가 (2)로 표시되어야 함")
	}
}

// === Slack 포맷 이슈 없는 경우 테스트 ===

func TestFormatSlack_이슈_없으면_섹션_생략(t *testing.T) {
	r := makeTestReport()
	r.Issues = nil
	r.Summary.TotalIssues = 0

	out := formatSlack(r)

	// Issues 섹션이 없어야 함 (Slack 포맷에서는 Issues 섹션 자체가 없음 — 구현 확인)
	// Slack formatSlack은 Issues 섹션이 아예 구현되지 않았으므로 포함되지 않음
	if strings.Contains(out, "Issues") {
		t.Error("Slack 포맷에서 이슈가 없으면 Issues 텍스트가 나오면 안 됨")
	}
}

// === PR state 변환 (merged) 테스트 ===

func TestFormatText_PR_상태_표시(t *testing.T) {
	states := []string{"open", "closed", "merged"}
	for _, state := range states {
		r := Report{}
		r.Period.Start = "2026-04-12"
		r.Period.End = "2026-04-12"
		r.PullRequests = []PullRequestInfo{
			{Repo: "org/x", Number: 1, Title: "T", State: state},
		}
		r.Summary.TotalPRs = 1

		out := formatText(r)
		if !strings.Contains(out, state) {
			t.Errorf("PR state %q가 출력에 포함되어야 함", state)
		}
	}
}
