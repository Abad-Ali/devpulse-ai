"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AlertCircle, Check, CheckCircle2, Clock3, Code2, Copy, Loader2, Play, Terminal, Timer, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExecutionHeader from "@/app/components/execution/ExecutionHeader";
import { getMyExecution, getMyExecutions } from "@/lib/api/execution.api";
import Executions from "@/app/components/execution/Executions";

type ExecutionStatus = "pending" | "running" | "success" | "error" | "timeout";
type ExecutionEnvironment = "browser" | "wasm";

type Program = {
  _id: string;
  title: string;
  language: string;
};

type Execution = {
  _id: string;
  programId: Program;
  status: ExecutionStatus;
  stdout?: string;
  stderr?: string;
  executionTime: number;
  environment: ExecutionEnvironment;
  exitCode: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
};

type StatusConfig = {
  label: string;
  icon: React.ElementType;
  className: string;
  dot: string;
};

const ExecutionHistoryPage = () => {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<ExecutionStatus | "all">("all");
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);

  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [copiedOutput, setCopiedOutput] = useState<"stdout" | "stderr" | null>(null);

  const fetchExecutions = async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const resp = await getMyExecutions();

      if (resp?.success) {
        setExecutions(resp.data || []);
      } else {
        setExecutions([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to load execution history.";

        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, []);

  const handleExecutionClick = async (executionId: string) => {
    try {
      setIsDetailOpen(true);
      setIsDetailLoading(true);
      setSelectedExecution(null);

      const resp = await getMyExecution(executionId);

      if (resp?.success) {
        setSelectedExecution(resp.data);
      } else {
        toast.error("Failed to load execution details.");
        setIsDetailOpen(false);
      }
    } catch (error) {
      setIsDetailOpen(false);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to load execution details.";

        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCopy = async (value: string, type: "stdout" | "stderr") => {
    if (!value) {
      toast.info(type === "stdout" ? "There is no standard output to copy." : "There is no error output to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedOutput(type);

      toast.success(type === "stdout" ? "Output copied to clipboard." : "Error output copied to clipboard.");
      setTimeout(() => {
        setCopiedOutput(null);
      }, 1500);
    } catch {
      toast.error("Failed to copy output.");
    }
  };

  const filteredExecutions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return executions.filter((execution) => {
      const matchesSearch = !query || execution.programId?.title?.toLowerCase().includes(query) || execution.programId?.language?.toLowerCase().includes(query) || execution.status.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || execution.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [executions, searchQuery, statusFilter]);

  const statistics = useMemo(() => {
    const total = executions.length;

    const successful = executions.filter((execution) => execution.status === "success").length;
    const failed = executions.filter((execution) => execution.status === "error" || execution.status === "timeout").length;
    const running = executions.filter((execution) => execution.status === "running" || execution.status === "pending").length;

    return {
      total,
      successful,
      failed,
      running,
    };
  }, [executions]);

  const getStatusConfig = (status: ExecutionStatus): StatusConfig => {
    switch (status) {
      case "success":
        return {
          label: "Success",
          icon: CheckCircle2,
          className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          dot: "bg-emerald-500",
        };

      case "error":
        return {
          label: "Error",
          icon: AlertCircle,
          className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
          dot: "bg-red-500",
        };

      case "timeout":
        return {
          label: "Timeout",
          icon: Clock3,
          className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
          dot: "bg-amber-500",
        };

      case "running":
        return {
          label: "Running",
          icon: Loader2,
          className: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
          dot: "bg-blue-500",
        };

      case "pending":
        return {
          label: "Pending",
          icon: Clock3,
          className: "border-muted bg-muted/50 text-muted-foreground",
          dot: "bg-muted-foreground",
        };

      default:
        return {
          label: status,
          icon: AlertCircle,
          className: "border-muted bg-muted/50 text-muted-foreground",
          dot: "bg-muted-foreground",
        };
    }
  };

  const formatDuration = (time: number) => {
    if (time < 1000) {
      return `${Math.round(time)} ms`;
    }

    return `${(time / 1000).toFixed(2)} s`;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatRelativeDate = (date: string) => {
    const now = Date.now();

    const target = new Date(date).getTime();

    const difference = Math.floor((now - target) / 1000);

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes}m ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours}h ago`;
    }

    if (difference < 604800) {
      const days = Math.floor(difference / 86400);
      return `${days}d ago`;
    }

    return formatDate(date);
  };

  const getLanguageLabel = (language?: string) => {
    if (!language) {
      return "Unknown";
    }

    switch (language.toLowerCase()) {
      case "javascript":
        return "JavaScript";

      case "python":
        return "Python";

      case "c":
        return "C";

      case "cpp":
        return "C++";

      case "html":
        return "HTML";

      case "markdown":
        return "Markdown";

      default:
        return language;
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ExecutionHeader isRefreshing={isRefreshing} onRefresh={() => fetchExecutions(true)}/>
        <Executions executions={executions} filteredExecutions={filteredExecutions} statistics={statistics} isLoading={isLoading} searchQuery={searchQuery} statusFilter={statusFilter} setSearchQuery={setSearchQuery} setStatusFilter={setStatusFilter} getStatusConfig={getStatusConfig} getLanguageLabel={getLanguageLabel} formatDuration={formatDuration} formatRelativeDate={formatRelativeDate} onExecutionClick={handleExecutionClick} onClearFilters={() => { setSearchQuery(""); setStatusFilter("all") }}/>
      </div>

      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent side="right" className="w-full overflow-hidden border-l border-border/60 bg-background p-0 sm:max-w-2xl">
          {isDetailLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="relative h-6 w-6 animate-spin" />

                <p className="text-sm text-muted-foreground">
                  Loading execution...
                </p>
              </div>
            </div>
          ) : selectedExecution ? (
            <div className="flex h-full flex-col">
              <div className="shrink-0 border-b border-border/60">
                <div className="px-6 pb-5 pt-6 sm:px-7">
                  <SheetHeader className="space-y-0 text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3.5">
                        <div className="relative shrink-0">
                          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border">
                            <Play className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <SheetTitle className="truncate text-lg font-semibold tracking-tight">
                            {selectedExecution.programId?.title || "Execution"}
                          </SheetTitle>

                          <SheetDescription className="mt-1 flex items-center gap-2 text-xs">
                            <span>
                              {getLanguageLabel( selectedExecution.programId?.language)}
                            </span>

                            <span className="text-muted-foreground/40">•</span>

                            <span className="capitalize">
                              {selectedExecution.environment}
                            </span>
                          </SheetDescription>
                        </div>
                      </div>

                      {(() => {
                        const status = getStatusConfig(selectedExecution.status);
                        const StatusIcon = status.icon;

                        return (
                          <Badge variant="outline" className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${status.className}`}>
                            <span className="flex items-center gap-1.5 font-mono">
                              <StatusIcon className={`h-3.5 w-3.5 ${selectedExecution.status === "running" ? "animate-spin" : ""}`}/>
                              {status.label.toUpperCase()}
                            </span>
                          </Badge>
                        );
                      })()}
                    </div>
                  </SheetHeader>
                </div>
              </div>


              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="px-6 py-6 sm:px-7">

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/[0.18]">
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/[0.07] blur-3xl" />

                    <div className="relative grid grid-cols-2 divide-x divide-border/50">
                      <div className="px-4 py-4 sm:px-5">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Timer className="h-3.5 w-3.5" />
                          <span className="text-[11px] font-medium">
                            Execution time
                          </span>
                        </div>

                        <p className="mt-2 text-xl font-semibold tracking-tight">
                          {formatDuration(selectedExecution.executionTime)}
                        </p>
                      </div>

                      <div className="px-4 py-4 sm:px-5">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Terminal className="h-3.5 w-3.5" />
                          <span className="text-[11px] font-medium">
                            Exit code
                          </span>
                        </div>

                        <p className="mt-2 text-xl font-semibold tracking-tight">
                          {selectedExecution.exitCode ?? "—"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Execution details
                      </p>

                      <span className="text-[10px] text-muted-foreground/60">
                        {formatRelativeDate(selectedExecution.createdAt)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:bg-muted/20">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Code2 className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Language</span>
                        </div>

                        <p className="mt-2 text-sm font-medium">
                          {getLanguageLabel(selectedExecution.programId?.language)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:bg-muted/20">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Zap className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Environment</span>
                        </div>

                        <p className="mt-2 text-sm font-medium capitalize">
                          {selectedExecution.environment}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:bg-muted/20">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Started</span>
                        </div>

                        <p className="mt-2 truncate text-sm font-medium">
                          {selectedExecution.startedAt ? formatDate(selectedExecution.startedAt) : "Not available"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:bg-muted/20">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Finished</span>
                        </div>

                        <p className="mt-2 truncate text-sm font-medium">
                          {selectedExecution.finishedAt ? formatDate(selectedExecution.finishedAt) : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10">
                          <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium">
                            Standard output
                          </h3>

                          <p className="text-[10px] text-muted-foreground">
                            Program output
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!selectedExecution.stdout}
                        onClick={() => handleCopy(selectedExecution.stdout || "", "stdout") } className="h-8 cursor-pointer rounded-lg px-2.5 text-xs">
                        {copiedOutput === "stdout" ? ( <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />) : (<Copy className="mr-1.5 h-3.5 w-3.5" />)}
                        {copiedOutput === "stdout" ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border/60 bg-[#0b0d0f] shadow-sm">
                      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] px-3.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />

                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />

                        <span className="ml-2 font-mono text-[10px] text-white/30">
                          stdout
                        </span>
                      </div>

                      <pre className="max-h-72 min-h-[100px] overflow-auto p-4 font-mono text-[12px] leading-6 text-white/75">
                        {selectedExecution.stdout || "No standard output."}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/10">
                          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium">
                            Standard error
                          </h3>

                          <p className="text-[10px] text-muted-foreground">
                            Runtime errors
                          </p>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" disabled={!selectedExecution.stderr} onClick={() => handleCopy(selectedExecution.stderr || "", "stderr") } className="h-8 cursor-pointer rounded-lg px-2.5 text-xs">
                        {copiedOutput === "stderr" ? (<Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />) : (<Copy className="mr-1.5 h-3.5 w-3.5" />)}
                        {copiedOutput === "stderr" ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-red-500/10 bg-[#100b0b]">
                      <div className="flex h-9 items-center gap-1.5 border-b border-red-500/[0.08] px-3.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />

                        <span className="font-mono text-[10px] text-red-300/35">
                          stderr
                        </span>
                      </div>

                      <pre className="max-h-72 min-h-[80px] overflow-auto p-4 font-mono text-[12px] leading-6 text-red-300/80">
                        {selectedExecution.stderr || "No errors reported."}
                      </pre>
                    </div>
                  </div>


                  <div className="mt-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Timeline
                    </p>

                    <div className="rounded-xl border border-border/60 p-4">
                      <div className="relative">
                        <div className="absolute bottom-3 left-[5px] top-3 w-px bg-border" />

                        <div className="relative flex gap-3">
                          <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500 ring-4 ring-background" />

                          <div className="min-w-0">
                            <p className="text-xs font-medium">
                              Execution started
                            </p>

                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {selectedExecution.startedAt ? formatDate(selectedExecution.startedAt) : "Time unavailable"}
                            </p>
                          </div>
                        </div>

                        <div className="relative mt-5 flex gap-3">
                          <div className={`relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-background ${ selectedExecution.status === "success" ? "bg-emerald-500" : selectedExecution.status === "running" ? "bg-blue-500" : "bg-red-500" }`}/>

                          <div className="min-w-0">
                            <p className="text-xs font-medium">
                              {selectedExecution.status === "running" ? "Execution in progress" : "Execution finished"}
                            </p>

                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {selectedExecution.finishedAt ? formatDate(selectedExecution.finishedAt) : selectedExecution.status === "running" ? "Currently running" : "Time unavailable"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-7">
                    <div className="rounded-xl border border-border/60 bg-muted/[0.12] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Execution ID
                          </p>

                          <p className="mt-1.5 break-all font-mono text-[11px] text-muted-foreground/80">
                            {selectedExecution._id}
                          </p>
                        </div>

                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 cursor-pointer rounded-lg" onClick={() => handleCopy(selectedExecution._id, "stdout") }>
                          {copiedOutput === "stdout" ? (<Check className="h-3.5 w-3.5 text-emerald-500" />) : (<Copy className="h-3.5 w-3.5" />)}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="h-4" />
                </div>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ExecutionHistoryPage;
