"use client";
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import axios from "axios";
import GitHubRepositoriesHeader from "@/app/components/manage-repositories/GitHubRepositoriesHeader";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getGitHubRepositories } from "@/lib/api/github.api";
import { setRepositories } from "@/lib/redux/features/github/githubRepositoriesSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GitHubRepositoryList from "@/app/components/manage-repositories/GitHubRepositoryList";

const GitHubManageRepositoriesPage = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getGitHubRepositories();

      if (res.success) {
        dispatch(setRepositories(res.data));
        return;
      }

      const message = res.message || "Failed to load GitHub repositories.";

      setError(message);
      toast.error(message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to load GitHub repositories.";
        setError(message);
        toast.error(message);
      } else {
        const message = "Something went wrong. Please try again.";
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
          <Loader2 size={16} className="animate-spin" />
          Loading repositories...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle size={50} strokeWidth={1.5} className="text-red-500 dark:text-red-400"/>

          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            <span className="font-semibold">Error:</span>{" "}
            {error}
          </p>

          <p className="text-xs text-black/40 dark:text-white/40">
            Please try again later.
          </p>

          <Button onClick={fetchRepositories} className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 px-3 text-sm">
            <RefreshCw size={14} />
            Try again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white/70 dark:bg-black/70 px-3.5 sm:px-6 py-6">
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-foreground/[0.035] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 size-[28rem] rounded-full bg-foreground/[0.025] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[30rem] rounded-full bg-foreground/[0.02] blur-3xl" />
    
      <GitHubRepositoriesHeader/>
      <GitHubRepositoryList/>
    </main>
  );
};

export default GitHubManageRepositoriesPage;