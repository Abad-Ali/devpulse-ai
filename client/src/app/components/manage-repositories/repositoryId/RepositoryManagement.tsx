"use client";
import Image from "next/image";
import { Pencil, Trash2, Database, ChevronRight, Unplug } from "lucide-react";

interface RepositoryManagementProps {
  repository: {
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
  };
}

const RepositoryManagement = ({ repository }: RepositoryManagementProps) => {
  return (
    <section className="w-full space-y-3 md:space-y-5">
      {/* GitHub repository */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-black">
        <div className="flex items-center gap-3 border-b border-neutral-200/80 px-4 py-4 dark:border-neutral-800/80 sm:px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/70">
            <Image
              src="/assets/github.svg"
              alt="GitHub"
              width={27}
              height={27}
              className="size-[18px] object-contain invert dark:invert-0"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              GitHub repository
            </h3>

            <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
              {repository.fullName}
            </p>
          </div>
        </div>

        <div className="space-y-1 p-2 sm:p-3">
          {/* Update repository */}
          UpdateRepositoryDialog

          {/* Delete repository */}
          DeleteRepositoryDialog
        </div>
      </div>

      {/* DevPulse AI database */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-black">
        <div className="flex items-center gap-3 border-b border-neutral-200/80 px-4 py-4 dark:border-neutral-800/80 sm:px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <Database className="size-4 text-neutral-700 dark:text-neutral-300" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              DevPulse AI database
            </h3>

            <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
              Manage the repository record saved in your workspace.
            </p>
          </div>
        </div>

        <div className="space-y-1 p-2 sm:p-3">
          {/* Remove from DevPulse AI */}
          RemoveRepositoryDialog 
        </div>
      </div>

      {/* Information note */}
      <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 px-3.5 py-3 dark:border-neutral-800/80 dark:bg-neutral-900/30">
        <p className="text-[11px] leading-5 text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Important:
          </span>{" "}
          Removing affects only DevPulse AI. Deleting permanently removes
          the GitHub repository and its saved record.
        </p>
      </div>
    </section>
  );
};

export default RepositoryManagement;