"use client";
import React, { useState } from "react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProgramService, type Program } from "@/lib/api/program.api";
import axios from "axios";
import { toast } from "sonner";
import { removeProgram } from "@/lib/redux/features/programs/programsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

interface DeleteProgramDialogProps {
  program: Program | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteProgramDialog = ({ program, open, onOpenChange }: DeleteProgramDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const dispatch = useAppDispatch();

  const confirmationText = program ? `Delete ${program.title}` : "";

  const handleOpenConfirmation = () => {
    if (!program || isDeleting) return;

    setConfirmText("");
    setConfirmOpen(true);
  };

  const handleCloseConfirmation = (value: boolean) => {
    if (isDeleting) return;

    setConfirmOpen(value);

    if (!value) {
      setConfirmText("");
    }
  };

  const handleDelete = async () => {
    if (!program || isDeleting || confirmText !== confirmationText) return;

    try {
      setIsDeleting(true);

      const res = await deleteProgramService(program.id);

      if (res.success) {
        toast.success(res.message);
        dispatch(removeProgram(program.id));

        setConfirmText("");
        setConfirmOpen(false);
        onOpenChange(false);

        return;
      }

      toast.error(res.message || "Failed to delete program.");
    } catch (error) {
      // console.error("Failed to delete program:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to delete program.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-black/[0.08] bg-white/50 p-0 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/50">
          <div className="relative">
            <DialogHeader className="border-b border-black/[0.06] px-6 pb-5 pt-6 dark:border-white/[0.06]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400">
                  <AlertTriangle size={17} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <DialogTitle className="text-base font-semibold text-black dark:text-white">
                    Delete Program
                  </DialogTitle>

                  <DialogDescription className="mt-1 text-xs leading-5 text-black/45 dark:text-white/35">
                    Permanently remove this program from your workspace. This action cannot be undone.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="relative space-y-5 px-6 py-5">
              {program && (
                <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-red-500/[0.06] blur-2xl" />

                  <div className="relative">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-black/35 dark:text-white/30">
                      Program
                    </p>

                    <p title={program.title} className="mt-1.5 truncate text-sm font-semibold text-black/70 dark:text-white/65">
                      {program.title}
                    </p>

                    <p title={program.id} className="mt-1 truncate font-mono text-[10px] text-black/35 dark:text-white/25">
                      {program.id}
                    </p>
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden rounded-xl border border-red-500/10 bg-red-500/[0.035] px-4 py-4 dark:border-red-400/10 dark:bg-red-400/[0.035]">
                <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-red-500/[0.06] blur-2xl" />

                <div className="relative flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400">
                    <Trash2 size={14} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-black/70 dark:text-white/65">
                      This will permanently delete the program
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-black/40 dark:text-white/30">
                      Make sure you no longer need this program before continuing. Once deleted, it cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-black/[0.06] bg-black/[0.015] px-6 py-3 dark:border-white/[0.06] dark:bg-white/[0.015]">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isDeleting} className="h-10 cursor-pointer rounded-xl px-4 text-sm font-medium text-black/45 transition-colors hover:bg-black/[0.04] hover:text-black disabled:cursor-not-allowed disabled:opacity-50 dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white">
                Cancel
              </Button>

              <Button type="button" onClick={handleOpenConfirmation} disabled={isDeleting || !program} className="h-10 cursor-pointer rounded-xl bg-red-500 px-5 text-sm font-semibold text-white shadow-none transition-all duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600">
                <Trash2 size={15} strokeWidth={1.8} />
                Delete Program
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={handleCloseConfirmation}>
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-black/[0.08] bg-white/50 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#15171B]/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-black dark:text-white">
              Confirm Program Deletion
            </AlertDialogTitle>

            <AlertDialogDescription className="text-xs leading-5 text-black/45 dark:text-white/35">
              Please enter{" "}
              <span className="font-semibold text-black/70 dark:text-white/70">
                "{confirmationText}"
              </span>{" "}
              to delete this program.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-2">
            <Input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder={confirmationText}
              disabled={isDeleting}
              autoComplete="off"
              className="h-10 rounded-xl border-black/[0.08] bg-black/[0.02] text-sm text-black shadow-none outline-none focus-visible:border-red-500/30 focus-visible:ring-0 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} onClick={() => setConfirmText("")} className="cursor-pointer rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isDeleting || !program || confirmText !== confirmationText}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="cursor-pointer rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {
                isDeleting ? <Loader2 size={15} className="mr-2 animate-spin" /> : <Trash2 size={15} strokeWidth={1.8} className="mr-2" />
              }
              {
                isDeleting ? "Deleting..." : "Delete Program"
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteProgramDialog;