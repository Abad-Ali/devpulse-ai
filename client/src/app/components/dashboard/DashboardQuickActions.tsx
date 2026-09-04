"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, FolderCode, GitBranch, Play, Plus } from "lucide-react";

const actions = [
  { title: "New Program", description: "Start writing code", href: "/programs/new", icon: Plus, primary: true },
  { title: "My Programs", description: "View your programs", href: "/programs", icon: FolderCode },
  { title: "Executions", description: "View your code runs", href: "/executions", icon: Play },
  { title: "GitHub", description: "Manage your repositories", href: "/github", icon: GitBranch },
];

const DashboardQuickActions = () => {
  return (
    <section className="mt-6">
      <div className="mb-4 px-1">
        <h2 className="text-sm font-semibold text-black dark:text-white">Quick Actions</h2>
        <p className="mt-1 text-xs text-black/50 dark:text-white/30">Jump into your workspace</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href} className={`group relative overflow-hidden rounded-[28px] border p-5 transition duration-200 ${action.primary  ? "border-[#FF7700]/30 bg-gradient-to-br from-[#FF7700]/10 via-[#FFAA00]/[0.05] to-transparent hover:border-[#FFAA00]/60 dark:border-[#FF7700]/20 dark:bg-gradient-to-br dark:from-[#FF7700]/10 dark:to-[#FFAA00]/[0.03] dark:hover:border-[#FFAA00]/35 shadow-sm shadow-[#FF7700]/5"  : "border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:bg-white/10 dark:hover:bg-[#15171B]/15"}`}>
              <div className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 ${action.primary ? "bg-[#FF7700]/20" : "bg-black/[0.04] dark:bg-white/[0.05]"}`} />
              
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 ${action.primary ? "bg-[#FF7700]/15 text-[#FF7700] dark:text-[#FFAA00] shadow-xs" : "bg-black/[0.04] dark:bg-white/[0.05] text-black/40 dark:text-white/45 group-hover:text-[#FF7700] dark:group-hover:text-[#FFAA00] group-hover:bg-white dark:group-hover:bg-[#181A1F]"}`}>
                    <Icon size={17} strokeWidth={1.8} />
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-bold text-black/80 dark:text-white/80 transition group-hover:text-black dark:group-hover:text-white">{action.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-black/45 dark:text-white/35 group-hover:text-black/60 dark:group-hover:text-white/50 transition">{action.description}</p>
                  </div>
                </div>

                <div className={`mt-5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition ${action.primary ? "text-[#FF7700] dark:text-[#FFAA00]/80 group-hover:text-[#FF7700] dark:group-hover:text-[#FFAA00]" : "text-black/30 dark:text-white/20 group-hover:text-[#FF7700] dark:group-hover:text-[#FFAA00]"}`}>
                  Open
                  <ArrowRight size={11} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardQuickActions;