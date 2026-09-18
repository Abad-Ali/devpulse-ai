"use client";

import React from "react";
import Link from "next/link";

import {
  CalendarDays,
  Check,
  Code2,
  ExternalLink,
  History,
  Mail,
  Pencil,
  Plus,
  Settings2Icon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/lib/redux/hooks";

const UserProfileHeader = () => {
  const user = useAppSelector(
    (state) => state.auth.user,
  );

  const profileUrl = user?.username
    ? `/user/${user.username}`
    : "/user";

  const stats = user?.stats;

  return (
    <section className="relative">

      {/* Profile Header */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

        {/* Profile */}

        <div className="flex min-w-0 items-start gap-5 sm:gap-6">

          <Avatar className="h-24 w-24 shrink-0 rounded-full border border-black/[0.08] bg-black/[0.02] p-1 dark:border-white/[0.08] dark:bg-white/[0.03] sm:h-28 sm:w-28">

            <AvatarImage
              src={user?.avatar || "/defaultPic.svg"}
              alt={user?.name || "Profile"}
              className="rounded-full object-cover"
            />

            <AvatarFallback className="rounded-full bg-transparent">

              <img
                src="/defaultPic.svg"
                alt="Default profile"
                className="h-full w-full rounded-full object-cover"
              />

            </AvatarFallback>

          </Avatar>

          <div className="min-w-0 pt-1">

            {/* Name */}

            <div className="flex flex-wrap items-center gap-2">

              <h1 className="break-words text-2xl font-semibold tracking-tight text-black/90 dark:text-white/90 sm:text-3xl">
                {user?.name || "Developer"}
              </h1>

              {user?.isEmailVerified && (
                <span
                  title="Verified account"
                  className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-green-500"
                >

                  <Check
                    className="h-3 w-3 stroke-[3] text-white"
                  />

                </span>
              )}

            </div>

            {/* Username */}

            {user?.username && (
              <p className="mt-1 font-mono text-sm text-black/40 dark:text-white/35">
                @{user.username}
              </p>
            )}

            {/* Bio */}

            <p className="mt-4 max-w-2xl break-words text-sm leading-6 text-black/50 dark:text-white/40">
              {user?.bio ||
                "Build, execute, and share your work through DevPulse."}
            </p>

            {/* Metadata */}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">

              {user?.email && (
                <div className="flex min-w-0 items-center gap-2 text-xs text-black/40 dark:text-white/30">

                  <Mail className="h-3.5 w-3.5 shrink-0" />

                  <span className="break-all">
                    {user.email}
                  </span>

                </div>
              )}

              {user?.createdAt && (
                <div className="flex items-center gap-2 text-xs text-black/35 dark:text-white/30">

                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />

                  <span>
                    Joined{" "}
                    {new Date(
                      user.createdAt,
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Header Actions */}

        <div className="flex shrink-0 items-center gap-2 lg:pt-1">

          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-xl border-black/[0.08] bg-transparent px-4 text-xs font-semibold text-black/55 transition duration-200 hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/45 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.04] dark:hover:text-white"
          >

            <Link
              href={profileUrl}
              className="flex items-center gap-1.5"
            >

              <ExternalLink className="h-3.5 w-3.5 shrink-0" />

              <span>
                Public Profile
              </span>

            </Link>

          </Button>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">

        {/* Programs */}

        <div className="flex items-center gap-2.5">

          <Code2 className="h-4 w-4 shrink-0 text-black/30 dark:text-white/25" />

          <span className="text-sm font-semibold text-black/75 dark:text-white/75">
            {stats?.programs ?? 0}
          </span>

          <span className="text-xs text-black/35 dark:text-white/30">
            Programs
          </span>

        </div>

        <span className="hidden h-4 w-px bg-black/[0.08] sm:block dark:bg-white/[0.08]" />

        {/* Executions */}

        <div className="flex items-center gap-2.5">

          <span className="font-mono text-xs text-black/30 dark:text-white/25">
            &gt;_
          </span>

          <span className="text-sm font-semibold text-black/75 dark:text-white/75">
            {stats?.executions ?? 0}
          </span>

          <span className="text-xs text-black/35 dark:text-white/30">
            Executions
          </span>

        </div>

        <span className="hidden h-4 w-px bg-black/[0.08] sm:block dark:bg-white/[0.08]" />

        {/* Contributions */}

        <div className="flex items-center gap-2.5">

          <span className="text-sm font-semibold text-black/75 dark:text-white/75">
            {stats?.contributions ?? 0}
          </span>

          <span className="text-xs text-black/35 dark:text-white/30">
            Contributions
          </span>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-6 flex justify-center border-t border-black/[0.07] pt-5 dark:border-white/[0.07]">

        <div className="flex flex-wrap items-center justify-center gap-2">

          {/* Update Profile */}

          <Button
            asChild
            className="cursor-pointer rounded-xl bg-black px-4 text-xs font-semibold text-white transition duration-200 hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >

            <Link
              href="/settings/profile"
              className="flex items-center gap-2"
            >

              <Pencil className="h-3.5 w-3.5 shrink-0" />

              <span>
                Update Profile
              </span>

            </Link>

          </Button>

          {/* New Program */}

          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-xl border-black/[0.08] bg-transparent px-4 text-xs font-medium text-black/55 transition duration-200 hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/45 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.04] dark:hover:text-white"
          >

            <Link
              href="/programs/new"
              className="flex items-center gap-2"
            >

              <Plus className="h-3.5 w-3.5 shrink-0" />

              <span>
                New Program
              </span>

            </Link>

          </Button>

          {/* Manage GitHub */}

          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-xl border-black/[0.08] bg-transparent px-4 text-xs font-medium text-black/55 transition duration-200 hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/45 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.04] dark:hover:text-white"
          >

            <Link
              href="/settings/github"
              className="flex items-center gap-2"
            >

              <img
                src="/assets/github.svg"
                alt=""
                className="h-3.5 w-3.5 shrink-0 invert dark:invert-0"
              />

              <span>
                Manage GitHub
              </span>

            </Link>

          </Button>

          {/* Execution History */}

          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-xl border-black/[0.08] bg-transparent px-4 text-xs font-medium text-black/55 transition duration-200 hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/45 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.04] dark:hover:text-white"
          >

            <Link
              href="/activity"
              className="flex items-center gap-2"
            >

              <History className="h-3.5 w-3.5 shrink-0" />

              <span>
                Execution History
              </span>

            </Link>

          </Button>

           {/* Settings */}
          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-xl border-black/[0.08] bg-transparent px-4 text-xs font-medium text-black/55 transition duration-200 hover:border-black/[0.15] hover:bg-black/[0.03] hover:text-black dark:border-white/[0.08] dark:text-white/45 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.04] dark:hover:text-white"
          >

            <Link
              href="/activity"
              className="flex items-center gap-2"
            >

              <Settings2Icon className="h-3.5 w-3.5 shrink-0" />

              <span>
                Settings
              </span>

            </Link>

          </Button>

        </div>

      </div>

    </section>
  );
};

export default UserProfileHeader;