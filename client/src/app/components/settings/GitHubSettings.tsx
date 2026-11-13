import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch, ShieldCheck, } from "lucide-react";
import { Button } from "@/components/ui/button";

const GitHubSettings = () => {
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            GitHub Settings
          </h2>

          <span className="rounded-full border border-border/70 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Integration
          </span>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your GitHub account and repository integration.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-sm backdrop-blur-xl">
        <div className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 transition-colors group-hover:bg-muted">
            <Image src="/assets/github.svg" alt="GitHub" width={22} height={22} className="invert dark:invert-0"/>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                GitHub Integration
              </h3>

              <span className="rounded-full border border-border/70 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Repository Access
              </span>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Connect and manage your GitHub account to access repositories and streamline your development workflow.
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <GitBranch className="size-3.5" strokeWidth={1.8}/>
              Repository management and integration
            </div>
          </div>

          <Button type="button" variant="outline" size="sm" className="h-9 cursor-pointer rounded-lg border-border/70 bg-background/60 px-3 text-xs font-medium shadow-none transition-all hover:bg-muted sm:self-center">
            <Link href="/github" className="flex">
              Manage GitHub
              <ArrowRight className="ml-2 size-3.5"/>
            </Link>
          </Button>
        </div>

        <div className="mx-5 border-t border-border/60"/>

        <div className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center">

          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 transition-colors group-hover:bg-muted">
            <GitBranch className="size-[19px] text-foreground" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Repository Management
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              View your connected repositories and manage GitHub-related settings from your integration dashboard.
            </p>
          </div>

          <Button size="sm" className="h-9 cursor-pointer rounded-lg px-3 text-xs font-medium shadow-sm sm:self-center">
            <Link href="/github/manage/repositories" className="flex">
              Mangage Repositories
              <ArrowUpRight className="ml-2 size-3.5"/>
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/30 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">

          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/20">
            <ShieldCheck className="size-[17px] text-emerald-700 dark:text-emerald-500" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-foreground">
              Your GitHub connection is important
            </h3>

            <p className="mt-1.5 text-xs leading-[1.8] text-muted-foreground">
              Your GitHub integration provides access to your connected repositories. Always review the permissions you grant and keep your GitHub account secure.
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                Secure repository access and account management
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubSettings;
