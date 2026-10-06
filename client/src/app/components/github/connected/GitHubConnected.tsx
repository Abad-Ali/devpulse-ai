"use client";
import GitHubConnectedHeader from "./GitHubConnectedHeader";

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
    <div className="mx-auto w-full max-w-6xl">
      <GitHubConnectedHeader/>
    </div>
  );
};

export default GitHubConnected;