defmodule CommitVibe.GitHub.Behaviour do
  @moduledoc "Behaviour for GitHub API client — enables test mocking."

  @callback fetch_commits(String.t(), String.t(), keyword()) ::
              {:ok, [map()], boolean()} | {:error, term()}
end
