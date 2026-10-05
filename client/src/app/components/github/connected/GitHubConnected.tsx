"use client";

interface GitHubConnection {
  githubUserId: string;
  githubUsername: string;
  githubAvatar: string;
  isConnected: boolean;
  connectedAt: string;
}

interface GitHubConnectedProps {
  connection: GitHubConnection;
}

const GitHubConnected = ({ connection }: GitHubConnectedProps) => {
  return (
    <div className="mx-auto w-full max-w-3xl">
      Connected GitHub UI
    </div>
  );
};

export default GitHubConnected;