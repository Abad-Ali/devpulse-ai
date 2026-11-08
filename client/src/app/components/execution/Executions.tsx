"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Code2, FileCode2, Filter, Loader2, Play, Search, Terminal, Timer, XCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

type ExecutionsProps = {
  executions: Execution[];
  filteredExecutions: Execution[];
  statistics: {
    total: number;
    successful: number;
    failed: number;
    running: number;
  };
  isLoading: boolean;
  searchQuery: string;
  statusFilter: ExecutionStatus | "all";
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<ExecutionStatus | "all">>;
  getStatusConfig: (status: ExecutionStatus) => StatusConfig;
  getLanguageLabel: (language?: string) => string;
  formatDuration: (time: number) => string;
  formatRelativeDate: (date: string) => string;
  onExecutionClick: (executionId: string) => void;
  onClearFilters: () => void;
};

const Executions = ({ executions, filteredExecutions, statistics, isLoading, searchQuery, statusFilter, setSearchQuery, setStatusFilter, getStatusConfig, getLanguageLabel, formatDuration, formatRelativeDate, onExecutionClick, onClearFilters }: ExecutionsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const executionsPerPage = 10;
  const totalPages = Math.ceil(filteredExecutions.length / executionsPerPage);

  const paginatedExecutions = useMemo(() => {
    const start = (currentPage - 1) * executionsPerPage;
    return filteredExecutions.slice(start, start + executionsPerPage);
  }, [filteredExecutions, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="group rounded-2xl border border-black/[0.08] bg-white/5 p-4 transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/50 dark:text-white/30">
              Total
            </p>

            <Terminal size={16} className="text-black/30 dark:text-white/30" />
          </div>

          <p className="mt-3 text-2xl font-bold text-black/80 dark:text-white/80">
            {statistics.total}
          </p>

          <p className="mt-1 text-xs text-black/45 dark:text-white/35">
            Executions
          </p>
        </div>

        <div className="group rounded-2xl border border-black/[0.08] bg-white/5 p-4 transition duration-200 hover:border-emerald-500/20 hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:bg-[#15171B]/15 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/50 dark:text-white/30">
              Successful
            </p>

            <CheckCircle2 size={16} className="text-emerald-500/70" />
          </div>

          <p className="mt-3 text-2xl font-bold text-black/80 dark:text-white/80">
            {statistics.successful}
          </p>

          <p className="mt-1 text-xs text-black/45 dark:text-white/35">
            Completed runs
          </p>
        </div>

        <div className="group rounded-2xl border border-black/[0.08] bg-white/5 p-4 transition duration-200 hover:border-red-500/20 hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:bg-[#15171B]/15 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/50 dark:text-white/30">
              Failed
            </p>

            <XCircle size={16} className="text-red-500/70" />
          </div>

          <p className="mt-3 text-2xl font-bold text-black/80 dark:text-white/80">
            {statistics.failed}
          </p>

          <p className="mt-1 text-xs text-black/45 dark:text-white/35">
            Errors & timeouts
          </p>
        </div>

        <div className="group rounded-2xl border border-black/[0.08] bg-white/5 p-4 transition duration-200 hover:border-[#FF7700]/30 hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:bg-[#15171B]/15 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/50 dark:text-white/30">
              Active
            </p>

            <Zap size={16} className="text-[#FF7700]/80" />
          </div>

          <p className="mt-3 text-2xl font-bold text-black/80 dark:text-white/80">
            {statistics.running}
          </p>

          <p className="mt-1 text-xs text-black/45 dark:text-white/35">
            Pending & running
          </p>
        </div>
      </div>

      {!isLoading && executions.length > 0 && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 backdrop-blur-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30"/>

            <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search executions..." className="h-10 rounded-xl border-black/[0.08] bg-white/5 pl-9 transition hover:border-black/[0.15] dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] "/>
          </div>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ExecutionStatus | "all") }>
            <SelectTrigger className="h-10 w-full cursor-pointer rounded-xl border-black/[0.08] bg-white/5 dark:border-white/[0.08] dark:bg-[#15171B]/5 sm:w-[170px] backdrop-blur-xs">
              <Filter size={15} className="mr-2 text-black/40 dark:text-white/40"/>
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="timeout">Timeout</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isLoading && (
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={22} className="animate-spin" />

            <p className="text-sm text-black/45 dark:text-white/35">
              Loading execution history...
            </p>
          </div>
        </div>
      )}

      {!isLoading && executions.length === 0 && (
        <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#FF7700]/10 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-black/[0.04] text-black/50 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/50">
              <Play size={26} />
            </div>
          </div>

          <h2 className="mt-6 text-lg font-bold text-black/80 dark:text-white/80">
            No executions yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-black/45 dark:text-white/35">
            Run a program from the DevPulse editor and your execution history
            will appear here.
          </p>
        </div>
      )}

      {!isLoading &&
        executions.length > 0 &&
        filteredExecutions.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <Search size={26} className="text-black/25 dark:text-white/25" />

            <h2 className="mt-4 font-semibold text-black/80 dark:text-white/80">
              No executions found
            </h2>

            <p className="mt-1 text-sm text-black/45 dark:text-white/35">
              Try changing your search or status filter.
            </p>

            <Button variant="ghost" size="sm" className="mt-3 cursor-pointer rounded-lg" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        )}

      {!isLoading && paginatedExecutions.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/25">
              Recent executions
            </p>

            <p className="text-xs text-black/40 dark:text-white/30">
              {filteredExecutions.length}{" "}
              {filteredExecutions.length === 1 ? "execution" : "executions"}
            </p>
          </div>

          <div className="space-y-3">
            {paginatedExecutions.map((execution) => {
              const status = getStatusConfig(execution.status);
              const StatusIcon = status.icon;

              return (
                <div key={execution._id} className="group cursor-pointer rounded-2xl border border-black/[0.08] bg-white/5 p-4 transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 sm:p-5">
                  <div className="flex items-start gap-4 backdrop-blur-xs">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.04] text-black/35 transition duration-200 group-hover:border-[#FF7700]/20 group-hover:bg-[#FF7700]/10 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/35 sm:flex">
                      <FileCode2 size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-black/80 dark:text-white/80">
                          {execution.programId?.title || "Untitled program"}
                        </h3>

                        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px]">
                          {getLanguageLabel(execution.programId?.language)}
                        </Badge>

                        <Badge variant="outline" className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${status.className}`}>
                          <StatusIcon size={11} className={`mr-1 ${ execution.status === "running" ? "animate-spin" : "" }`}/>
                          {status.label.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/40 dark:text-white/30">
                        <span className="flex items-center gap-1">
                          <Timer size={12} />
                          {formatDuration(execution.executionTime)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Code2 size={12} />

                          <span className="capitalize">
                            {execution.environment}
                          </span>
                        </span>

                        <span>{formatRelativeDate(execution.createdAt)}</span>

                        {execution.exitCode !== null && (
                          <span>Exit code {execution.exitCode}</span>
                        )}
                      </div>

                      <div className="mt-4">
                        <Button size="sm" onClick={() => onExecutionClick(execution._id)} className="group h-8 cursor-pointer rounded-lg bg-emerald-600/10 px-3 text-xs text-black transition hover:bg-emerald-700/10 dark:bg-emerald-500/10 dark:text-white">
                          Inspect Execution
                          <ChevronRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1"/>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-black/40 dark:text-white/30">
                Showing {(currentPage - 1) * executionsPerPage + 1}–
                {Math.min(
                  currentPage * executionsPerPage,
                  filteredExecutions.length,
                )}{" "}
                of {filteredExecutions.length}
              </p>

              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();

                        if (currentPage > 1) {
                          setCurrentPage((page) => page - 1);
                        }
                      }}
                      className={ currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}/>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter((page) => {
                      if (totalPages <= 5) {
                        return true;
                      }

                      if (page === 1 || page === totalPages) {
                        return true;
                      }

                      return Math.abs(page - currentPage) <= 1;
                    })
                    .map((page) => (
                      <PaginationItem key={page}>
                        <Button
                          variant={
                            currentPage === page ? "default" : "ghost"
                          }
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                          className="h-8 w-8 cursor-pointer rounded-lg text-xs">
                          {page}
                        </Button>
                      </PaginationItem>
                    ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();

                        if (currentPage < totalPages) {
                          setCurrentPage((page) => page + 1);
                        }
                      }}
                      className={ currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer" }/>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Executions;
