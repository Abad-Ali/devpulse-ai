"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ExternalLink, GitBranch, Globe, LockKeyhole, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepositoryHeaderProps {
  repository: {
    repositoryId: string;
    repositoryName: string;
    fullName: string;
    description?: string;
    repositoryUrl: string;
    visibility: "public" | "private";
    defaultBranch?: string;
    githubRepoCreatedAt?: string | Date | null;
    updatedAt?: string | Date | null;
  };
}

const formatDate = (value?: string | Date | null): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RepositoryHeader = ({ repository }: RepositoryHeaderProps) => {
  const createdAt = formatDate(repository.githubRepoCreatedAt);
  const updatedAt = formatDate(repository.updatedAt);
  const browseUrl = `${repository.repositoryUrl.replace(/\/+$/, "")}/tree/${encodeURIComponent(repository.defaultBranch || "main")}`;
  const isPublic = repository.visibility === "public";

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-black">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 sm:size-14">
                <Image src="/repo.svg" alt="Repository" width={50} height={50} className="dark:invert"/>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="break-words text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                    {repository.repositoryName}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium capitalize text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                    {isPublic ? (
                      <Globe className="size-3"/>
                    ) : (
                      <LockKeyhole className="size-3"/>
                    )}
                    {repository.visibility}
                  </span>
                </div>

                <p className="mt-1.5 break-all text-sm text-neutral-500 dark:text-neutral-400">
                  {repository.fullName}
                </p>

                <p className="mt-4 max-w-2xl whitespace-pre-wrap break-words text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {repository.description?.trim() || "No description provided for this repository."}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {repository.defaultBranch && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
                      <GitBranch className="size-3.5 text-neutral-500"/>
                      {repository.defaultBranch}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-400">
                    {isPublic ? (
                      <Globe className="size-3.5"/>
                    ) : (
                      <LockKeyhole className="size-3.5"/>
                    )}

                    {isPublic ? "Public repository" : "Private repository"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 xl:pt-0.5">
              <Button variant="outline" className="h-9 cursor-pointer rounded-lg border-neutral-200 bg-transparent px-3 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900">
                <Link href={repository.repositoryUrl} target="_blank" rel="noopener noreferrer" className="flex">
                  View GitHub
                  <ArrowUpRight className="ml-2 size-3.5"/>
                </Link>
              </Button>

              <Button className="h-9 cursor-pointer rounded-lg px-3 text-xs font-medium">
                <Link href={browseUrl} target="_blank" rel="noopener noreferrer" className="flex">
                  Browse code
                  <ExternalLink className="ml-2 size-3.5"/>
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-200/80 pt-4 dark:border-neutral-800/80">
            {createdAt && (
              <div className="flex items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900">
                  <CalendarDays className="size-3.5 text-neutral-500 dark:text-neutral-400"/>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-500">
                    Created on GitHub
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {createdAt}
                  </p>
                </div>
              </div>
            )}

            {updatedAt && (
              <div className="flex items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900">
                  <Clock3 className="size-3.5 text-neutral-500 dark:text-neutral-400"/>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-500">
                    Last record update
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {updatedAt}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-200/80 bg-neutral-50/60 px-5 py-3 dark:border-neutral-800/80 dark:bg-neutral-900/30 sm:px-7">
          <div className="flex items-center gap-2">
            <GitBranch className="size-3.5 shrink-0 text-neutral-500 dark:text-neutral-400"/>

            <p className="min-w-0 text-[11px] leading-5 text-neutral-500 dark:text-neutral-400">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Repository details may differ.
              </span>{" "}
              DevPulse AI saves its own copy, so GitHub changes may not automatically sync.
            </p>

            <Link href={repository.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-neutral-700 hover:underline dark:text-neutral-300">
              GitHub
              <ArrowUpRight className="size-3"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepositoryHeader;