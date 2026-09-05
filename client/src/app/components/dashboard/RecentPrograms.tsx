"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileCode2 } from "lucide-react";
import type { RecentProgram } from "@/lib/api/dashboard.api";

interface RecentProgramsProps {
  programs: RecentProgram[];
}

const languageColors: Record<string, string> = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  python: "#3776AB",
  java: "#ED8B00",
  cpp: "#60A5FA",
  c: "#A8B9CC",
  go: "#00ADD8",
  rust: "#DEA584",
};

const getLanguageColor = (language: string) => languageColors[language.toLowerCase()] ?? "#FFAA00";

const formatUpdatedAt = (date: string) => {
  const updatedAt = new Date(date);
  const now = new Date();
  const diff = now.getTime() - updatedAt.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const RecentPrograms = ({ programs }: RecentProgramsProps) => {
  return (
    <section className="mt-6 rounded-[28px] border border-black/[0.08] dark:border-white/[0.07] bg-white/5 dark:bg-[#15171B]/5 p-5 text-black dark:text-white backdrop-blur-xs">
      <div className="mb-5 flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold text-black dark:text-white">Recent Programs</h2>
          <p className="mt-1 text-xs text-black/50 dark:text-white/30">Quickly continue where you left off</p>
        </div>
        <Link href="/programs" className="group flex items-center gap-1.5 text-[11px] font-semibold text-[#FF7700] dark:text-[#FFAA00] transition hover:text-[#FFAA00] dark:hover:text-[#FFDD00]">
          View all
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {programs.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-black/[0.12] dark:border-white/[0.06] bg-white/5 dark:bg-[#15171B]/5">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
              <FileCode2 size={20} className="mx-auto text-black/30 dark:text-white/20" />
            </div>
            <p className="mt-2 text-xs font-medium text-black/60 dark:text-white/40">No programs yet</p>
            <p className="mt-1 text-[10px] text-black/40 dark:text-white/20">Create your first program to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {programs.map((program) => {
            const color = getLanguageColor(program.language);
            return (
              <Link key={program.id} href={`/programs/${program.id}`} className="group relative overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] p-4 transition duration-200 hover:border-black/[0.14] dark:hover:border-white/[0.11] hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-[0.05] dark:opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.10] dark:group-hover:opacity-[0.13]" style={{ backgroundColor: color }} />
                
                <div className="relative flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.05]">
                    <FileCode2 size={17} strokeWidth={1.7} className="text-black/40 dark:text-white/45 transition group-hover:text-[#FF7700] dark:group-hover:text-[#FFAA00]" />
                  </div>
                  <ArrowUpRight size={15} className="text-black/20 dark:text-white/15 transition group-hover:text-black/60 dark:group-hover:text-white/50" />
                </div>
                
                <div className="relative mt-4">
                  <p className="truncate text-sm font-medium text-black/80 dark:text-white/80 transition group-hover:text-black dark:group-hover:text-white">{program.title}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-medium capitalize text-black/50 dark:text-white/40">{program.language}</span>
                    <span className="text-[10px] text-black/20 dark:text-white/15">•</span>
                    <span className="text-[10px] text-black/40 dark:text-white/25">{formatUpdatedAt(program.updatedAt)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentPrograms;