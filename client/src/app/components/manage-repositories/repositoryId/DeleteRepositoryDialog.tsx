"use client";
import { useState } from "react";
import { AlertTriangle, Check, ChevronRight, Loader2, ShieldAlert, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteGitHubRepository } from "@/lib/api/github.api";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeRepository } from "@/lib/redux/features/github/githubRepositoriesSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

interface DeleteRepositoryDialogProps {
  repository_Id: string;
  repositoryId: string;
  repositoryFullName: string;
}

const glassInput = "border-red-500/20 bg-red-500/[0.035] shadow-none " + "placeholder:text-neutral-500 focus-visible:ring-1 " + "focus-visible:ring-red-500/30 " + "dark:border-red-500/20 dark:bg-red-500/[0.035]";

const DeleteRepositoryDialog = ({ repository_Id, repositoryFullName, repositoryId }: DeleteRepositoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [finalConfirmOpen, setFinalConfirmOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isConfirmed = confirmation === repositoryFullName;
  const resetForm = () => {
    setConfirmation("");
    setUnderstood(false);
    setFinalConfirmOpen(false);
  };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const handleFinalDialogChange = (nextOpen: boolean) => {
    if (isDeleting) return;
    setFinalConfirmOpen(nextOpen);
    if (!nextOpen) {
      setUnderstood(false);
    }
  };

  const handleDelete = async () => {
    if (!isConfirmed || !understood) return;

    try {
      setIsDeleting(true);

      const resp = await deleteGitHubRepository(repositoryId, {deletionScope: "everywhere"});
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
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger className='w-full'>
          <button type="button" className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-500/[0.07]">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.06] transition-colors group-hover:border-red-500/35 group-hover:bg-red-500/[0.11]">
              <Trash2 className="size-4 text-red-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                Delete repository
              </p>

              <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                Permanently delete the GitHub repository and its DevPulse AI record.
              </p>
            </div>

            <ChevronRight className="size-4 shrink-0 text-red-400/70 transition-transform group-hover:translate-x-0.5"/>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="min-w-[90dvw] overflow-hidden rounded-2xl border border-red-500/30 bg-white/10 p-0 shadow-2xl shadow-red-950/15 backdrop-blur-lg dark:border-red-500/25 dark:bg-black/10 md:min-w-xl">
          <AlertDialogHeader className="border-b border-red-500/20 px-5 py-5 text-left sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/[0.09]">
                <Trash2 className="size-5 text-red-500"/>
              </div>

              <div className="min-w-0">
                <AlertDialogTitle className="text-base font-semibold">
                  Delete repository?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  You are about to permanently delete this repository from GitHub and remove its DevPulse AI record.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-5 px-5 py-5 sm:px-6">
            <div className="flex gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.09] p-4">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500"/>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                  Permanent deletion
                </p>

                <p className="text-[11px] leading-5 text-neutral-700 dark:text-neutral-300">
                  Unlike removing a saved record, this action deletes the actual GitHub repository as well as its DevPulse AI record. Repository code, issues, and other associated data may become unrecoverable.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="delete-repository-confirmation" className="text-xs font-medium">
                  Enter this to delete the repository
                </Label>

                <p className="mt-2 break-all rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 font-mono text-xs font-medium text-red-600 dark:text-red-400">
                  {repositoryFullName}
                </p>
              </div>

              <Input id="delete-repository-confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value.trim()) } placeholder="Enter repository name" autoComplete="off" spellCheck={false} disabled={isDeleting} className={`h-10 rounded-lg ${glassInput}`}/>

              <p className="text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                The name must match exactly, including capitalization.
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex-row items-center justify-between gap-3 border-t border-red-500/20 bg-red-500/[0.05] px-5 py-4 sm:px-6">
            <AlertDialogCancel disabled={isDeleting} className="mt-0 h-9 cursor-pointer rounded-lg border-neutral-200 bg-white/10 px-4 dark:border-neutral-800 dark:bg-black/10">
              Cancel
            </AlertDialogCancel>

            <Button type="button" disabled={!isConfirmed || isDeleting} onClick={() => { if (!isConfirmed) return; setOpen(false);  setFinalConfirmOpen(true); }} className="h-9 cursor-pointer rounded-lg bg-red-600 px-4 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40">
              <Trash2 className="mr-2 size-4"/>
              Continue to delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={finalConfirmOpen} onOpenChange={handleFinalDialogChange}>
        <AlertDialogContent className="min-w-[90dvw] overflow-hidden rounded-2xl border border-red-500/30 bg-white/10 p-0 shadow-2xl shadow-red-950/20 backdrop-blur-lg dark:border-red-500/25 dark:bg-black/10 md:min-w-xl">
          <AlertDialogHeader className="border-b border-red-500/20 px-5 py-5 text-left sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/[0.12]">
                <ShieldAlert className="size-5 text-red-500"/>
              </div>

              <div className="min-w-0">
                <AlertDialogTitle className="text-base font-semibold">
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  This is the final confirmation before permanently deleting the GitHub repository.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-4 px-5 py-5 sm:px-6">
            <div className="rounded-xl border border-red-500/25 bg-red-500/[0.09] p-4">
              <div className="flex items-center gap-2">
                <Trash2 className="size-4 shrink-0 text-red-500"/>

                <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                  This deletion is permanent
                </p>
              </div>

              <p className="mt-2 break-all font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200">
                {repositoryFullName}
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-700 dark:text-neutral-300">
                Both the actual GitHub repository and its DevPulse AI record are intended to be deleted. You may not be able to recover the repository or its contents.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.045] p-3.5">
              <Checkbox id="understand-delete-repository" checked={understood} onCheckedChange={(checked) => setUnderstood(checked === true) } disabled={isDeleting} className="mt-0.5 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"/>

              <Label htmlFor="understand-delete-repository" className="cursor-pointer text-xs font-normal leading-5 text-neutral-700 dark:text-neutral-300">
                I understand that this action will permanently delete the GitHub repository and its DevPulse AI record, and that this action cannot be undone.
              </Label>
            </div>
          </div>

          <AlertDialogFooter className="flex-row items-center justify-between gap-3 border-t border-red-500/20 bg-red-500/[0.05] px-5 py-4 sm:px-6">
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => {
                setUnderstood(false);
                setFinalConfirmOpen(false);
                setOpen(true);
              }} className="mt-0 h-9 cursor-pointer rounded-lg border-neutral-200 bg-white/10 px-4 dark:border-neutral-800 dark:bg-black/10">
              Go back
            </AlertDialogCancel>

            <Button type="button" disabled={!understood || !isConfirmed || isDeleting} onClick={handleDelete} className="h-9 cursor-pointer rounded-lg bg-red-600 px-4 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40">
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin"/>
                  Deleting...
                </>
              ) : (
                <>
                  <Check className="mr-2 size-4"/>
                  Delete permanently
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteRepositoryDialog;