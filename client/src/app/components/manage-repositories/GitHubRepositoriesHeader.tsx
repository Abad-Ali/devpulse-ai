"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Layers3, ShieldCheck, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateGitHubRepositoryDialog from "./CreateGitHubRepositoryDialog";
import GitHubRepositoriesSearch from "./GitHubRepositoriesSearch";
import { useAppSelector } from "@/lib/redux/hooks";

const GitHubRepositoriesHeader = () => {
  const repositories = useAppSelector((state) => state.githubRepositories.repositories);

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="relative isolate w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white/5 shadow-sm backdrop-blur-xs dark:border-white/[0.08] dark:bg-[#15171B]/5">

      <div className="relative p-5 sm:p-7 lg:p-9">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div className="min-w-0">
            <div className="flex items-start gap-3.5">
              <div className="">
                <Image src="/assets/github.svg" alt="GitHub" width={30} height={30} className="size-11 invert dark:invert-0" priority/>
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                  Manage GitHub Repositories
                </h1>

                <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-base">
                  Organize and manage your GitHub repositories.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Create and manage GitHub repositories from your DevPulse AI workspace. Review repository details, update metadata, and keep your development projects organized in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Layers3 className="size-4 text-violet-500"/>
                Centralized management
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="size-4 text-orange-500"/>
                Repository details
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500"/>
                Workspace organization
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button className="cursor-pointer">
                <Link href={repositories[0]?.fullName ? `https://github.com/${repositories[0].fullName.split("/")[0]}` : "https://github.com"} target="_blank" rel="noopener noreferrer" className="flex">
                  Visit GitHub
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>

              <div>
                <CreateGitHubRepositoryDialog/>
              </div>

              <Button variant="outline" className="group h-9 cursor-pointer rounded-2xl border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
                <Link href="/github" className="flex">
                  <Image src="/assets/github.svg" alt="GitHub" width={16} height={16} className="mr-2 size-4 invert dark:invert-0 shrink-0 transition-transform duration-300 group-hover:scale-110"/>
                  GitHub Connected
                  <BadgeCheck className="size-4 text-emerald-500 ml-2"/>
                </Link>
              </Button>

              <div className="h-9">
                <GitHubRepositoriesSearch/>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.12 }} className="hidden lg:block">
            <div className="rounded-2xl border border-border/70 bg-white/70 dark:bg-black/40 p-4 shadow-xl shadow-black/[0.03] backdrop-blur-sm dark:shadow-black/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Image src="/assets/github.svg" alt="GitHub" width={20} height={20} className="size-5 invert dark:invert-0"/>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Your workspace
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Repository overview
                    </p>
                  </div>
                </div>

                <CheckCircle2 className="size-4 text-emerald-500" />
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="group flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background group-hover:scale-110 duration-300">
                    <GitBranch className="size-4 text-orange-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      Repository details
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Names, branches and visibility
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background group-hover:scale-110 duration-300">
                    <Layers3 className="size-4 text-violet-500"/>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      Saved repositories
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Manage your workspace records
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Manage your saved repository records from one dedicated page.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubRepositoriesHeader;