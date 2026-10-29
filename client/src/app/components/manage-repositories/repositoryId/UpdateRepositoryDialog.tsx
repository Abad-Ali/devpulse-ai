"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChevronRight, Globe, Loader2, Pencil, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateGitHubRepository } from "@/lib/api/github.api";

interface GitHubRepository {
  _id: string;
  repositoryId: string;
  repositoryName: string;
  fullName: string;
  description: string;
  visibility: "public" | "private";
}

interface UpdateRepositoryDialogProps {
  repository: GitHubRepository;
}

const glassInput = "border-neutral-200 bg-white/10 shadow-none " + "placeholder:text-neutral-400 focus-visible:ring-1 " + "focus-visible:ring-neutral-400/30 " + "dark:border-neutral-800 dark:bg-black/10 " + "dark:placeholder:text-neutral-500";

const UpdateRepositoryDialog = ({ repository }: UpdateRepositoryDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(repository?.repositoryName ?? "");
  const [description, setDescription] = useState(repository?.description ?? "");
  const [visibility, setVisibility] = useState<"public" | "private">(repository?.visibility === "public" ? "public" : "private");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!repository) return;
    setName(repository.repositoryName ?? "");
    setDescription(repository.description ?? "");
    setVisibility(repository.visibility === "public" ? "public" : "private");
  }, [repository]);

  const resetForm = () => {
    setName(repository?.repositoryName ?? "");
    setDescription(repository?.description ?? "");
    setVisibility(repository?.visibility === "public" ? "public" : "private");
  };

  const handleUpdateRepository = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    if (!trimmedName) {
      toast.error("Repository name is required.");
      return;
    }
    if (!repository?._id || !repository?.repositoryId) {
      toast.error("Repository details are unavailable.");
      return;
    }

    try {
      setIsUpdating(true);

      const resp = await updateGitHubRepository(repository.repositoryId, {name: trimmedName, description: trimmedDescription, visibility});
      if (resp?.success) {
        setOpen(false);
        toast.success(resp.message || "Repository updated successfully.");
        router.refresh();
        return;
      }

      toast.error(resp?.message || "Failed to update repository.");
      return;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update repository.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isUpdating) return;
    if (nextOpen) {
      resetForm();
    }
    setOpen(nextOpen);
  };

  if (!repository) {
    return (
      <button type="button" disabled className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-left opacity-50">
        <div className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Pencil className="size-4"/>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium">
            Update repository
          </p>
          <p className="mt-1 text-[11px] text-neutral-500">
            Repository details unavailable
          </p>
        </div>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="w-full">
        <button type="button" className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-neutral-100/80 dark:hover:bg-neutral-900/70">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white transition-colors group-hover:border-neutral-300 dark:border-neutral-800 dark:bg-black/50 dark:group-hover:border-neutral-700">
            <Pencil className="size-4 text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              Update repository
            </p>

            <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
              Update repository details on GitHub and in DevPulse AI.
            </p>
          </div>

          <ChevronRight className="size-4 shrink-0 text-neutral-400 dark:text-neutral-600 transition-transform group-hover:translate-x-0.5"/>
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/10 p-0 backdrop-blur-lg dark:border-neutral-800 dark:bg-black/10 min-w-[90dvw] md:min-w-xl">
        <form onSubmit={handleUpdateRepository}>
          <DialogHeader className="border-b border-neutral-200 px-5 py-5 text-left dark:border-neutral-800 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white/10 dark:border-neutral-800 dark:bg-black/10">
                <Pencil className="size-4 text-neutral-600 dark:text-neutral-300" />
              </div>

              <div className="min-w-0">
                <DialogTitle className="text-base font-semibold">
                  Update repository
                </DialogTitle>

                <DialogDescription className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                  Edit your repository details and visibility settings.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5 px-5 py-5 sm:px-6">
            <section className="rounded-xl border border-neutral-200 bg-white/10 p-3.5 dark:border-neutral-800 dark:bg-black/10">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold">
                    {repository.fullName ||
                      repository.repositoryName ||
                      "Unnamed repository"}
                  </p>

                  <p className="mt-1 break-all text-[11px] text-neutral-500 dark:text-neutral-400">
                    Repository ID: {repository.repositoryId}
                  </p>

                  <p className="mt-1 break-all text-[11px] text-neutral-500 dark:text-neutral-400">
                    Database ID: {repository._id}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-neutral-200 bg-white/10 px-2 py-1 text-[10px] capitalize text-neutral-600 dark:border-neutral-800 dark:bg-black/10 dark:text-neutral-300 flex gap-1">
                  <Globe size={12} />
                  {repository.visibility}
                </span>
              </div>
            </section>

            <div className="space-y-2">
              <Label htmlFor="repository-name" className="text-xs font-medium">
                Repository name
              </Label>

              <Input id="repository-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="my-awesome-project" maxLength={100} required disabled={isUpdating} className={`h-10 rounded-lg ${glassInput}`}/>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="repository-description" className="text-xs font-medium">
                  Description
                  <span className="ml-1 font-normal text-neutral-400">
                    (optional)
                  </span>
                </Label>

                <span className="text-[11px] text-neutral-400">
                  {description.length}/350
                </span>
              </div>

              <Textarea id="repository-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this repository about?" maxLength={350} rows={2} disabled={isUpdating} className={`min-h-16 resize-none rounded-lg ${glassInput}`}/>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium">
                  Repository visibility
                </Label>

                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  Choose who can access this repository.
                </p>
              </div>

              <RadioGroup value={visibility} onValueChange={(value) => setVisibility(value as "public" | "private") } disabled={isUpdating} className="grid grid-cols-2 gap-3">
                <Label htmlFor="visibility-public" className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${visibility === "public" ? "border-neutral-400 bg-white/10 dark:border-neutral-600 dark:bg-black/10" : "border-neutral-200 hover:bg-white/10 dark:border-neutral-800 dark:hover:bg-black/10"}`}>
                  <RadioGroupItem value="public" id="visibility-public" className="mt-0.5"/>

                  <div className="min-w-0">
                    <p className="text-xs font-medium">Public</p>

                    <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                      Anyone can view this repository.
                    </p>
                  </div>
                </Label>

                <Label htmlFor="visibility-private" className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${visibility === "private" ? "border-neutral-400 bg-white/10 dark:border-neutral-600 dark:bg-black/10" : "border-neutral-200 hover:bg-white/10 dark:border-neutral-800 dark:hover:bg-black/10"}`}>
                  <RadioGroupItem value="private" id="visibility-private" className="mt-0.5"/>

                  <div className="min-w-0">
                    <p className="text-xs font-medium">Private</p>

                    <p className="mt-1 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                      Only authorized users can access it.
                    </p>
                  </div>
                </Label>
              </RadioGroup>

              <p className="text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
                Changing visibility affects access to your GitHub repository.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-row items-center justify-between gap-4 border-t border-white/15 bg-white/5 px-6 py-4 dark:border-white/10 dark:bg-black/10">
            <div className="hidden items-center gap-1.5 text-[12px] sm:flex">
              <ShieldCheck className="size-3.5 text-emerald-500"/>
              <span className="text-neutral-500">Secure configuration</span>
            </div>

            <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isUpdating} className="h-9 w-auto cursor-pointer rounded-lg px-4">
                Cancel
              </Button>

              <Button type="submit" disabled={isUpdating || !name.trim()} className="h-9 w-auto cursor-pointer rounded-lg px-4">
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin"/>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4"/>
                    Save changes
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRepositoryDialog;
