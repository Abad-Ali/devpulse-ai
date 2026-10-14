"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/navigation/AppSidebar";
import AppFooter from "../components/navigation/AppFooter";
import ThemeBackground from "../components/theme/ThemeBackground";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import ThemeButton from "../components/theme/ThemeButton";
import MobileBottomNav from "../components/navigation/MobileBottomNav";


export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getPageName = (pathname: string) => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/programs") return "Programs";
    if (pathname === "/programs/new") return "New Program";
    if (pathname.startsWith("/programs/")) return "Program";
    if (pathname === "/executions") return "Executions";
    if (pathname.startsWith("/executions/")) return "Execution";
    if (pathname === "/scanner") return "QR Scanner";
    if (pathname === "/search") return "Search";
    if (pathname === "/github") return "GitHub";
    if (pathname === "/activity") return "Activity";
    if (pathname === "/settings") return "Settings";
    if (pathname.startsWith("/user/")) return "Profile";
    if (pathname === "/signout") return "Sign Out";

    return "Dashboard";
  };

  const pageName = getPageName(pathname);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen">
        <ThemeBackground />

        <SidebarProvider defaultOpen={true} className="bg-transparent" style={{ "--sidebar-width": "280px", "--sidebar-width-icon": "72px" } as React.CSSProperties }>
          <div className="hidden lg:flex"><AppSidebar/></div>
          <div className="lg:hidden"><MobileBottomNav/></div>
          <SidebarInset className="relative flex h-screen min-h-0 flex-col overflow-hidden bg-transparent">
           <header className="z-50 flex h-16 shrink-0 items-center justify-between px-4 border-b border-slate-200 bg-slate-50/80 dark:border-white/[0.06] dark:bg-[#0f1013]/90 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="group relative hidden lg:flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 text-slate-700 dark:text-white/70 backdrop-blur-md shadow-sm transition-all duration-200 p-0 hover:border-black/[0.15] hover:bg-white/10 hover:text-black dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 dark:hover:text-white"/>
                <div className="h-4 w-px bg-black/[0.12] dark:bg-white/[0.08] mx-0.5 hidden lg:inline" />

                <div className="flex h-9 items-center rounded-full border border-black/[0.04] dark:border-white/[0.04] bg-black/[0.015] dark:bg-white/[0.015]  px-4">
                  <h1 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white/80">
                    {pageName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeButton />

                <Link href="/" className="group relative flex h-9 items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 px-4 text-sm font-medium backdrop-blur-md shadow-sm transition-all duration-200 text-slate-700 dark:text-white/70 hover:border-black/[0.15] hover:bg-white/10 hover:text-black dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15 dark:hover:text-white">
                  <Home size={15} strokeWidth={2.5} className="text-slate-800 dark:text-white/80 transition-colors group-hover:text-black dark:group-hover:text-white" />
                  <span className="hidden sm:inline font-semibold">
                    Home
                  </span>
                </Link>
              </div>
            </header>

            <main className="relative min-h-0 flex-1 overflow-y-auto">
              <div className="relative z-10">
                {children}
              </div>

              <AppFooter />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
}