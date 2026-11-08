"use client";
import React from "react";
import { Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ExecutionHeaderProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
};

const ExecutionHeader = ({ isRefreshing, onRefresh }: ExecutionHeaderProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.04] text-black/50 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/50">
            <Play size={17} strokeWidth={1.8} />
          </div>
  
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black/80 dark:text-white/80">
              Execution History
            </h1>
  
            <p className="mt-1 text-xs text-black/45 dark:text-white/35">
              Track and inspect your program executions.
            </p>
          </div>
        </div>
  
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefreshing} className="w-fit cursor-pointer rounded-xl border-black/[0.08] bg-white/5 text-black/70 transition hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:text-white/70 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 backdrop-blur-xs">
            <RefreshCw size={15} strokeWidth={2} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}/>
            Refresh
          </Button>
        </div>
      </div>
  
      <Separator className="my-6 bg-black/[0.08] dark:bg-white/[0.08]" />
    </>
  );
};

export default ExecutionHeader;