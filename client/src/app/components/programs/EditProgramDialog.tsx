"use client";
import React, { useEffect, useState } from "react";
import { Code2, Globe2, Lock, Save, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Program } from "@/lib/api/program.api";
import { updateProgramService } from "@/lib/api/program.api";
import { toast } from "sonner";
import axios from "axios";
import { updateProgram } from "@/lib/redux/features/programs/programsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

interface EditProgramDialogProps {
  program: Program | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProgramDialog = ({ program, open, onOpenChange }: EditProgramDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!program) {
      setTitle("");
      setDescription("");
      setVisibility("private");
      return;
    }

    setTitle(program.title ?? "");
    setDescription(program.description ?? "");
    setVisibility(program.visibility === "public" ? "public" : "private");
  }, [program]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!program || !title.trim() || isUpdating) return;

    try {
      setIsUpdating(true);

      const res = await updateProgramService(program.id, {
        title: title.trim(),
        description: description.trim(),
        visibility,
      });

      if (res.success) {
        toast.success(res.message);
        dispatch(updateProgram(res.data));
        onOpenChange(false);
        return;
      }

      toast.error(res.message || "Failed to update program.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to update program.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white/50 p-0 shadow-sm backdrop-blur-sm sm:max-w-xl dark:border-white/[0.08] dark:bg-[#15171B]/50">
        <form onSubmit={handleSubmit} className="relative">
          <DialogHeader className="border-b border-black/[0.06] px-6 pb-5 pt-6 dark:border-white/[0.06]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFAA00]/10">
                <Code2 size={17} strokeWidth={1.8} className="text-[#FFAA00]" />
              </div>

              <div className="min-w-0">
                <DialogTitle className="text-base font-semibold text-black dark:text-white">
                  Edit Program
                </DialogTitle>

                <DialogDescription className="mt-1 text-xs text-black/45 dark:text-white/35">
                  Update your program details, description and visibility.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="relative max-h-[520px] space-y-5 overflow-y-auto px-6 py-5">
            {program && (
              <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#FFAA00]/10 blur-2xl" />

                <p className="relative text-[10px] font-medium uppercase tracking-[0.1em] text-black/35 dark:text-white/30">
                  Program ID
                </p>

                <p title={program.id} className="relative mt-1.5 truncate font-mono text-[11px] text-black/50 dark:text-white/40">
                  {program.id}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="program-title" className="text-xs font-semibold text-black/70 dark:text-white/65">
                Title
              </label>

              <Input id="program-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter program title" maxLength={100} disabled={isUpdating} className="h-10 rounded-xl border-black/[0.08] bg-black/[0.02] text-sm text-black shadow-none outline-none transition placeholder:text-black/30 focus-visible:border-black/20 focus-visible:ring-0 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="program-description" className="text-xs font-semibold text-black/70 dark:text-white/65">
                  Description
                </label>

                <span className={`text-[10px] ${description.length > 450 ? "text-[#FFAA00]" : "text-black/30 dark:text-white/25"}`}>
                  {description.length}/500
                </span>
              </div>

              <Textarea id="program-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe what this program does..." maxLength={500} disabled={isUpdating} className="min-h-[115px] resize-none rounded-xl border-black/[0.08] bg-black/[0.02] text-sm leading-6 text-black shadow-none outline-none transition placeholder:text-black/30 focus-visible:border-black/20 focus-visible:ring-0 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20" />
            </div>

            <div className="space-y-2.5">
              <div>
                <p className="text-xs font-semibold text-black/70 dark:text-white/65">
                  Visibility
                </p>

                <p className="mt-1 text-[10px] text-black/35 dark:text-white/25">
                  Choose who can access this program.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" disabled={isUpdating} onClick={() => setVisibility("private")} className={`group relative cursor-pointer overflow-hidden rounded-xl border p-3 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${visibility === "private" ? "border-[#FFAA00]/25 bg-[#FFAA00]/[0.04] dark:border-[#FFAA00]/20 dark:bg-[#FFAA00]/[0.04]" : "border-black/[0.06] bg-black/[0.015] hover:border-[#FFAA00]/20 hover:bg-[#FFAA00]/[0.025] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-[#FFAA00]/20 dark:hover:bg-white/[0.035]"}`}>
                  {visibility === "private" && (
                    <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#FFAA00]/10 blur-2xl" />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${visibility === "private" ? "bg-[#FFAA00]/10 text-[#FFAA00]" : "bg-black/[0.025] text-black/35 dark:bg-white/[0.04] dark:text-white/30"}`}>
                      <Lock size={15} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-black/75 dark:text-white/70">
                        Private
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-black/40 dark:text-white/25">
                        Only you can access it
                      </p>
                    </div>
                  </div>
                </button>

                <button type="button" disabled={isUpdating} onClick={() => setVisibility("public")} className={`group relative cursor-pointer overflow-hidden rounded-xl border p-3 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${visibility === "public" ? "border-[#FFAA00]/25 bg-[#FFAA00]/[0.04] dark:border-[#FFAA00]/20 dark:bg-[#FFAA00]/[0.04]" : "border-black/[0.06] bg-black/[0.015] hover:border-[#FFAA00]/20 hover:bg-[#FFAA00]/[0.025] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-[#FFAA00]/20 dark:hover:bg-white/[0.035]"}`}>
                  {visibility === "public" && (
                    <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#FFAA00]/10 blur-2xl" />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${visibility === "public" ? "bg-emerald-500/10 text-emerald-500/70" : "bg-black/[0.025] text-black/35 dark:bg-white/[0.04] dark:text-white/30"}`}>
                      <Globe2 size={15} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-black/75 dark:text-white/70">
                        Public
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-black/40 dark:text-white/25">
                        Anyone with access can view it
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-black/[0.06] bg-black/[0.015] px-6 py-3 dark:border-white/[0.06] dark:bg-white/[0.015]">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isUpdating} className="h-10 cursor-pointer rounded-xl px-4 text-sm font-medium text-black/45 transition-colors hover:bg-black/[0.04] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white">
              Cancel
            </Button>

            <Button type="submit" disabled={!title.trim() || isUpdating} className="h-10 cursor-pointer rounded-xl bg-[#FFAA00] px-5 text-sm font-semibold text-white shadow-none transition-all duration-200 hover:bg-[#FFAA00]/90 disabled:cursor-not-allowed disabled:opacity-50">
              {isUpdating ? 
                <Loader2 size={15} className="animate-spin" /> : <Save size={15} strokeWidth={2} />
              }
              {isUpdating ? 
                "Saving..." : "Save Changes"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProgramDialog;
