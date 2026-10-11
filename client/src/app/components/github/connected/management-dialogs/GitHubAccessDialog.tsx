"use client";
import Image from "next/image";
import { Check, Code2, GitCommitHorizontal, GitPullRequest, KeyRound, LockKeyhole, Package, UserRound, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const permissionGroups = [
  {
    title: "Account",
    description: "Your connected GitHub identity.",
    items: [
      {
        icon: UserRound,
        title: "GitHub profile",
        description:
          "Access your username, profile identity, and avatar.",
      },
      {
        icon: LockKeyhole,
        title: "Account identity",
        description:
          "Associate repositories and development activity with your account.",
      },
    ]
  },
  {
    title: "Repositories",
    description: "Manage repositories connected to your workspace.",
    items: [
      {
        icon: Package,
        title: "View repositories",
        description:
          "Browse repositories available through your GitHub account.",
      },
      {
        icon: Package,
        title: "Create repositories",
        description:
          "Create new repositories from your DevPulse AI workspace.",
      },
      {
        icon: GitPullRequest,
        title: "Manage repositories",
        description:
          "Work with repository settings and connected repository information.",
      },
    ]
  },
  {
    title: "Code & Development",
    description: "Work with code directly from your workflow.",
    items: [
      {
        icon: Code2,
        title: "Repository contents",
        description:
          "Read and work with files in connected repositories.",
      },
      {
        icon: GitPullRequest,
        title: "Push changes",
        description:
          "Push your DevPulse AI changes to a connected repository.",
      },
      {
        icon: GitCommitHorizontal,
        title: "Create commits",
        description:
          "Create Git commits when saving and pushing changes.",
      },
    ]
  },
];

const GitHubAccessDialog = () => {
  const totalPermissions = permissionGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button type="button" variant="outline" className="h-9 w-full cursor-pointer border-black/10 bg-white px-2 text-[11px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06] sm:px-3 sm:text-xs">
          <KeyRound className="mr-1.5 size-3.5 shrink-0 sm:mr-2" />
          <span className="truncate">View Access</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[80dvh] lg:max-h-[90dvh] w-screen px-5 lg:min-w-[50dvw] lg:max-w-[55dvw] flex-col gap-0 overflow-hidden rounded-2xl border-black/10 bg-white/10 p-0 text-black shadow-2xl dark:border-white/10 dark:bg-black/10 backdrop-blur-xl dark:text-white">
        <DialogHeader className="shrink-0 border-b border-black/[0.06] px-5 py-5 text-left dark:border-white/[0.08] sm:px-7 sm:py-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-black/[0.08] bg-black/[0.03] dark:border-white/[0.1] dark:bg-white/[0.04]">
              <Image src="/assets/github.svg" alt="GitHub" width={25} height={25} className="size-6 invert dark:invert-0"/>
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                GitHub Access
              </DialogTitle>

              <DialogDescription className="mt-1.5 max-w-lg text-xs leading-5 text-black/50 dark:text-white/50 sm:text-sm">
                Understand what DevPulse AI can access and do with your GitHub account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-7 p-5 sm:p-7">
            <section className="rounded-2xl border border-black/[0.08] bg-black/[0.015] p-4 dark:border-white/[0.09] dark:bg-white/[0.025] sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-600/10 bg-emerald-500/[0.08] dark:border-emerald-400/10 dark:bg-emerald-400/[0.08]">
                  <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">
                    Access overview
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/50">
                    Review the capabilities available to your connected GitHub integration.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-black/[0.06] bg-black/[0.015] p-4 dark:border-white/[0.09] dark:bg-white/[0.025] hover:scale-105 duration-300 cursor-pointer">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-black/40 dark:text-white/40">
                    Categories
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tracking-tight">
                    {permissionGroups.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[11px] text-black/45 dark:text-white/45">
                    Access groups
                  </p>
                </div>

                <div className="rounded-xl border border-black/[0.06] bg-black/[0.015] p-4 dark:border-white/[0.09] dark:bg-white/[0.025] hover:scale-105 duration-300 cursor-pointer">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-black/40 dark:text-white/40">
                    Capabilities
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tracking-tight">
                    {totalPermissions.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[11px] text-black/45 dark:text-white/45">
                    Listed permissions
                  </p>
                </div>

                <div className="col-span-2 flex items-center gap-3 rounded-xl border border-black/[0.06] bg-black/[0.015] p-4 dark:border-white/[0.09] dark:bg-white/[0.025] sm:col-span-1 sm:flex-col sm:items-start sm:justify-center hover:scale-105 duration-300 cursor-pointer">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                    <LockKeyhole className="size-4 text-black/60 dark:text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Access details</p>
                    <p className="mt-1 text-[11px] text-black/45 dark:text-white/45">
                      Review below
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {permissionGroups.map((group, groupIndex) => (
              <section key={group.title}>
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.07] bg-black/[0.025] text-xs font-semibold text-black/50 dark:border-white/[0.09] dark:bg-white/[0.035] dark:text-white/50">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-sm font-semibold tracking-tight">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-black/45 dark:text-white/45">
                      {group.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md border border-black/[0.07] px-2 py-1 text-[10px] font-medium tabular-nums text-black/45 dark:border-white/[0.09] dark:text-white/45">
                    {String(group.items.length).padStart(2, "0")} items
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.09]">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className={`group flex items-start gap-3 p-3.5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.025] sm:gap-4 sm:p-4 ${ itemIndex !== group.items.length - 1 ? "border-b border-black/[0.06] dark:border-white/[0.07]" : ""}`}>
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.07] bg-black/[0.025] transition-colors group-hover:bg-black/[0.045] dark:border-white/[0.08] dark:bg-white/[0.035] dark:group-hover:bg-white/[0.06]">
                          <Icon className="size-4 text-black/65 dark:text-white/65" />
                        </div>

                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="text-[13px] font-medium leading-5">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/50">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/[0.09] dark:bg-emerald-400/[0.1]" aria-label="Included capability" title="Included capability">
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.09] dark:bg-white/[0.025] sm:p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.07] bg-black/[0.025] transition-colors group-hover:bg-black/[0.045] dark:border-white/[0.08] dark:bg-white/[0.035] dark:group-hover:bg-white/[0.06]">
                  <LockKeyhole className="size-[18px] text-black/65 dark:text-white/65" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">
                    Security & Privacy
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-black/50 dark:text-white/50">
                    Your GitHub credentials are handled by the DevPulse AI backend. Access tokens are not exposed to the browser or stored inside your programs.
                  </p>

                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-black/[0.06] bg-white/10 p-3 dark:border-white/[0.07] dark:bg-black/10">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-[11px] leading-5 text-black/55 dark:text-white/55">
                      Only rely on the permissions and security guarantees configured for your actual GitHub integration.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-black/[0.07] bg-white/10 px-5 py-4 dark:border-white/[0.08] dark:bg-black/10 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.05]">
              <KeyRound className="size-3.5 text-black/50 dark:text-white/50" />
            </div>
            <p className="text-[11px] leading-4 text-black/45 dark:text-white/45">
              GitHub integration
              <span className="mx-1.5">·</span>
              Permission reference
            </p>
          </div>

          <Button type="button" variant="outline" onClick={() => { window.open( "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps", "_blank", "noopener,noreferrer"); }} className="h-9 w-full gap-2 border-black/10 bg-black/10 text-xs font-medium hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/[0.07] sm:w-auto cursor-pointer">
            GitHub permission docs
            <ArrowUpRight className="size-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubAccessDialog;