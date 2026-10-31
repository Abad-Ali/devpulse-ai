"use client";
import { useState } from "react";
import { AlertTriangle, Check, ChevronRight, Loader2, ShieldAlert, Unplug } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteGitHubRepository } from "@/lib/api/github.api";
import { toast } from "sonner";
import { removeRepository } from "@/lib/redux/features/github/githubRepositoriesSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";

interface RemoveRepositoryDialogProps {
  repository_Id: string;
  repositoryId: string;
  repositoryFullName: string;
}

const glassInput = "border-red-500/20 bg-red-500/[0.035] shadow-none " + "placeholder:text-neutral-500 focus-visible:ring-1 " + "focus-visible:ring-red-500/30 " + "dark:border-red-500/20 dark:bg-red-500/[0.035]";

const RemoveRepositoryDialog = ({ repository_Id, repositoryFullName, repositoryId }: RemoveRepositoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [finalConfirmOpen, setFinalConfirmOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const isConfirmed = confirmation === repositoryFullName;
  const resetForm = () => {
    setConfirmation("");
    setUnderstood(false);
    setFinalConfirmOpen(false);
  };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenChange = (nextOpen: boolean) => {
    if (isRemoving) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const handleFinalDialogChange = (nextOpen: boolean) => {
    if (isRemoving) return;
    setFinalConfirmOpen(nextOpen);
    if (!nextOpen) {
      setUnderstood(false);
    }
  };

  const handleRemove = async () => {
    if (!isConfirmed || !understood) return;

    try {
      setIsRemoving(true);

      const resp = await deleteGitHubRepository(repositoryId, {deletionScope: "local"});
      if (resp?.success) {
        toast.success(resp.message || "Repository deleted successfully.");
        setFinalConfirmOpen(false);
        setOpen(false);
        resetForm();
        dispatch(removeRepository(repository_Id));
        router.replace('/github/manage/repositories');
        return;
      }

      toast.error(resp?.message || "Failed to delete repository.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete repository.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger className="w-full">
          <button type="button" className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-500/[0.06]">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/[0.05] transition-colors group-hover:border-red-500/25 group-hover:bg-red-500/[0.08]">
              <Unplug className="size-4 text-red-500"/>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                Remove from DevPulse AI
              </p>

              <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                Remove the saved record without deleting the GitHub repository.
              </p>
            </div>

            <ChevronRight className="size-4 shrink-0 text-red-400/70 transition-transform group-hover:translate-x-0.5"/>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="overflow-hidden rounded-2xl border border-red-500/25 bg-white/10 p-0 shadow-2xl shadow-red-950/10 backdrop-blur-lg dark:border-red-500/20 dark:bg-black/10 min-w-[90dvw] md:min-w-xl">
          <AlertDialogHeader className="border-b border-red-500/15 px-5 py-5 text-left sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08]">
                <ShieldAlert className="size-5 text-red-500"/>
              </div>

              <div className="min-w-0">
                <AlertDialogTitle className="text-base font-semibold">
                  Remove repository?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  You are about to permanently remove this repository record from your DevPulse AI workspace.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-5 px-5 py-5 sm:px-6">
            <div className="flex gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500"/>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                  Permanent removal
                </p>

                <p className="text-[11px] leading-5 text-neutral-700 dark:text-neutral-300">
                  The saved record and its DevPulse AI connection will be removed. This action cannot be undone. Your actual GitHub repository will not be deleted.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="remove-repository-confirmation" className="text-xs font-medium">
                  Enter this to remove the repository
                </Label>

                <p className="mt-2 break-all rounded-lg border border-red-500/15 bg-red-500/[0.05] px-3 py-2 font-mono text-xs text-red-600 dark:text-red-400">
                  {repositoryFullName}
                </p>
              </div>

              <Input id="remove-repository-confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value.trim()) } placeholder="Enter repository name" autoComplete="off" spellCheck={false} disabled={isRemoving} className={`h-10 rounded-lg ${glassInput}`}/>

              <p className="text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                The name must match exactly, including capitalization.
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex-row items-center justify-between gap-3 border-t border-red-500/15 bg-red-500/[0.04] px-5 py-4 sm:px-6">
            <AlertDialogCancel disabled={isRemoving} className="mt-0 h-9 cursor-pointer rounded-lg border-red-500/15 bg-red-500/[0.025] px-4 hover:bg-red-500/[0.07]">
              Cancel
            </AlertDialogCancel>

            <Button type="button" disabled={!isConfirmed || isRemoving} onClick={() => {setFinalConfirmOpen(true); setOpen(false)}} className="h-9 cursor-pointer rounded-lg bg-red-600 px-4 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40">
              <Unplug className="mr-2 size-4"/>
              Remove repository
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={finalConfirmOpen} onOpenChange={handleFinalDialogChange}>
        <AlertDialogContent className="overflow-hidden rounded-2xl border border-red-500/25 bg-white/10 p-0 shadow-2xl shadow-red-950/15 backdrop-blur-lg dark:border-red-500/20 dark:bg-black/10 min-w-[90dvw] md:min-w-xl">
          <AlertDialogHeader className="border-b border-red-500/15 px-5 py-5 text-left sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/[0.09]">
                <AlertTriangle className="size-5 text-red-500"/>
              </div>

              <div className="min-w-0">
                <AlertDialogTitle className="text-base font-semibold">
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  This is your final confirmation before removal.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-4 px-5 py-5 sm:px-6">
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4">
              <p className="break-all font-mono text-xs font-medium text-red-600 dark:text-red-400">
                {repositoryFullName}
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-700 dark:text-neutral-300">
                This repository will be permanently removed from DevPulse AI. This action cannot be undone.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-500/[0.035] p-3.5">
              <Checkbox id="understand-remove-repository" checked={understood} onCheckedChange={(checked) => setUnderstood(checked === true) } disabled={isRemoving} className="mt-0.5 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"/>

              <Label htmlFor="understand-remove-repository" className="cursor-pointer text-xs font-normal leading-5 text-neutral-700 dark:text-neutral-300">
                I understand that this action will permanently remove this repository from DevPulse AI and cannot be undone.
              </Label>
            </div>
          </div>

          <AlertDialogFooter className="flex-row items-center justify-between gap-3 border-t border-red-500/15 bg-red-500/[0.04] px-5 py-4 sm:px-6">
            <AlertDialogCancel onClick={resetForm} disabled={isRemoving} className="mt-0 h-9 cursor-pointer rounded-lg border-red-500/15 bg-red-500/[0.025] px-4 hover:bg-red-500/[0.07]">
              Go back
            </AlertDialogCancel>

            <Button type="button" disabled={!understood || !isConfirmed || isRemoving} onClick={handleRemove} className="h-9 cursor-pointer rounded-lg bg-red-600 px-4 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40">
              {isRemoving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin"/>
                  Removing...
                </>
              ) : (
                <>
                  <Check className="mr-2 size-4"/>
                  I understand, remove
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveRepositoryDialog;