"use client";
import React from "react";
import { Code2, Search,  UserRound } from "lucide-react";

const SearchEmptyState = () => {
  return (
    <section className="w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-[1240px] justify-center px-5 pb-16 sm:px-7 lg:px-10">
        <div className="flex w-full max-w-xl flex-col items-center justify-center text-center">
          <div className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-black/20 bg-white/5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5">
            <div className="absolute inset-0 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02]" />

            <Search className="relative h-5 w-5 text-black/55 transition-colors duration-200 dark:text-white/45" strokeWidth={1.8}/>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-black/85 dark:text-white/85 sm:text-2xl">
            Start your search
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-black/45 dark:text-white/35">
            Search for developers by username or discover public programs shared across DevPulse.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="group flex items-center gap-3 rounded-2xl border border-black/15 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-200 hover:border-black/35 hover:bg-white/10 dark:border-white/[0.07] dark:bg-[#15171B]/5 dark:hover:border-white/[0.12] dark:hover:bg-[#15171B]/15">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] text-black/60 transition-all duration-200 group-hover:scale-105 group-hover:bg-white dark:bg-white/[0.05] dark:text-white/45 dark:group-hover:bg-[#181A1F]">
                <UserRound className="h-4 w-4" strokeWidth={1.8}/>
              </div>

              <div className="text-left">
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 dark:text-white/30">
                  Developers
                </p>

                <p className="mt-0.5 text-xs font-medium text-black/75 dark:text-white/70">
                  Find profiles and handles
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-3 rounded-2xl border border-black/15 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-200 hover:border-black/35 hover:bg-white/10 dark:border-white/[0.07] dark:bg-[#15171B]/5 dark:hover:border-white/[0.12] dark:hover:bg-[#15171B]/15">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] text-black/60 transition-all duration-200 group-hover:scale-105 group-hover:bg-white dark:bg-white/[0.05] dark:text-white/45 dark:group-hover:bg-[#181A1F]">
                <Code2 className="h-4 w-4" strokeWidth={1.8}/>
              </div>

              <div className="text-left">
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 dark:text-white/30">
                  Programs
                </p>

                <p className="mt-0.5 text-xs font-medium text-black/75 dark:text-white/70">
                  Discover public programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchEmptyState;