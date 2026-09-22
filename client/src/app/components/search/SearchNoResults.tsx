"use client";
import React from "react";
import { Check, Code2, Search, SearchX, UserRound } from "lucide-react";

interface SearchNoResultsProps {
  searchType: string;
}

const SearchNoResults = ({ searchType = "username" }: SearchNoResultsProps) => {
  const isUsernameSearch = searchType === "username";
  const ResultIcon = isUsernameSearch ? UserRound : Code2;
  const resultType = isUsernameSearch ? "Developer Profiles" : "Programs";
  const title = isUsernameSearch ? "No developer profiles found" : "No programs found";
  const description = isUsernameSearch ? "We couldn't find a public developer profile matching your search." : "We couldn't find a public program matching your search.";

  const suggestions = isUsernameSearch ?
    [
      "Check the username spelling",
      "Try a shorter username",
      "Search for another developer",
    ] :
    [
      "Check the program name",
      "Try a shorter search",
      "Search for another program",
    ];

  return (
    <section className="w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-[1240px] items-center justify-center pb-10">
        <div className="w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-white/[0.02] dark:border-white/[0.08] dark:bg-white/[0.015]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black/[0.015] dark:bg-white/[0.015]" />

            <div className="relative px-6 py-9 sm:px-10 sm:py-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.025] text-black/40 dark:border-white/[0.08] dark:bg-white/[0.025] dark:text-white/30">
                  <SearchX className="h-5 w-5" strokeWidth={1.6}/>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <ResultIcon className="h-3.5 w-3.5 text-black/30 dark:text-white/25" strokeWidth={1.7}/>

                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-black/35 dark:text-white/25">
                    {resultType}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-tight text-black/85 dark:text-white/85">
                  {title}
                </h2>

                <p className="mt-2 max-w-md text-xs leading-5 text-black/45 dark:text-white/35">
                  {description}
                </p>
              </div>

              <div className="mt-7 flex items-center justify-between rounded-xl border border-black/[0.07] bg-black/[0.02] px-3.5 py-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-black/35 dark:text-white/25" strokeWidth={1.7}/>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-black/55 dark:text-white/40">
                      Search scope
                    </p>

                    <p className="mt-0.5 text-[10px] text-black/35 dark:text-white/25">
                      Public {resultType.toLowerCase()} only
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/25 dark:bg-white/25" />

                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/30 dark:text-white/20">
                    No matches
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-black/35 dark:text-white/25">
                  Try the following
                </p>

                <div className="grid gap-2 sm:grid-cols-3">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion} className="flex items-start gap-2 rounded-xl border border-black/[0.06] bg-black/[0.015] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.015]">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-black/30 dark:text-white/25" strokeWidth={1.8}/>

                      <span className="text-[10px] leading-4 text-black/40 dark:text-white/30">
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchNoResults;