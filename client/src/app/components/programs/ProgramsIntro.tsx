"use client";
import React from "react";
import Link from "next/link";
import { Code2, Plus, SlidersHorizontal, Layers, Globe2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgramsSearch from "./ProgramsSearch";
import type { Program } from "@/lib/api/program.api";

interface ProgramsIntroProps {
  programs: Program[];
}

const ProgramsIntro = ({ programs }: ProgramsIntroProps) => {
  const totalPrograms = programs.length;

  const publicPrograms = programs.filter((program) => program.visibility === "public").length;
  const privatePrograms = programs.filter((program) => program.visibility === "private").length;

  const stats = [
    {
      label: "Total",
      count: totalPrograms,
      icon: Layers,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
    },
    {
      label: "Public",
      count: publicPrograms,
      icon: Globe2,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
    },
    {
      label: "Private",
      count: privatePrograms,
      icon: Lock,
      iconColor: "text-[#FFAA00]",
      iconBg: "bg-[#FFAA00]/10",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/5 p-5 shadow-sm backdrop-blur-xs dark:border-white/[0.08] dark:bg-[#15171B]/5 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FFAA00]/[0.035] blur-[80px]" />

      <div className="relative">
        <div className="flex flex-col justify-between gap-6 border-b border-black/[0.06] pb-6 dark:border-white/[0.06] md:flex-row md:items-start">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 py-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFAA00]/10">
                <Code2 size={13} strokeWidth={2} className="text-[#FFAA00]"/>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/50 dark:text-white/40">
                Your Workspace
              </span>
            </div>

            <div className="mt-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
                Programs
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-black/50 dark:text-white/40">
                Create, organize, and manage your code in one place. Open a program to continue working or start something new.
              </p>
            </div>
          </div>

          <Button className="group relative h-11 shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,119,0,0.15)] transition-all duration-200 hover:brightness-110">
            <Link href="/programs/new" className="flex justify-center items-center gap-2">
              <Plus size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:rotate-90"/>

              <span>New Program</span>
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="flex items-center gap-2.5 rounded-xl border border-black/[0.05] bg-black/[0.015] px-3 py-2 transition-colors hover:bg-black/[0.03] dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:bg-white/[0.03]">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${stat.iconBg}`}>
                    <Icon size={14} strokeWidth={2.2} className={stat.iconColor}/>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium leading-none text-black/40 dark:text-white/30">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-sm font-bold leading-none text-black dark:text-white">
                      {stat.count}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex w-full items-center gap-2 lg:max-w-sm">
            <div className="min-w-0 flex-1">
              <ProgramsSearch />
            </div>

            {/* <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Filters"
              className="h-9 w-9 shrink-0 rounded-xl border border-black/[0.08] bg-black/[0.02] text-black/50 transition-all hover:border-black/[0.14] hover:bg-black/[0.05] hover:text-black dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white/40 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05] dark:hover:text-white"
            >
              <SlidersHorizontal size={14} strokeWidth={1.9} />
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsIntro;