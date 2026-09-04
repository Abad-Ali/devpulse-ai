"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, FolderCode, Plus, Sparkles } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import LaptopModel from "../3d/LaptopModel";

const DashboardGreeting = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Still building?");
    }
  }, []);

  const name = user?.name || user?.username || "Developer";

  if (!mounted) {
    return <div className="min-h-[430px] rounded-[28px] bg-[#15171B]/10 border border-white/[0.08]" />;
  }

  return (
      <section className="relative overflow-hidden rounded-[28px] border border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 backdrop-blur-xs shadow-sm">

      <div className="pointer-events-none absolute left-1/4 top-0 h-32 w-64 rounded-full bg-[#FFAA00]/[0.05] dark:bg-[#FFAA00]/[0.035] blur-[80px]" />

      <div className="relative grid min-h-[430px] lg:grid-cols-[1fr_1fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-9 sm:px-9 lg:px-10 lg:py-10">
          <div className="mb-7 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#FFAA00]/15 bg-[#FFAA00]/10">
              <Sparkles size={14} strokeWidth={1.8} className="text-[#FFAA00]" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/30">Your workspace</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Code2 size={16} strokeWidth={2} className="text-[#FFAA00]" />
              <p className="text-sm font-medium text-[#FFAA00]">{greeting}</p>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-black dark:text-white sm:text-4xl xl:text-[46px] xl:leading-[1.05]">
              <span className="block whitespace-nowrap">Welcome back,</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-black dark:from-white via-[#FFDD00] dark:via-neutral-200 to-[#FF7700] dark:to-neutral-400 bg-clip-text font-black text-transparent">
                {name}.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-black/50 dark:text-white/40 sm:text-[15px]">Everything is ready. Continue working on your active projects or start a new track.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/programs/new" className="group inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,119,0,0.14)] transition duration-200 hover:brightness-110">
              <Plus size={17} strokeWidth={2.5} className="transition-transform duration-200 group-hover:rotate-90"/>
              New Program
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link href="/programs" className="group inline-flex gap-2 h-11 items-center rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.025] dark:bg-white/[0.025] px-5 text-sm font-medium text-black/60 dark:text-white/55 transition duration-200 hover:border-black/[0.14] dark:hover:border-white/[0.14] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:text-black dark:hover:text-white">
              <FolderCode size={17} strokeWidth={2.5} />
              View Programs
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative lg:flex min-h-[300px] items-center justify-center lg:min-h-[430px] hidden cursor-pointer">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7700]/10 blur-[90px]" />

          <div className="pointer-events-none absolute right-8 top-10 hidden h-px w-24 bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent sm:block" />
          <div className="pointer-events-none absolute bottom-12 right-12 hidden h-px w-16 bg-gradient-to-r from-transparent to-[#FFAA00]/20 sm:block" />

          <div className="relative z-10 w-full">
            <LaptopModel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardGreeting;