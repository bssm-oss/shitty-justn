defmodule CommitVibeWeb.Router do
  use CommitVibeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {CommitVibeWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CommitVibeWeb do
    pipe_through :browser

    live "/", HomeLive
    live "/result/:owner/:repo", ResultLive
  end

  pipeline :og do
    plug :accepts, ["html", "xml"]
    plug :put_secure_browser_headers
  end

  scope "/og", CommitVibeWeb do
    pipe_through :og

    get "/:owner/:repo", OgImageController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", CommitVibeWeb do
  #   pipe_through :api
  # end
end
