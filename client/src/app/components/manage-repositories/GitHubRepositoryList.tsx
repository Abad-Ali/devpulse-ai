"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, LockKeyhole, Globe, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";

const GitHubRepositoryList = () => {
  const repositories = useAppSelector((state) => state.githubRepositories.repositories);

  return (
    <section className="w-full text-black dark:text-white py-6">
      <div className="mx-auto">

        <div className="mb-3 px-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white">
              Your Repositories
            </h2>
        
            <p className="mt-1 text-sm text-black/45 dark:text-white/45">
              Manage your connected GitHub repositories.
            </p>
          </div>
        </div>

        {repositories.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[28px] border border-dashed border-black/[0.12] text-center dark:border-white/[0.1]">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-black/[0.025] text-black/40 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/40">
              <FolderGit2 className="size-5" strokeWidth={1.6}/>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-black/75 dark:text-white/75">
              No repositories yet
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-6 text-black/40 dark:text-white/40">
              Your connected GitHub repositories will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {repositories.map((repository) => (
              <article key={repository._id} className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-black/[0.08] bg-white/[0.02] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.15] hover:bg-black/[0.015] dark:border-white/[0.08] dark:bg-white/[0.015] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.025]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.025] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/[0.025]" />

                <div className="relative flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.025] dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <Image src="/repo.svg" alt="Repository" width={50} height={50} className="dark:invert"/>
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm sm:text-base font-semibold tracking-tight text-black/85 transition-colors group-hover:text-black dark:text-white/85 dark:group-hover:text-white">
                          {repository.repositoryName}
                        </h3>

                        <p className="mt-1 truncate font-mono text-[15px] text-black/70 dark:text-white/45">
                          {repository.fullName}
                        </p>
                      </div>
                    </div>

                    <Link href={`https://github.com/${repository.fullName}`} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${repository.repositoryName} on GitHub (opens in a new tab)`} title="Opens GitHub in a new tab" className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-black/[0.08] px-2.5 text-xs text-black/55 transition-colors hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/50 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04] dark:hover:text-white">
                      Visit on GitHub
                      <ArrowUpRight className="size-3.5" strokeWidth={1.7}/>
                    </Link>
                  </div>

                  <div className="mt-6 flex min-h-[72px] items-start gap-2.5">
                    <BookOpen className="mt-1 size-3.5 shrink-0 text-black/35 dark:text-white/35" strokeWidth={1.7}/>

                    <p className="line-clamp-3 text-sm leading-6 text-black/80 dark:text-white/55">
                      {repository.description || "No description available."}
                    </p>
                  </div>

                  <div className="my-5 h-px shrink-0 bg-black/[0.07] dark:bg-white/[0.07]" />

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {repository.visibility === "private" ? (
                        <LockKeyhole className="size-3.5 text-black/45 dark:text-white/40" strokeWidth={1.7}/>
                      ) : (
                        <Globe className="size-3.5 text-black/45 dark:text-white/40" strokeWidth={1.7}/>
                      )}

                      <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.1em] text-black/50 dark:text-white/45">
                        {repository.visibility}
                      </span>
                    </div>

                    <Button size="sm" className="h-9 cursor-pointer rounded-xl px-3.5 text-xs font-medium">
                      <Link href={`/github/manage/repositories/${repository.repositoryId}`} className="flex">
                        Manage Repository
                        <ArrowUpRight className="ml-2 size-3.5"/>
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubRepositoryList;