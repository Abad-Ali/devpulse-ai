"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, GitFork, GitPullRequest, Eye, Code2, RefreshCw,  AlertCircle, LoaderCircle, GitBranch, LockKeyhole, Globe2, HardDrive, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface RepositoryOverviewProps {
  repository: {
    repositoryId: string;
    repositoryName: string;
    fullName: string;
    repositoryUrl: string;
    visibility: "public" | "private";
    defaultBranch?: string;
  };
}

interface RepositoryStats {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
  language: string | null;
  default_branch: string;
  visibility: string;
  size: number;
}

const formatNumber = (value: number) => new Intl.NumberFormat("en", { notation: value >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);

const RepositoryOverview = ({ repository }: RepositoryOverviewProps) => {
  const [stats, setStats] = useState<RepositoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<RepositoryStats>(`https://api.github.com/repos/${repository.fullName.split("/").map(encodeURIComponent).join("/")}`, {
            signal: controller.signal,
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (controller.signal.aborted) return;
        setStats(response.data);
      } catch (err) {
        if (controller.signal.aborted) return;

        if (axios.isAxiosError(err)) {
          const status = err.response?.status;

          if (status === 404) {
            setError("Repository not found or is not publicly accessible.");
          } else if (status === 403 || status === 429) {
            setError("GitHub rate limit reached. Please try again later.");
          } else {
            setError(err.response?.data?.message || "Unable to load repository information.");
          }
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => controller.abort();
  }, [repository.fullName, retryCount]);

  const metrics = [
    {
      label: "Stars",
      value: stats?.stargazers_count ?? 0,
      icon: Star,
      color: "text-amber-500",
      background: "bg-amber-500/10",
    },
    {
      label: "Forks",
      value: stats?.forks_count ?? 0,
      icon: GitFork,
      color: "text-violet-500",
      background: "bg-violet-500/10",
    },
    {
      label: "Open issues",
      value: stats?.open_issues_count ?? 0,
      icon: GitPullRequest,
      color: "text-emerald-500",
      background: "bg-emerald-500/10",
    },
    {
      label: "Watchers",
      value: stats?.subscribers_count ?? 0,
      icon: Eye,
      color: "text-sky-500",
      background: "bg-sky-500/10",
    }
  ];

  const isPrivate = (stats?.visibility ?? repository.visibility) === "private";

  return (
    <section className="group relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-colors duration-200 hover:border-neutral-300 dark:border-neutral-800 dark:bg-black">

      <div className="space-y-4 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center">
            <Image src="/assets/github.svg" alt="GitHub" width={50} height={50} className="dark:invert-0 invert"/>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h2 className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                {repository.repositoryName}
              </h2>

              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 px-1.5 py-0.5 text-[9px] font-medium capitalize text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                {isPrivate ? (
                  <LockKeyhole className="size-2.5"/>
                ) : (
                  <Globe2 className="size-2.5"/>
                )}
                {isPrivate ? "Private" : "Public"}
              </span>
            </div>

            <Link href={`${repository.repositoryUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Open repository on GitHub" className="truncate text-[12px] text-blue-600 hover:text-blue-500 cursor-pointer">
              {repository.fullName}
            </Link>
          </div>

          <Link href={repository.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label="Open repository on GitHub" className="flex size-7 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-white">
            <ArrowUpRight className="size-3.5"/>
          </Link>
        </div>

        {isLoading && (
          <div className="space-y-3" role="status" aria-label="Loading repository statistics">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <LoaderCircle className="size-3.5 animate-spin text-violet-500"/>
              Fetching repository insights...
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-17 animate-pulse rounded-lg border border-neutral-100 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900/60"/>
              ))}
            </div>

            <div className="h-16 animate-pulse rounded-lg bg-neutral-50 dark:bg-neutral-900/60"/>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50/70 p-3 dark:border-red-900/50 dark:bg-red-950/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500"/>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                  Unable to load insights
                </p>

                <p className="mt-1 text-[11px] leading-4 text-neutral-600 dark:text-neutral-400">
                  {error}
                </p>

                <Button variant="outline" size="sm" className="mt-2 h-7 gap-1.5 rounded-md px-2.5 text-[11px]" onClick={() =>setRetryCount((count) => count + 1)}>
                  <RefreshCw className="size-3"/>
                  Try again
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && stats && (
          <>
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Repository activity
                </h3>

                <span className="rounded px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                  Live data
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {metrics.map(({ label, value, icon: Icon, color, background }) => (
                    <div key={label} className="rounded-lg border border-neutral-200/80 bg-neutral-50/70 px-2.5 py-5 transition-colors hover:bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          {label}
                        </span>

                        <span className={`flex size-5 shrink-0 items-center justify-center rounded-md ${background}`}>
                          <Icon className={`size-3 ${color}`}/>
                        </span>
                      </div>

                      <p className="mt-2 text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-white">
                        {formatNumber(value)}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="border-b border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-black">
                <h3 className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">
                  Repository details
                </h3>
              </div>

              <div className="divide-y divide-neutral-100 px-3 dark:divide-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-900/40">
                <div className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <Code2 className="size-3.5 shrink-0"/>
                    <span className="text-[11px]">Language</span>
                  </div>

                  <div className="flex min-w-0 items-center gap-1.5">
                    {stats.language && (<span className="size-1.5 shrink-0 rounded-full bg-violet-500"/>)}

                    <span className="truncate text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                      {stats.language || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <GitBranch className="size-3.5 shrink-0"/>
                    <span className="text-[11px]">Default branch</span>
                  </div>

                  <span className="max-w-[55%] truncate rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
                    {stats.default_branch || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <HardDrive className="size-3.5 shrink-0"/>
                    <span className="text-[11px]">Repository size</span>
                  </div>

                  <span className="text-[11px] font-medium tabular-nums text-neutral-800 dark:text-neutral-200">
                    {formatNumber(stats.size)} KB
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RepositoryOverview;