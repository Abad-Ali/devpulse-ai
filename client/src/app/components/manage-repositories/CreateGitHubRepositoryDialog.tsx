"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Plus, Globe, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useAppDispatch } from "@/lib/redux/hooks";
import { createGitHubRepository } from "@/lib/api/github.api";
import { upsertRepository } from "@/lib/redux/features/github/githubRepositoriesSlice";

const CreateGitHubRepositoryDialog = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const resetForm = () => {
    setName("");
    setDescription("");
    setVisibility("private");
  };

  const handleCreateRepository = async ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    if (!trimmedName) {
      toast.error("Repository name is required.");
      return;
    }

    try {
      setIsCreating(true);

      const resp = await createGitHubRepository({ name: trimmedName, description: trimmedDescription, visibility });
      if (resp.success) {
        toast.success(resp.message || "Repository created successfully.");
        dispatch(upsertRepository(resp.data));
        setOpen(false);
        resetForm();
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to create repository.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isCreating) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="w-full">
        <Button type="button" variant="outline" className="group h-9 w-full cursor-pointer rounded-2xl border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
          <Plus className="size-3.5 shrink-0 group-hover:rotate-90 duration-300" />

          <span className="truncate">
            Create <span>Repository</span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] gap-0 overflow-hidden rounded-2xl border p-0 shadow-2x sm:max-w-[45vw] bg-white/20 dark:bg-black/20 backdrop-blur-lg">
        <form onSubmit={handleCreateRepository} className="grid grid-cols-1 lg:grid-cols-12 mx-3">
          <div className="flex flex-col p-6 md:col-span-7">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Initialize Repository
              </DialogTitle>

              <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                Configure your project root infrastructure.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-4 flex-1">
              {/* Repository Name Input */}
              <div className="space-y-1.5">
                <Label htmlFor="repo-name" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Project Identity
                </Label>

                <div className="relative flex items-center">
                  <Input id="repo-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="devpulse-project" maxLength={100} required disabled={isCreating} autoComplete="off" className="h-10 rounded-lg border-neutral-200 bg-neutral-50/50 px-3 text-sm font-medium transition-all focus-visible:border-neutral-900 focus-visible:ring-0 dark:border-neutral-800 dark:bg-neutral-900/30 dark:focus-visible:border-neutral-100"/>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="repo-desc" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Description
                  </Label>

                  <span className="text-[10px] tabular-nums font-medium text-neutral-400 dark:text-neutral-500">
                    {description.length}/350
                  </span>
                </div>

                <Textarea id="repo-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you engineering?" maxLength={350} rows={2} disabled={isCreating} className="min-h-[68px] resize-none rounded-lg border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm transition-all focus-visible:border-neutral-900 focus-visible:ring-0 dark:border-neutral-800 dark:bg-neutral-900/30 dark:focus-visible:border-neutral-100"/>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Choose visibility
                </Label>

                <div className="grid grid-cols-2 gap-2">
                  <button type="button" disabled={isCreating} onClick={() => setVisibility("private")} className={`group/btn flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${visibility === "private" ? "border-neutral-900 bg-neutral-950 text-white dark:border-neutral-100 dark:bg-white dark:text-neutral-950" : "border-neutral-200 bg-white/50 hover:bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:bg-neutral-900/60"} ${isCreating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                    <Lock className={`size-4 shrink-0 transition-transform group-hover/btn:scale-110 ${visibility === "private" ? "text-inherit" : "text-neutral-400"}`}/>

                    <span className="text-xs font-semibold">Private</span>
                  </button>

                  <button type="button" disabled={isCreating} onClick={() => setVisibility("public")} className={`group/btn flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${visibility === "public" ? "border-neutral-900 bg-neutral-950 text-white dark:border-neutral-100 dark:bg-white dark:text-neutral-950" : "border-neutral-200 bg-white/50 hover:bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:bg-neutral-900/60"} ${isCreating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                    <Globe className={`size-4 shrink-0 transition-transform group-hover/btn:scale-110 ${ visibility === "public" ? "text-inherit" : "text-neutral-400" }`}/>

                    <span className="text-xs font-semibold">Public</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-900">
              <Button type="button" variant="ghost" disabled={isCreating} onClick={() => setOpen(false)} className="h-9 rounded-lg px-4 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                Cancel
              </Button>

              <Button type="submit" disabled={isCreating || !name.trim()} className="h-9 rounded-lg bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200 shadow-sm">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 size-3.5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Create Repository"
                )}
              </Button>
            </div>
          </div>

          <div className="relative hidden flex-col justify-between border-l p-6 md:col-span-5 lg:flex bg-white/5 dark:bg-black/5">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Image src="/create.svg" alt="CreateRepo" height={35} width={35} className="inverted-0 dark:invert"/>

                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Live Blueprint
                </h4>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Your repository, development environment, and project settings — organized to get you started.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-white/30 p-3.5 shadow-sm dark:bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${name.trim() ? "bg-emerald-500 animate-pulse" : "bg-neutral-300 dark:bg-neutral-700"}`}/>

                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Manifest Definition
                </span>
              </div>

              <div className="mt-2.5 space-y-1 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                <div className="truncate">
                  <span className="text-neutral-400">
                    Repository Name /{" "}
                  </span>
                  <span>{name || "devpulse-project"}</span>
                </div>

                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                  Visibility /
                  {visibility === "private" ? (
                    <Lock className="size-2.5"/>
                  ) : (
                    <Globe className="size-2.5"/>
                  )}
                  {visibility}
                </div>

                <div className="truncate">
                  <span className="text-neutral-400">Branch / </span>
                  <span>main</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-amber-500/15 bg-amber-500/5 px-3 py-2 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />

              <span>
                Please review your settings before proceeding. DevPulse AI isn't liable for unintended errors or data loss.
              </span>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGitHubRepositoryDialog;