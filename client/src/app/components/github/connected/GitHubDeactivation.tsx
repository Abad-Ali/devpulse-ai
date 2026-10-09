"use client";
import { useState } from "react";
import { AlertTriangle, Ban, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deactivateGitHub } from "@/lib/api/github.api";

const GitHubDeactivation = () => {
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    try {
      setIsDeactivating(true);

      const res = await deactivateGitHub();

      if (res.success) {
        toast.success(res.message || "GitHub integration deactivated successfully.");
        return;
      }

      toast.error(res.message || "Failed to deactivate GitHub integration.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to deactivate GitHub integration.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <>
      <section className="px-3 pb-3">
        <h3 className="font-mono text-lg">DeActivate GitHub Account</h3>
        <span className="text-xs leading-5 text-black/50 dark:text-white/50">Temporarily disable your GitHub integration with DevPulse AI.</span>
      </section>
      <section className="w-full overflow-hidden rounded-2xl border border-red-500/15 bg-white dark:border-red-500/15 dark:bg-black">
        <div className="relative border-b border-black/10 px-5 py-5 dark:border-white/10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
  
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
              <Ban className="size-4 text-red-500" />
            </div>
  
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-black dark:text-white">
                  GitHub Integration
                </h3>
  
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
  
              <p className="mt-1.5 text-xs leading-5 text-black/50 dark:text-white/50">
                Temporarily disable your GitHub integration.
              </p>
            </div>
          </div>
        </div>
  
        <div className="space-y-4 px-5 py-5">
          <div className="rounded-xl border border-black/10 bg-black/[0.015] p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="size-4 text-emerald-500" />
              </div>
  
              <div className="min-w-0">
                <p className="text-xs font-semibold text-black dark:text-white">
                  Connection is active
                </p>
  
                <p className="mt-1 text-[11px] leading-5 text-black/45 dark:text-white/45">
                  DevPulse AI can currently use your GitHub integration for connected features.
                </p>
              </div>
            </div>
          </div>
  
          <div>
            <p className="text-xs font-medium text-black dark:text-white">
              Deactivate integration
            </p>
  
            <p className="mt-1 text-[11px] leading-5 text-black/45 dark:text-white/45">
              Your GitHub account and repositories will remain untouched.
            </p>
  
            <AlertDialog>
              <AlertDialogTrigger>
                <Button disabled={isDeactivating} className="mt-4 h-10 w-full cursor-pointer border border-red-500/30 bg-red-500/10 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-colors hover:bg-red-500/20 hover:text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-400">
                  <Ban className="mr-2 size-3.5" />
                  Deactivate GitHub
                </Button>
              </AlertDialogTrigger>
  
              <AlertDialogContent className="overflow-hidden border-red-500/15 bg-white/10 dark:bg-black/10 backdrop-blur-lg sm:max-w-[400px]">
                <AlertDialogHeader>
                  <div className="mb-1 flex size-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                    <AlertTriangle className="size-4 text-red-500" />
                  </div>
  
                  <AlertDialogTitle>
                    Deactivate GitHub integration?
                  </AlertDialogTitle>
  
                  <AlertDialogDescription>
                    DevPulse AI will stop using your GitHub connection. Your GitHub account and repositories will remain unchanged.
                  </AlertDialogDescription>
                </AlertDialogHeader>
  
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 dark:border-white/10">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
  
                    <div>
                      <p className="text-xs font-medium text-black dark:text-white">
                        GitHub data
                      </p>
  
                      <p className="mt-0.5 text-[11px] text-black/45 dark:text-white/45">
                        Nothing will be deleted
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 dark:border-white/10">
                    <RefreshCw className="size-4 shrink-0 text-black/45 dark:text-white/45" />
  
                    <div>
                      <p className="text-xs font-medium text-black dark:text-white">
                        Reconnection
                      </p>
  
                      <p className="mt-0.5 text-[11px] text-black/45 dark:text-white/45">
                        Available whenever needed
                      </p>
                    </div>
                  </div>
                </div>
  
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeactivating} className="h-10 cursor-pointer bg-white/30 dark:bg-black/30 text-black dark:text-white hover:opacity-95">
                    Cancel
                  </AlertDialogCancel>
  
                  <AlertDialogAction onClick={handleDeactivate} disabled={isDeactivating} className="h-10 cursor-pointer border border-red-500/30 bg-red-500/10 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-colors hover:bg-red-500/20 hover:text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-400">
                    {isDeactivating ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Deactivating...
                      </>
                    ) : (
                      <>
                        <Ban className="mr-2 size-4" />
                        Deactivate GitHub
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </>
  );
};

export default GitHubDeactivation;