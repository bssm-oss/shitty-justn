defmodule CommitVibeWeb.PageController do
  use CommitVibeWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
