"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Check, ExternalLink, Fingerprint, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GitHubConnection {
  githubUserId: string;
  githubUsername: string;
  githubAvatar: string;
  isConnected: boolean;
  connectedAt: string;
}

interface GitHubProfileProps {
  connection: GitHubConnection;
}

const GitHubProfile = ({ connection }: GitHubProfileProps) => {
  const githubUsername = connection.githubUsername || "GitHub User";
  const connectedDate = connection.connectedAt ? new Date(connection.connectedAt).toLocaleDateString( "en-US", { month: "long", day: "numeric", year: "numeric" } ) : "Unknown";

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 dark:border-white/10 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Image src="/assets/github.svg" alt="GitHub" width={18} height={18} className="size-[30px] invert dark:invert-0"/>
          </div>

          <div>
            <p className="text-sm font-semibold text-black dark:text-white">
              GitHub Account
            </p>

            <p className="text-xs text-black/50 dark:text-white/50">
              Your connected GitHub account
            </p>
          </div>
        </div>

        {connection.isConnected && (
          <Badge variant="outline" className="!h-7 !py-1 !pl-2 !pr-2.5 gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500">
              <Check className="size-2.5 text-white" />
            </span>
        
            <span className="font-semibold">
              Connected
            </span>
          </Badge>
        )}
      </div>

      <div className="bg-white px-6 py-6 dark:bg-black sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="size-16 shrink-0 border border-black/10 dark:border-white/10">
              <AvatarImage src={connection.githubAvatar || '/defaultPic.svg'} alt={githubUsername}/>

              <AvatarFallback className="size-16 shrink-0 border border-black/10 dark:border-white/10 bg-white dark:bg-black">
                <Image src={'/defaultPic.svg'} alt="DefaultPic" width={32} height={32}/>
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold tracking-tight text-black dark:text-white">
                {githubUsername}
              </h2>

              <Link href={`https://github.com/${githubUsername}`} target="_blank" className="mt-1.5 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-500 cursor-alias">
                <Image src="/assets/github.svg" alt="GitHub" width={16} height={16} className="size-4 shrink-0 invert dark:invert-0"/>

                <span className="truncate">
                  github.com/{githubUsername}
                </span>
              </Link>
            </div>
          </div>

          <Button className="w-full cursor-pointer border-black/10 bg-white text-black hover:bg-black/[0.03] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.05] sm:w-auto">
            <Link href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Image src="/assets/github.svg" alt="GitHub" width={16} height={16} className="size-4 invert dark:invert-0"/>
              <span>Open GitHub</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-t border-black/10 bg-white px-6 py-6 dark:border-white/10 dark:bg-black sm:px-7">
        <div className="mb-5">
          <p className="text-sm font-semibold text-black dark:text-white">
            Connection details
          </p>

          <p className="mt-1 text-xs text-black/50 dark:text-white/50">
            Information about your GitHub connection.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-black">
              <UserRound className="size-4 text-black/50 dark:text-white/50" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-black/50 dark:text-white/50">
                GitHub username
              </p>

              <p className="mt-1 text-sm font-medium text-black dark:text-white">
                @{githubUsername}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-black">
              <Fingerprint className="size-4 text-black/50 dark:text-white/50" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-black/50 dark:text-white/50">
                GitHub user ID
              </p>

              <p className="mt-1 truncate text-sm font-medium text-black dark:text-white">
                {connection.githubUserId}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-black">
              <CalendarDays className="size-4 text-black/50 dark:text-white/50" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-black/50 dark:text-white/50">
                Connected at
              </p>

              <p className="mt-1 text-sm font-medium text-black dark:text-white">
                {connectedDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-black">
              <Check className="size-4 text-emerald-500" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-black/50 dark:text-white/50">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-black dark:text-white">
                {connection.isConnected ? "Active" : "Disconnected"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfile;