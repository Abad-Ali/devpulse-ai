"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Code2, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProgramSearchResult = () => {
  const programs = [
    {
      id: "program-001",
      title: "DevPulse Execution Engine",
      description:
        "A browser-based execution system for running and managing developer programs directly inside DevPulse AI.",
      language: "javascript",
      createdAt: "2026-09-04T10:30:00.000Z",
      user: {
        name: "Abad Ali",
        username: "abadali",
        avatar:
          "https://avatars.githubusercontent.com/u/223816766?v=4",
      },
    },
    {
      id: "program-002",
      title: "Binary Search Implementation",
      description:
        "An implementation of binary search with a simple and efficient approach for sorted collections.",
      language: "cpp",
      createdAt: "2026-08-22T10:30:00.000Z",
      user: {
        name: "Ayan Khan",
        username: "ayankhan",
        avatar: "/defaultPic.svg",
      },
    },
    {
      id: "program-003",
      title: "Python Data Processor",
      description:
        "A small Python utility for processing structured data and generating useful output.",
      language: "python",
      createdAt: "2026-08-09T10:30:00.000Z",
      user: {
        name: "Rahul Kumar",
        username: "rahuldev",
        avatar: "/defaultPic.svg",
      },
    },
    {
      id: "program-004",
      title: "Portfolio Landing Page",
      description:
        "A responsive developer portfolio interface built with modern web technologies.",
      language: "javascript",
      createdAt: "2026-07-18T10:30:00.000Z",
      user: {
        name: "Arjun Verma",
        username: "arjunverma",
        avatar: "/defaultPic.svg",
      },
    },
    {
      id: "program-005",
      title: "Todo Application",
      description:
        "A lightweight todo application demonstrating state management and reusable components.",
      language: "javascript",
      createdAt: "2026-06-27T10:30:00.000Z",
      user: {
        name: "Neha Singh",
        username: "nehasingh",
        avatar: "/defaultPic.svg",
      },
    },
    {
      id: "program-006",
      title: "C File Handler",
      description:
        "A C program demonstrating basic file handling, reading, writing, and structured output.",
      language: "c",
      createdAt: "2026-06-11T10:30:00.000Z",
      user: {
        name: "Rohit Sharma",
        username: "rohitdev",
        avatar: "/defaultPic.svg",
      },
    },
  ];

  return (
    <section className="w-full text-black dark:text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-7 lg:px-10">
        <div className="mb-8 border-b border-black/20 pb-6 dark:border-white/[0.08]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/20 bg-white/5 text-black/60 backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:text-white/45">
                <Code2 className="h-4 w-4" strokeWidth={1.8}/>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-black/85 dark:text-white/85 sm:text-xl">
                    Programs
                  </h2>

                  <span className="hidden rounded-md bg-black/[0.04] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/45 dark:bg-white/[0.04] dark:text-white/30 sm:inline-block">
                    Public
                  </span>
                </div>

                <p className="mt-0.5 text-xs leading-5 text-black/45 dark:text-white/35">
                  Public programs matching your search.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-2.5 rounded-xl border border-black/15 bg-white/5 px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:border-black/35 dark:border-white/[0.07] dark:bg-[#15171B]/5">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-black/60 dark:text-white/45">
                {programs.length}{" "}
                {programs.length === 1 ? "program" : "programs"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <article key={program.id} className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-black/[0.16] hover:bg-black/[0.015] dark:border-white/[0.08] dark:bg-white/[0.015] dark:hover:border-white/[0.15] dark:hover:bg-white/[0.025]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black/[0.02] opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.025]" />

              <div className="relative flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/programs/${program.id}`} className="min-w-0 flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.025] text-black/45 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/30">
                        <Code2 className="h-4 w-4" strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold tracking-tight text-black/85 transition-colors duration-200 group-hover:text-black dark:text-white/85 dark:group-hover:text-white">
                          {program.title}
                        </h3>

                        <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-black/30 dark:text-white/25">
                          {program.language}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link href={`/programs/${program.id}`} aria-label={`Open ${program.title}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.07] text-black/25 transition-all duration-300 group-hover:border-black/[0.12] group-hover:bg-black/[0.03] group-hover:text-[#FF7700] dark:border-white/[0.07] dark:text-white/20 dark:group-hover:border-white/[0.12] dark:group-hover:bg-white/[0.04] dark:group-hover:text-[#FFAA00]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.7}/>
                  </Link>
                </div>

                <Link href={`/programs/${program.id}`} className="mt-6 flex min-h-[72px] cursor-pointer items-start gap-2.5">
                  <FileText className="mt-1 h-3.5 w-3.5 shrink-0 text-black/30 dark:text-white/25" strokeWidth={1.7}/>

                  <p className="line-clamp-3 text-xs leading-6 text-black/40 transition-colors duration-200 group-hover:text-black/50 dark:text-white/30 dark:group-hover:text-white/40">
                    {program.description || "No description available."}
                  </p>
                </Link>

                <div className="my-5 h-px shrink-0 bg-black/[0.07] dark:bg-white/[0.07]" />

                <div className="mt-auto flex min-w-0 items-center justify-between gap-3">
                  <Link href={`/user/${program.user.username}`} onClick={(event) => { event.stopPropagation(); }} className="group/user flex min-w-0 cursor-pointer items-center gap-2.5">
                    <Avatar className="h-7 w-7 shrink-0 rounded-lg border border-black/[0.08] bg-black/[0.02] p-0.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                      <AvatarImage src={ program.user.avatar || "/defaultPic.svg" } alt={program.user.name} className="rounded-md object-cover"/>

                      <AvatarFallback className="rounded-md bg-black/[0.03] text-[9px] font-semibold text-black/40 dark:bg-white/[0.03] dark:text-white/30">
                        {program.user.name ?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-black/55 transition-colors duration-200 group-hover/user:text-[#FF7700] dark:text-white/40 dark:group-hover/user:text-[#FFAA00]">
                        {program.user.name}
                      </p>

                      <p className="truncate font-mono text-[9px] text-black/30 transition-colors duration-200 group-hover/user:text-black/50 dark:text-white/25 dark:group-hover/user:text-white/40">
                        @{program.user.username}
                      </p>
                    </div>
                  </Link>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-black/30 dark:text-white/25" strokeWidth={1.7}/>

                    <span className="text-[11px] text-black/35 dark:text-white/25">
                      {new Date( program.createdAt ).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSearchResult;