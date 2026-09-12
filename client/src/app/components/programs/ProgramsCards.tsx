"use client";
import React, { useState } from "react";
import { CalendarDays, Code2, ExternalLink, FileCode2, Globe2, Lock, Pencil, Play, Trash2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import EditProgramDialog from "./EditProgramDialog";
import DeleteProgramDialog from "./DeleteProgramDialog";
import type { Program } from "@/lib/api/program.api";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";


const ProgramsCards = () => {
  const programs = useAppSelector((state) => state.programs.programs);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  
  const router = useRouter();

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (program: Program) => {
    setProgramToDelete(program);
    setDeleteDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <section className="mt-7">
        <div className="mb-5 px-1">
          <h2 className="text-base font-semibold text-black dark:text-white">Your Programs</h2>
          <p className="mt-1 text-sm text-black/50 dark:text-white/30">Manage and continue working on your programs</p>
        </div>

        {programs.length === 0 ? (
          <div className="flex min-h-[150px] items-center justify-center rounded-[28px] border border-black/[0.08] bg-white/5 px-5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#15171B]/5">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
                <FileCode2 size={18} className="text-black/40 dark:text-white/25" strokeWidth={1.8} />
              </div>
              <p className="mt-3 text-xs font-medium text-black/60 dark:text-white/50">No programs yet</p>
              <p className="mt-1 text-[10px] text-black/40 dark:text-white/25">Create your first program to get started.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {programs.map((program) => (
              <article key={program.id} className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/5 p-5 backdrop-blur-xl transition duration-200 hover:border-black/[0.15] hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#FF7700]/[0.07] blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-32 w-32 rounded-full bg-[#FFAA00]/[0.035] blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/40 transition-all duration-200 group-hover:scale-105 group-hover:bg-white group-hover:text-[#FF7700] dark:bg-white/[0.05] dark:text-white/45 dark:group-hover:bg-[#181A1F] dark:group-hover:text-[#FFAA00]">
                        <Code2 size={20} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-bold tracking-tight text-black/80 transition group-hover:text-black dark:text-white/80 dark:group-hover:text-white">{program.title}</h3>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium capitalize text-black/45 dark:text-white/35">{program.language}</span>
                          <span className="text-xs text-black/20 dark:text-white/15">•</span>
                          {program.visibility === "public" ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"><Globe2 size={13} strokeWidth={1.8} />Public</span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-medium text-[#D88900] dark:text-[#FFAA00]/80"><Lock size={13} strokeWidth={1.8} />Private</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link href={`/programs/${program.id}`}><Tooltip>
                      <TooltipTrigger render={<Button type="button" variant="ghost" size="icon" aria-label="Open Program" className="h-9 w-9 shrink-0 cursor-pointer text-black/30 hover:bg-[#FF7700]/10 hover:text-[#FF7700] dark:text-white/30 dark:hover:bg-[#FFAA00]/10 dark:hover:text-[#FFAA00]" />}>
                        <ExternalLink size={16} strokeWidth={1.8} />
                      </TooltipTrigger>
                      <TooltipContent>Open Program</TooltipContent>
                    </Tooltip></Link>
                  </div>

                  <p className="mt-6 min-h-[60px] text-sm leading-6 text-black/45 dark:text-white/35">{program.description || "No description provided."}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
                    <Info icon={<Play size={14} strokeWidth={1.8} />} label="Last Run" value={program.lastRunAt ? formatDate(program.lastRunAt) : "Never run"} />
                    <Info icon={<Clock3 size={14} strokeWidth={1.8} />} label="Updated" value={formatDate(program.updatedAt)} />
                    <Info icon={<CalendarDays size={14} strokeWidth={1.8} />} label="Created" value={formatDate(program.createdAt)} />
                    <Info icon={<Code2 size={14} strokeWidth={1.8} />} label="Program ID" value={program.id} />
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <Button onClick={()=>router.push(`/programs/editor/${program.id}`)} type="button" variant="ghost" className="h-10 flex-1 cursor-pointer rounded-xl border border-[#FF7700]/15 bg-[#FF7700]/[0.04] text-sm font-semibold text-[#D66A00] transition-all hover:border-[#FF7700]/30 hover:bg-[#FF7700]/10 hover:text-[#FF7700] dark:border-[#FFAA00]/10 dark:bg-[#FFAA00]/[0.04] dark:text-[#FFAA00]/70 dark:hover:border-[#FFAA00]/25 dark:hover:bg-[#FFAA00]/10 dark:hover:text-[#FFAA00]">
                      <Play size={15} strokeWidth={2} />
                      Open in Editor
                    </Button>

                    <Tooltip>
                      <TooltipTrigger render={<Button type="button" variant="ghost" size="icon" aria-label="Edit Program" onClick={() => handleEdit(program)} className="h-10 w-10 cursor-pointer text-black/30 hover:bg-blue-500/10 hover:text-blue-500 dark:text-white/25 dark:hover:bg-blue-400/10 dark:hover:text-blue-400" />}>
                        <Pencil size={15} strokeWidth={1.8} />
                      </TooltipTrigger>
                      <TooltipContent>Edit Program</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger render={<Button type="button" variant="ghost" size="icon" aria-label="Delete Program" onClick={() => handleDeleteClick(program)} className="h-10 w-10 cursor-pointer text-black/30 hover:bg-red-500/10 hover:text-red-500 dark:text-white/25 dark:hover:bg-red-400/10 dark:hover:text-red-400" />}>
                        <Trash2 size={15} strokeWidth={1.8} />
                      </TooltipTrigger>
                      <TooltipContent>Delete Program</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <EditProgramDialog program={selectedProgram} open={editDialogOpen} onOpenChange={setEditDialogOpen}/>
        <DeleteProgramDialog program={programToDelete} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}/>
      </section>
    </TooltipProvider>
  );
};

interface InfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Info = ({ icon, label, value }: InfoProps) => {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.025] text-black/25 dark:bg-white/[0.03] dark:text-white/25">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-black/30 dark:text-white/25">{label}</p>
        <p title={value} className="mt-1 truncate text-xs font-medium text-black/50 dark:text-white/40">{value}</p>
      </div>
    </div>
  );
};

const formatDate = (date: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
  } catch {
    return date;
  }
};

export default ProgramsCards;
