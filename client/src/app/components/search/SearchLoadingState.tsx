"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, UserRound } from "lucide-react";

interface SearchLoadingStateProps {
  searchType: string;
}

const SearchLoadingState = ({
  searchType = "username",
}: SearchLoadingStateProps) => {
  const isUsernameSearch = searchType === "username";

  const ResultIcon = isUsernameSearch
    ? UserRound
    : Code2;

  const resultTitle = isUsernameSearch
    ? "Developer Profiles"
    : "Programs";

  const resultDescription = isUsernameSearch
    ? "Public developer profiles matching your search."
    : "Public programs matching your search.";

  return (
    <section className="w-full text-black dark:text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-7 lg:px-10">
        {/* Results Header */}
        <div className="mb-8 border-b border-black/20 pb-6 dark:border-white/[0.08]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left Side */}
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/20 bg-white/5 text-black/60 backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:text-white/45">
                <ResultIcon
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                <motion.div
                  className="absolute inset-0 bg-black/[0.035] dark:bg-white/[0.035]"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-black/85 dark:text-white/85 sm:text-xl">
                    {resultTitle}
                  </h2>

                  <span className="hidden rounded-md bg-black/[0.04] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/45 dark:bg-white/[0.04] dark:text-white/30 sm:inline-block">
                    Public
                  </span>
                </div>

                <p className="mt-0.5 text-xs leading-5 text-black/45 dark:text-white/35">
                  {resultDescription}
                </p>
              </div>
            </div>

            {/* Loading Status */}
            <div className="flex items-center gap-2.5 self-start rounded-xl border border-black/15 bg-white/5 px-3 py-2 backdrop-blur-sm dark:border-white/[0.07] dark:bg-[#15171B]/5 sm:self-center">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-black/60 dark:text-white/45">
                Searching...
              </span>
            </div>
          </div>
        </div>

        {/* Loading Results */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard
              key={index}
              isUsernameSearch={isUsernameSearch}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface LoadingCardProps {
  isUsernameSearch: boolean;
  index: number;
}

const LoadingCard = ({
  isUsernameSearch,
  index,
}: LoadingCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/[0.02] dark:border-white/[0.08] dark:bg-white/[0.015]"
    >
      {/* Loading Surface */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-black/[0.025] to-transparent dark:via-white/[0.025]"
        animate={{
          x: ["0%", "420%"],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 0.35,
          ease: "easeInOut",
          delay: index * 0.07,
        }}
      />

      <div className="relative flex h-full flex-col p-5">
        {isUsernameSearch ? (
          <UserLoadingCard />
        ) : (
          <ProgramLoadingCard />
        )}
      </div>
    </motion.div>
  );
};

const ProgramLoadingCard = () => {
  return (
    <>
      {/* Program Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-xl" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        </div>

        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>

      {/* Description */}
      <div className="mt-6 min-h-[72px] space-y-2.5">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-[90%]" />
        <Skeleton className="h-2.5 w-[65%]" />
      </div>

      {/* Divider */}
      <div className="my-5 h-px shrink-0 bg-black/[0.07] dark:bg-white/[0.07]" />

      {/* Footer */}
      <div className="mt-auto flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Skeleton className="h-7 w-7 shrink-0 rounded-lg" />

          <div className="min-w-0 space-y-1.5">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-2 w-14" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5 rounded" />
          <Skeleton className="h-2.5 w-14" />
        </div>
      </div>
    </>
  );
};

const UserLoadingCard = () => {
  return (
    <>
      {/* User Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="h-16 w-16 shrink-0 rounded-2xl" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>

        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>

      {/* Bio */}
      <div className="mt-6 min-h-[60px] space-y-2.5">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-[88%]" />
        <Skeleton className="h-2.5 w-[62%]" />
      </div>

      {/* Divider */}
      <div className="my-5 h-px shrink-0 bg-black/[0.07] dark:bg-white/[0.07]" />

      {/* Footer */}
      <div className="mt-auto flex min-w-0 items-center gap-2.5">
        <Skeleton className="h-3.5 w-3.5 shrink-0 rounded" />

        <Skeleton className="h-2.5 w-24" />

        <Skeleton className="ml-auto h-2.5 w-16" />
      </div>
    </>
  );
};

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({
  className = "",
}: SkeletonProps) => {
  return (
    <motion.div
      className={`bg-black/[0.055] dark:bg-white/[0.06] ${className}`}
      animate={{
        opacity: [0.4, 0.75, 0.4],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default SearchLoadingState;