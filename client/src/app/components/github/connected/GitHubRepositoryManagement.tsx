"use client";
import { BookOpen, FolderGit2, KeyRound, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const GitHubRepositoryManagement = () => {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black my-5">
      <div className="border-b border-black/10 px-6 py-6 dark:border-white/10 sm:px-7">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
            <FolderGit2 className="size-4 text-black/60 dark:text-white/60" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight text-black dark:text-white">
              Repository Management
            </h2>

            <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/50">
              Create and manage your GitHub repositories from DevPulse AI.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="group flex min-h-[224px] flex-col rounded-xl border border-black/10 bg-black/[0.015] p-4 transition-colors duration-200 hover:border-black/20 hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04] sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black sm:size-10">
                <Plus className="size-4 text-black/60 dark:text-white/60" />
              </div>

              <span className="text-[9px] font-semibold tracking-[0.14em] text-black/30 dark:text-white/30 sm:text-[10px]">
                01
              </span>
            </div>

            <div className="mt-4 sm:mt-5">
              <h3 className="text-sm font-semibold tracking-tight text-black dark:text-white">
                Create Repository
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-black/50 dark:text-white/50 sm:text-xs">
                Create a new GitHub repository directly from your DevPulse workspace.
              </p>
            </div>

            <div className="mt-auto pt-5 sm:pt-6">
              <Button type="button" variant="outline" className="h-9 w-full cursor-pointer border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
                <Plus className="mr-1.5 size-3.5 shrink-0 sm:mr-2" />
                <span className="truncate">Create <span className="hidden md:inline">Repository</span></span>
              </Button>
            </div>
          </div>

          <div className="group flex min-h-[224px] flex-col rounded-xl border border-black/10 bg-black/[0.015] p-4 transition-colors duration-200 hover:border-black/20 hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04] sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black sm:size-10">
                <FolderGit2 className="size-4 text-black/60 dark:text-white/60" />
              </div>

              <span className="text-[9px] font-semibold tracking-[0.14em] text-black/30 dark:text-white/30 sm:text-[10px]">
                02
              </span>
            </div>

            <div className="mt-4 sm:mt-5">
              <h3 className="text-sm font-semibold tracking-tight text-black dark:text-white">
                Manage Repositories
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-black/50 dark:text-white/50 sm:text-xs">
                View, update, and manage your connected GitHub repositories.
              </p>
            </div>

            <div className="mt-auto pt-5 sm:pt-6">
              <Button type="button" variant="outline" className="h-9 w-full cursor-pointer border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
                <Settings2 className="mr-1.5 size-3.5 shrink-0 sm:mr-2" />
                <span>Update <span className="hidden md:inline">Repositories</span></span>
              </Button>
            </div>
          </div>

          <div className="group flex min-h-[224px] flex-col rounded-xl border border-black/10 bg-black/[0.015] p-4 transition-colors duration-200 hover:border-black/20 hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04] sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black sm:size-10">
                <KeyRound className="size-4 text-black/60 dark:text-white/60" />
              </div>

              <span className="text-[9px] font-semibold tracking-[0.14em] text-black/30 dark:text-white/30 sm:text-[10px]">
                03
              </span>
            </div>

            <div className="mt-4 sm:mt-5">
              <h3 className="text-sm font-semibold tracking-tight text-black dark:text-white">
                GitHub Access
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-black/50 dark:text-white/50 sm:text-xs">
                Review the permissions DevPulse AI uses with your GitHub account.
              </p>
            </div>

            <div className="mt-auto pt-5 sm:pt-6">
              <Button type="button" variant="outline" className="h-9 w-full cursor-pointer border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
                <KeyRound className="mr-1.5 size-3.5 shrink-0 sm:mr-2" />
                <span className="truncate">View Access</span>
              </Button>
            </div>
          </div>

          <div className="group flex min-h-[224px] flex-col rounded-xl border border-black/10 bg-black/[0.015] p-4 transition-colors duration-200 hover:border-black/20 hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.04] sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black sm:size-10">
                <BookOpen className="size-4 text-black/60 dark:text-white/60" />
              </div>

              <span className="text-[9px] font-semibold tracking-[0.14em] text-black/30 dark:text-white/30 sm:text-[10px]">
                04
              </span>
            </div>

            <div className="mt-4 sm:mt-5">
              <h3 className="text-sm font-semibold tracking-tight text-black dark:text-white">
                Integration
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-black/50 dark:text-white/50 sm:text-xs">
                Learn how DevPulse AI works with GitHub and your repositories.
              </p>
            </div>

            <div className="mt-auto pt-5 sm:pt-6">
              <Button type="button" variant="outline" className="h-9 w-full cursor-pointer border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
                <BookOpen className="mr-1.5 size-3.5 shrink-0 sm:mr-2" />
                <span className="truncate">Learn More</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubRepositoryManagement;