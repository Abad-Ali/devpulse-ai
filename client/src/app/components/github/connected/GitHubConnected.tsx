"use client";
import GitHubConnectedHeader from "./GitHubConnectedHeader";
import GitHubProfile from "./GitHubProfile";

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

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <GitHubProfile connection={connection} />
        </div>
      </div>
    </div>
  );
};

export default GitHubConnected;