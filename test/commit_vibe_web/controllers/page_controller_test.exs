defmodule CommitVibeWeb.PageControllerTest do
  use CommitVibeWeb.ConnCase

  test "GET / renders home live view", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "commit-vibe"
  end
end
