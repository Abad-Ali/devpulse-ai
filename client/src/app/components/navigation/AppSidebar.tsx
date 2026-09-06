"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Bot,
  FolderCode,
  LayoutDashboard,
  LogOut,
  Play,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks";

const AppSidebar = () => {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { user } = useAppSelector((state) => state.auth);
  const collapsed = state === "collapsed";

  const closeMobile = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-slate-50/80 backdrop-blur-sm transition-colors duration-200 dark:border-white/[0.06] dark:bg-[#0f1013]/90">
      <div className="flex h-full min-h-0 flex-col bg-slate-50/80 dark:bg-[#0f1013]/90">
        <SidebarHeader className="border-b border-slate-200 bg-slate-50/80 dark:border-white/[0.06] dark:bg-[#0f1013]/90 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="DevPulse AI" className="h-12 rounded-xl text-slate-900 dark:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] group-data-[collapsible=icon]:!size-12">
                <Link href="/dashboard" onClick={closeMobile} className="flex w-full items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-[#2A2C32]">
                    <Image src="/assets/logo.png" alt="DevPulse AI" width={28} height={28} priority className="size-7 shrink-0 object-contain" />
                  </div>
                  {!collapsed && (
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
                        DevPulse
                        <span className="ml-1 bg-gradient-to-r from-[#FF7700] to-[#FFDD00] bg-clip-text text-transparent">AI</span>
                      </p>
                      <p className="whitespace-nowrap text-[9px] tracking-[0.14em] text-slate-400 dark:text-white/30">CODE • EXECUTE • LEARN</p>
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-slate-50/80 dark:bg-[#0f1013]/90 px-2">
          <SidebarGroup className="pt-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="New Program" className="h-10 rounded-xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] text-[#18191d] hover:brightness-110 group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/programs/new" onClick={closeMobile} className="group/nav flex w-full items-center gap-3 text-white">
                      <Plus size={18} strokeWidth={2.5} className="size-[18px] shrink-0 transition-transform duration-200 group-hover/nav:rotate-90"/>
                      {!collapsed && <span className="font-semibold">New Program</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-white/25">
                Workspace
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/dashboard" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <LayoutDashboard size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>Dashboard</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Programs" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/programs" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <FolderCode size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>Programs</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Executions" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/executions" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <Play size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>Executions</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="AI Assistant" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/ai" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <Bot size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>AI Assistant</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mx-2 bg-slate-200 dark:bg-white/[0.06]" />

          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-white/25">
                Discover
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Search" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/search" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <Search size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>Search</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="GitHub" className={`h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white ${collapsed ? "size-12 justify-center p-0" : "w-full"}`}>
                    <Link href="/github" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <div className={`bg-slate-600/50 dark:bg-none rounded-full p-0 ${collapsed ? "" : "border border-slate-600/50 dark:border-none"}`}>
                        <Image
                          src="/assets/github.svg"
                          alt="GitHub"
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] object-contain"
                        />
                      </div>
                      {!collapsed && <span>GitHub</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Activity" className="h-10 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Link href="/activity" onClick={closeMobile} className="flex w-full items-center gap-3">
                      <Activity size={18} className="size-[18px] shrink-0 text-slate-400 dark:text-white/45" />
                      {!collapsed && <span>Activity</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/80 dark:bg-[#0f1013]/90 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" className="h-10 rounded-xl text-slate-500 dark:text-white/40 hover:bg-slate-200/60 hover:text-slate-900 dark:hover:bg-white/[0.05] dark:hover:text-white group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                <Link href="/settings" onClick={closeMobile} className="flex w-full items-center gap-3">
                  <Settings size={18} className="size-[18px] shrink-0" />
                  {!collapsed && <span>Settings</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile" className={`h-10 rounded-xl text-slate-800 dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05] ${collapsed ? "size-12 justify-center p-0" : "w-full"}`}>
                <Link href="/profile" onClick={closeMobile} className="flex w-full items-center gap-3">
                  <Avatar className="size-8 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-white/[0.08] group-data-[collapsible=icon]:size-[18px]">
                    <AvatarImage src={user?.avatar || "/defaultPic.svg"} alt={user?.username || "Profile"} className="size-full object-cover" />
                    <AvatarFallback className="size-full rounded-lg bg-gradient-to-br from-[#FF2200] via-[#FF7700] to-[#FFDD00] text-xs font-bold text-white">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-white/80">{user?.name || user?.username || "Developer"}</p>
                      <p className="truncate text-[11px] text-slate-400 dark:text-white/30">@{user?.username || "user"}</p>
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sign out" onClick={() => {}} className="h-10 rounded-xl text-slate-500 dark:text-white/40 cursor-pointer hover:bg-red-50 dark:hover:bg-red-500/[0.06] hover:text-red-600 dark:hover:text-red-400 group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                <LogOut size={18} className="size-[18px] shrink-0" />
                {!collapsed && <span>Sign out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}

export default AppSidebar