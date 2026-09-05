"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Bot, CheckCircle2, GitBranch, XCircle } from "lucide-react";
import type { RecentActivity as RecentActivityData } from "@/lib/api/dashboard.api";

interface RecentActivityProps {
  activities: RecentActivityData[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = scrollRef.current;
    if (!element) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    }
  };

  const getActivityIcon = (type: RecentActivityData["type"]) => {
    if (type === "execution") return Activity;
    if (type === "ai") return Bot;
    return GitBranch;
  };

  const getActivityColor = (type: RecentActivityData["type"]) => {
    if (type === "execution") return "text-blue-400";
    if (type === "ai") return "text-purple-400";
    return "text-emerald-400";
  };

  const getActivityBg = (type: RecentActivityData["type"]) => {
    if (type === "execution") return "bg-blue-400/10";
    if (type === "ai") return "bg-purple-400/10";
    return "bg-emerald-400/10";
  };

  const getActivityLabel = (type: RecentActivityData["type"]) => {
    if (type === "execution") return "Execution";
    if (type === "ai") return "AI";
    return "GitHub";
  };

  const getStatusIcon = (status?: string) => {
    if (!status) return null;
    if (status === "success") return <CheckCircle2 size={12} className="text-emerald-400/70" />;
    if (status === "failed" || status === "error") return <XCircle size={12} className="text-red-400/70" />;
    return null;
  };

  const formatTime = (date: string) => {
    const activityDate = new Date(date);
    const now = new Date();
    const difference = now.getTime() - activityDate.getTime();
    const minutes = Math.floor(difference / (1000 * 60));
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return activityDate.toLocaleDateString();
  };

  return (
    <section className="mt-6 min-w-0">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold text-black dark:text-white">Recent Activity</h2>
          <p className="mt-1 text-xs text-black/50 dark:text-white/30">Your latest development activity</p>
        </div>
        <Link href="/activity" className="flex items-center gap-1 text-[11px] font-semibold text-black/40 dark:text-white/30 transition hover:text-[#FF7700] dark:hover:text-[#FFAA00]">
          History
          <ArrowRight size={13} />
        </Link>
      </div>
      
      {activities.length === 0 ? (
        <div className="flex min-h-[150px] items-center justify-center rounded-[28px] border border-black/[0.08] dark:border-white/[0.07] bg-white/5 dark:bg-[#15171B]/5 px-5 backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
              <Activity size={18} className="text-black/40 dark:text-white/25" />
            </div>
            <p className="mt-3 text-xs font-medium text-black/60 dark:text-white/50">No recent activity</p>
            <p className="mt-1 text-[10px] text-black/40 dark:text-white/25">Your latest activity will appear here.</p>
          </div>
        </div>
      ) : (
        <div ref={scrollRef} onWheel={handleWheel} className="w-full overflow-x-auto overscroll-contain pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-3">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const iconColor = getActivityColor(activity.type);
              const iconBg = getActivityBg(activity.type);
              const label = getActivityLabel(activity.type);
              return (
                <div key={activity.id} className="group w-[250px] shrink-0 rounded-[28px] border border-black/[0.08] dark:border-white/[0.07] bg-white/5 dark:bg-[#15171B]/10 p-4 backdrop-blur-xl transition duration-200 hover:border-black/[0.15] dark:hover:border-white/[0.12] hover:bg-white/10 dark:hover:bg-[#181A1F]">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                      <Icon size={17} strokeWidth={1.8} className={`${iconColor} transition`} />
                    </div>
                    <span className="whitespace-nowrap text-[10px] text-black/40 dark:text-white/25">{formatTime(activity.createdAt)}</span>
                  </div>
                  <div className="mt-4">
                    <p className="truncate text-sm font-medium text-black/80 dark:text-white/80 transition group-hover:text-black dark:group-hover:text-white">{activity.title}</p>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-black/50 dark:text-white/30">
                      {activity.type === "execution" ? activity.status === "success" ? "Execution completed successfully" : "Execution did not complete successfully" : activity.type === "ai" ? "AI assistance was used" : "Changes were pushed to GitHub"}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${activity.type === "execution" ? "bg-blue-500 dark:bg-blue-400" : activity.type === "ai" ? "bg-purple-500 dark:bg-purple-400" : "bg-emerald-500 dark:bg-emerald-400"}`} />
                      <span className="text-[10px] text-black/40 dark:text-white/25">{label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(activity.status)}
                      {activity.language && <span className="text-[10px] capitalize text-black/40 dark:text-white/20">{activity.language}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentActivity;