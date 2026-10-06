"use client";

import { BadgeCheckIcon } from "lucide-react";
import Image from "next/image";

const GitHubPageHeader = () => {
  return (
    <header className="pb-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            <div className="relative z-10 flex size-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-950 shadow-sm dark:border-neutral-800">
              <Image src="/assets/logo.png" alt="DevPulse AI" width={15} height={15} className="size-4 object-contain" priority/>
            </div>
            <div className="relative top-2 z-0 flex size-7 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <Image src="/assets/github.svg" alt="GitHub" width={15} height={15} className="size-4 invert dark:invert-0" priority/>
            </div>
          </div>
          
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500 flex gap-2 items-center">
            <BadgeCheckIcon/>
            GitHub Integrated
          </span>
        </div>

        <div className="mt-5 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            GitHub Settings
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">
            Manage your enterprise GitHub connection properties, sync parameters, and continuous repository pipeline workflows.
          </p>
        </div>
      </div>
    </header>
  );
};

export default GitHubPageHeader;
