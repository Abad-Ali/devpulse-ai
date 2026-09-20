"use client";

import React from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const UserSearchResult = () => {
  
  const users = [
    {
      id: "6a85bf0de114d83998d63481",
      name: "Abad Ali",
      username: "abadali",
      bio: "gffdgfgfdg dfg fdg fdg fdgdd dghdf dr gdgb fdg fghgf fdgdgfdfdfdfdf dfd fdfd df dfdfdfdfdf",
      avatar:
        "https://avatars.githubusercontent.com/u/223816766?v=4",
      createdAt: "2026-09-01T10:30:00.000Z",
    },
    {
      id: "7b96cg1ef225e94009e74592",
      name: "Ayan Khan",
      username: "ayankhan",
      bio: "Full-stack developer building web applications and developer tools.",
      avatar: "/defaultPic.svg",
      createdAt: "2026-08-18T10:30:00.000Z",
    },
    {
      id: "8c07dh2fg336f05110f85603",
      name: "Rahul Kumar",
      username: "rahuldev",
      bio: "Developer interested in systems programming, C++, and modern web technologies.",
      avatar: "/defaultPic.svg",
      createdAt: "2026-07-24T10:30:00.000Z",
    },
    {
      id: "9d18ei3gh447g16221g96714",
      name: "Arjun Verma",
      username: "arjunverma",
      bio: "Software developer working on open-source projects and developer experiences.",
      avatar: "/defaultPic.svg",
      createdAt: "2026-06-14T10:30:00.000Z",
    },
    {
      id: "0e29fj4hi558h27332h07825",
      name: "Neha Singh",
      username: "nehasingh",
      bio: "Frontend developer focused on React, TypeScript, and accessible interfaces.",
      avatar: "/defaultPic.svg",
      createdAt: "2026-05-29T10:30:00.000Z",
    },
    {
      id: "1f30gk5ij669i38443i18936",
      name: "Rohit Sharma",
      username: "rohitdev",
      bio: "Backend developer building APIs, services, and developer-focused applications.",
      avatar: "/defaultPic.svg",
      createdAt: "2026-05-11T10:30:00.000Z",
    },
  ];

  return (
    <section className="w-full text-black dark:text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-7 lg:px-10">
        <div className="mb-8 border-b border-black/20 pb-6 dark:border-white/[0.08]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/20 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:border-black/35 dark:border-white/[0.08] dark:bg-[#15171B]/5">
                <UserRound className="h-4 w-4 text-black/60 transition-colors duration-200 dark:text-white/45" strokeWidth={1.8}/>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-black/85 dark:text-white/85 sm:text-xl">
                    Developer Profiles
                  </h2>
                  <span className="hidden rounded-md bg-black/[0.04] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/45 dark:bg-white/[0.04] dark:text-white/30 sm:inline-block">
                    Public
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-black/45 dark:text-white/35">
                  Public developer profiles matching your search.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-2.5 rounded-xl border border-black/15 bg-white/5 px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:border-black/35 dark:border-white/[0.07] dark:bg-[#15171B]/5">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-black/60 dark:text-white/45">
                {users.length}
                {users.length === 1 ? " profile" : " profiles"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <Link key={user.id} href={`/user/${user.username}`} className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-black/[0.16] hover:bg-black/[0.015] dark:border-white/[0.08] dark:bg-white/[0.015] dark:hover:border-white/[0.15] dark:hover:bg-white/[0.025]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black/[0.02] opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-white/[0.025]" />

              <div className="relative p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-16 w-16 shrink-0 rounded-2xl border border-black/[0.08] bg-black/[0.02] p-1 dark:border-white/[0.08] dark:bg-white/[0.03]">
                      <AvatarImage src={user.avatar || "/defaultPic.svg"} alt={user.name} className="rounded-xl object-cover"/>

                      <AvatarFallback className="rounded-xl bg-black/[0.03] text-black/35 dark:bg-white/[0.03] dark:text-white/30">
                        <UserRound className="h-6 w-6" strokeWidth={1.6} />
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-black/85 transition-colors duration-200 group-hover:text-black dark:text-white/85 dark:group-hover:text-white">
                        {user.name}
                      </h3>

                      <p className="mt-1 truncate font-mono text-xs text-black/55 transition-colors duration-200 group-hover:text-black/60 dark:text-white/25 dark:group-hover:text-white/50">
                        @{user.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.07] text-black/25 transition-all duration-300 group-hover:border-black/[0.12] group-hover:bg-black/[0.03] group-hover:text-[#FF7700] dark:border-white/[0.07] dark:text-white/20 dark:group-hover:border-white/[0.12] dark:group-hover:bg-white/[0.04] dark:group-hover:text-[#FFAA00]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.7}/>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2.5">
                  <FileText className="mt-1 h-3.5 w-3.5 shrink-0 text-black/30 dark:text-white/25" strokeWidth={1.7}/>

                  <p className="line-clamp-3 text-xs leading-5 text-black/55 dark:text-white/25">
                    {user.bio || "No bio available."}
                  </p>
                </div>

                <div className="my-5 h-px bg-black/[0.07] dark:bg-white/[0.07]" />

                <div className="flex min-w-0 items-center gap-2.5">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-black/30 dark:text-white/25" strokeWidth={1.7}/>

                  <span className="truncate text-xs text-black/55 dark:text-white/25">
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {month: "short", year: "numeric"})}
                  </span>

                  <span className="ml-auto shrink-0 text-[10px] font-medium text-black/25 transition-colors duration-200 group-hover:text-black/45 dark:text-white/20 dark:group-hover:text-white/35">
                    View profile
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSearchResult;