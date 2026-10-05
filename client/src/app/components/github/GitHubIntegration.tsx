"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { getGitHubStatus } from "@/lib/api/github.api";
import GitHubConnect from "./GitHubConnectCard";
import GitHubReconnect from "./GitHubReconnect";
import GitHubConnected from "./connected/GitHubConnected";

interface GitHubConnection {
  githubUserId: string;
  githubUsername: string;
  githubAvatar: string;
  isConnected: boolean;
  connectedAt: string;
}

interface GitHubStatusResponse {
  success: boolean;
  message: string;
  data: GitHubConnection | null;
}

const GitHubIntegration = () => {
  const [status, setStatus] = useState<GitHubStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGitHubStatus = async () => {
    try {
      setIsLoading(true);

      const res = await getGitHubStatus();
      if (res.success) {
        setStatus(res);
        return;
      }
      toast.error(res.message || "Failed to fetch GitHub integration status.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to fetch GitHub integration status.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
        Loading...
      </div>
    );
  }

  if (!status) {
    return null;
  }

  if (!status.data) {
    return <GitHubConnect />;
  }

  if (!status.data.isConnected) {
    return <GitHubReconnect />;
  }

  return (
    <GitHubConnected connection={status.data}/>
  );
};

export default GitHubIntegration;