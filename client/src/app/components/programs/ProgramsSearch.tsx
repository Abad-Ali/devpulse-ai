"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Search, Loader2, Lock, Globe2, Code2, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/redux/hooks";

const ProgramsSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const programs = useAppSelector((state) => state.programs.programs);

  const results = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];

    return programs.filter((program) => {
      return program.title.toLowerCase().includes(trimmedQuery) || program.language.toLowerCase().includes(trimmedQuery) || program.description.toLowerCase().includes(trimmedQuery);
    });
  }, [query, programs]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [query]);

  const handleProgramClick = (programId: string) => {
    setOpen(false);
  };

  return (
    <>
      <div className="relative w-full">
        <Search size={15} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-black/35 dark:text-white/30" />
        <Input type="text" placeholder="Search programs..." value={query} onChange={(event) => setQuery(event.target.value)} className="h-9 rounded-xl border-black/[0.08] bg-black/[0.02] pl-10 pr-10 text-xs text-black shadow-none outline-none transition focus-visible:border-black/20 focus-visible:ring-0 placeholder:text-black/35 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20" />
        {loading && <Loader2 size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-black/30 dark:text-white/30" />}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white/7 p-0 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/7 sm:max-w-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FFAA00]/10 blur-[80px]" />

          <DialogHeader className="relative border-b border-black/[0.06] px-6 pb-5 pt-6 dark:border-white/[0.06]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFAA00]/10">
                <Search size={17} strokeWidth={1.8} className="text-[#FFAA00]" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold text-black dark:text-white">Search Programs</DialogTitle>
                <DialogDescription className="mt-1 text-xs text-black/80 dark:text-white/85">{results.length > 0 ? `${results.length} program${results.length === 1 ? "" : "s"} found for "${query}"` : `No programs found for "${query}"`}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="relative max-h-[420px] overflow-y-auto px-6 py-5">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((program) => (
                  <button key={program.id} type="button" onClick={() => handleProgramClick(program.id)} className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.015] p-3 text-left transition-all duration-200 hover:border-[#FFAA00]/20 hover:bg-[#FFAA00]/[0.025] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-[#FFAA00]/20 dark:hover:bg-white/[0.035]">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#FFAA00]/10 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100" />

                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.05] bg-black/[0.025] dark:border-white/[0.05] dark:bg-white/[0.04]">
                      <Code2 size={17} strokeWidth={1.8} className="text-black/35 transition-colors group-hover:text-[#FFAA00] dark:text-white/40 dark:group-hover:text-[#FFAA00]" />
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-black/80 transition-colors group-hover:text-black dark:text-white/85 dark:group-hover:text-white">{program.title}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[10px] font-medium text-black/40 dark:text-white/35">{program.language}</span>
                        <span className="text-black/15 dark:text-white/15">•</span>
                        <span className="truncate text-[10px] text-black/30 dark:text-white/25">{program.updatedAt}</span>
                      </div>
                    </div>

                    <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${program.visibility === "public" ? "bg-emerald-500/10" : "bg-[#FFAA00]/10"}`}>
                      {program.visibility === "public" ? <Globe2 size={14} strokeWidth={1.8} className="text-emerald-500/70" /> : <Lock size={14} strokeWidth={1.8} className="text-[#FFAA00]/70" />}
                    </div>

                    <ArrowUpRight size={14} strokeWidth={1.8} className="relative shrink-0 text-black/15 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFAA00]/70 dark:text-white/15 dark:group-hover:text-[#FFAA00]/70" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-[#FFAA00]/10 blur-xl" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.06] bg-black/[0.025] dark:border-white/[0.06] dark:bg-white/[0.035]">
                    <Search size={21} strokeWidth={1.7} className="text-black/25 dark:text-white/25" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-black/90 dark:text-white/90">No programs found</p>
                <p className="mt-1.5 max-w-xs text-xs leading-5 text-black/80 dark:text-white/80">Try searching with a different program name, description, or programming language.</p>
              </div>
            )}
          </div>

          <div className="border-t border-black/[0.06] bg-black/[0.015] px-6 py-3 dark:border-white/[0.06] dark:bg-white/[0.015]">
            <p className="text-[10px] text-black/70 dark:text-white/70">Search is performed across your loaded programs.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgramsSearch;
