"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, FolderGit2, Loader2, RefreshCw, SearchX } from "lucide-react";
import axios from "axios";
import RepositoryHeader from "@/app/components/manage-repositories/repositoryId/RepositoryHeader";
import { getGitHubRepository } from "@/lib/api/github.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface Repository {
  _id: string;
  repositoryId: string;
  repositoryName: string;
  fullName: string;
  description?: string;
  repositoryUrl: string;
  visibility: "public" | "private";
  defaultBranch?: string;
  githubRepoCreatedAt?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const GitHubManageRepositoryPage = () => {
  const params = useParams<{ repositoryId: string }>();
  const router = useRouter();
  const repositoryId = params.repositoryId;

  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchRepository = useCallback(async () => {
    if (!repositoryId) {
      setError("A repository ID was not provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const res = await getGitHubRepository(repositoryId);
      if (!res.success) {
        const status = res.statusCode ?? res.status;

        if (status === 404 || res.code === "REPOSITORY_NOT_FOUND") {
          setNotFound(true);
          return;
        }

        const message = res.message || "Failed to load repository details.";

        setError(message);
        toast.error(message);
        return;
      }

      const repositoryData = res.data;
      if (!repositoryData || !repositoryData.repositoryId) {
        setNotFound(true);
        return;
      }

      setRepository(repositoryData as Repository);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 404) {
          setNotFound(true);
          return;
        }

        const message = err.response?.data?.message || "Failed to load repository details. Please try again.";
        setError(message);
        toast.error(message);
      } else {
        const message = "Something went wrong while loading the repository.";
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [repositoryId]);

  useEffect(() => {
    void fetchRepository();
  }, [fetchRepository]);

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white/70 px-6 py-5 dark:bg-black/70">
        <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-foreground/[0.035] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 size-[28rem] rounded-full bg-foreground/[0.025] blur-3xl" />

        <div className="relative flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            <Loader2 className="size-5 animate-spin text-neutral-500 dark:text-neutral-400" />
          </div>

          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Loading repository
          </p>

          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Fetching your repository details...
          </p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="relative flex lg:min-h-screen items-center justify-center overflow-hidden bg-white/70 px-5 py-8 dark:bg-black/70 sm:px-6">
        <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-foreground/[0.035] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 size-[28rem] rounded-full bg-foreground/[0.025] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[30rem] rounded-full bg-foreground/[0.02] blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-black">
            <div className="px-6 pb-7 pt-8 text-center sm:px-8">
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                <Image src="/assets/github.svg" alt="GitHub" width={35} height={35} className="object-contain invert dark:invert-0"/>

                <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full border-2 border-white bg-neutral-100 dark:border-black dark:bg-neutral-800">
                  <SearchX className="size-3.5 text-neutral-500 dark:text-neutral-400"/>
                </div>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                Repository unavailable
              </p>

              <h1 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Repository not found
              </h1>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                We couldn&apos;t find this repository in DevPulse AI. It may have been removed, or the repository ID may be incorrect.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-neutral-50/70 px-3 py-2.5 text-left dark:border-neutral-800/80 dark:bg-neutral-900/40">
                <FolderGit2 className="size-4 shrink-0 text-neutral-400"/>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Requested repository ID
                  </p>

                  <p className="mt-0.5 break-all font-mono text-xs text-neutral-700 dark:text-neutral-300">
                    {repositoryId || "Unavailable"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button variant="outline" onClick={() => router.back()} className="h-9 cursor-pointer border-neutral-200 dark:border-neutral-800">
                  <ArrowLeft className="mr-2 size-4"/>
                  Go back
                </Button>

                <Button onClick={() => void fetchRepository()} className="h-9 cursor-pointer">
                  <RefreshCw className="mr-2 size-4"/>
                  Try again
                </Button>
              </div>
            </div>

            <div className="border-t border-neutral-200/80 bg-neutral-50/70 px-5 py-3 dark:border-neutral-800/80 dark:bg-neutral-900/30">
              <p className="text-center text-[11px] leading-5 text-neutral-500 dark:text-neutral-400">
                If you believe this is a mistake, return to your repository list and select a repository again.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !repository) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white/70 px-6 py-5 dark:bg-black/70">
        <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-foreground/[0.035] blur-3xl" />

        <div className="relative flex max-w-md flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.05]">
            <AlertCircle size={22} strokeWidth={1.6} className="text-red-500 dark:text-red-400"/>
          </div>

          <h2 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Unable to load repository
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            {error || "Repository details are currently unavailable."}
          </p>

          <Button variant="outline" onClick={() => void fetchRepository()} className="mt-5 h-9 cursor-pointer border-neutral-200 dark:border-neutral-800">
            <RefreshCw className="mr-2 size-4"/>
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
      <RepositoryHeader repository={repository} />
    </main>
  );
};

export default GitHubManageRepositoryPage;
