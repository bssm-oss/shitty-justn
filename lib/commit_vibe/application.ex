defmodule CommitVibe.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    :ets.new(:commit_vibe_cache, [:set, :public, :named_table])

    children = [
      CommitVibeWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:commit_vibe, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CommitVibe.PubSub},
      {Finch, name: CommitVibe.Finch},
      CommitVibeWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CommitVibe.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CommitVibeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
