import React from "react";
import { CheckCircle2, Code2, Play, Sparkles, TrendingUp } from "lucide-react";
import type { DashboardStats as DashboardStatsData } from "@/lib/api/dashboard.api";

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const cards = [
    { title: "Programs", value: stats.programs, label: "Total programs", icon: Code2, iconColor: "text-[#FFAA00]", iconBg: "bg-[#FFAA00]/10" },
    { title: "Executions", value: stats.executions, label: "Total executions", icon: Play, iconColor: "text-blue-400", iconBg: "bg-blue-400/10" },
    { title: "Success Rate", value: `${stats.successRate}%`, label: `${stats.successfulExecutions} successful`, icon: CheckCircle2, iconColor: "text-emerald-400", iconBg: "bg-emerald-400/10" },
    { title: "AI Requests", value: stats.aiRequests, label: "Total requests", icon: Sparkles, iconColor: "text-purple-400", iconBg: "bg-purple-400/10" },
  ];

  return (
    <section className="mt-5">
      <div className="grid grid-cols-2 gap-4 pb-6 sm:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="group relative overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.07] bg-white/5 dark:bg-[#15171B]/5 p-5 backdrop-blur-xs transition duration-200 hover:border-black/[0.14] dark:hover:border-white/[0.12] hover:bg-black/[0.02] dark:hover:bg-[#181a1f]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-black/[0.025] dark:bg-white/[0.025] blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 shadow-sm"/>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-black/50 dark:text-white/40">{card.title}</p>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}>
                    <Icon size={17} strokeWidth={1.8} className={card.iconColor} />
                  </div>
                </div>
                
                <div className="mt-5">
                  <p className="text-3xl font-bold tracking-tight text-black dark:text-white">{card.value}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <TrendingUp size={12} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400/70" />
                    <span className="text-[11px] font-medium text-black/40 dark:text-white/30">{card.label}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardStats;