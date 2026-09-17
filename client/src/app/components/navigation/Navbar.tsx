"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Cpu, HelpCircle, Layers, LayoutDashboard, LoaderCircle, LogIn, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.auth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between rounded-full border border-white/[0.06] bg-[#0E1013]/60 px-4 backdrop-blur-xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
        
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-gradient-to-b from-[#1C1E22] to-[#121417] transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF7700]/50 shadow-inner">
            <Image src="/assets/logo.png" alt="DevPulse AI" width={32} height={32} priority className="h-7 w-7 object-contain transition-transform duration-300 group-hover:rotate-6"/>
            <div className="absolute -inset-1 -z-10 rounded-full bg-[#FF7700]/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[15px] font-black tracking-tight text-white">
              <span>DevPulse</span>
              <span className="bg-gradient-to-r from-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent font-black">AI</span>
            </div>
            <div className="hidden sm:block text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase">
              Code • Execute • Understand
            </div>
          </div>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.04] bg-white/[0.02] p-1.5 backdrop-blur-md md:flex">
          <Link href="#features" className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white/60 transition-all duration-200 hover:bg-white/[0.05] hover:text-white">
            <Layers size={13} className="text-white/40 transition-colors group-hover:text-[#FF7700]" />
            <span>Features</span>
          </Link>

          <Link href="#how-it-works" className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white/60 transition-all duration-200 hover:bg-white/[0.05] hover:text-white">
            <Cpu size={13} className="text-white/40 transition-colors group-hover:text-[#FFAA00]" />
            <span>How It Works</span>
          </Link>

          <Link href="#about" className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white/60 transition-all duration-200 hover:bg-white/[0.05] hover:text-white">
            <HelpCircle size={13} className="text-white/40 transition-colors group-hover:text-[#A78BFA]" />
            <span>About</span>
          </Link>
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          {loading ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]">
              <LoaderCircle size={16} className="animate-spin text-[#FF7700]"/>
            </div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" className="group flex h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-xs font-bold uppercase tracking-wider text-white/80 transition-all duration-200 hover:border-[#FF7700]/40 hover:bg-white/[0.06] hover:text-white">
                <LayoutDashboard size={14} className="text-[#FF7700] transition-transform duration-200 group-hover:scale-110" />
                <span>Dashboard</span>
              </Link>

              <Link href="/user" className="relative block transition-transform duration-200 hover:scale-105">
                <Avatar className="h-10 w-10 rounded-full border border-white/[0.12] bg-[#1C1E22] transition-colors hover:border-[#FF7700]/50">
                  <AvatarImage src={user?.avatar || "/defaultPic.svg"} alt={user?.username || "Profile"} className="rounded-full object-cover" />
                  <AvatarFallback className="rounded-full bg-gradient-to-br from-[#FF2200] via-[#FF7700] to-[#FFDD00] text-sm font-black text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-wider text-white/60 transition-colors duration-200 hover:text-white">
                <LogIn size={14} className="text-white/30 transition-colors group-hover:text-[#FFAA00]" />
                <span>Login</span>
              </Link>

              <Link href="/signup" className="group flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-5 text-xs font-black uppercase tracking-wider text-[#0E1013] shadow-[0_4px_20px_rgba(255,119,0,0.2)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_25px_rgba(255,119,0,0.35)]">
                <Sparkles size={13} strokeWidth={2.5} className="animate-pulse" />
                <span>Get Started</span>
                <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </>
          )}
        </div>

        <button 
          type="button" 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
          onClick={() => setIsMenuOpen((prev) => !prev)} 
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white transition-all duration-200 hover:border-[#FF7700]/40 hover:bg-white/[0.06] md:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="mx-auto mt-2.5 max-w-6xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0E1013]/95 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="p-3">
            <Link href="#features" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.04] hover:text-white">
              <div className="flex items-center gap-3">
                <Layers size={16} className="text-white/40 group-hover:text-[#FF7700]" />
                <span>Features</span>
              </div>
              <ChevronRight size={14} className="text-white/20 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.04] hover:text-white">
              <div className="flex items-center gap-3">
                <Cpu size={16} className="text-white/40 group-hover:text-[#FFAA00]" />
                <span>How It Works</span>
              </div>
              <ChevronRight size={14} className="text-white/20 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link href="#about" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.04] hover:text-white">
              <div className="flex items-center gap-3">
                <HelpCircle size={16} className="text-white/40 group-hover:text-[#A78BFA]" />
                <span>About</span>
              </div>
              <ChevronRight size={14} className="text-white/20 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mx-5 h-px bg-white/[0.06]" />

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-12">
                <LoaderCircle size={18} className="animate-spin text-[#FF7700]"/>
              </div>
            ) : isAuthenticated ? (
              <div className="flex flex-col gap-2.5">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-[#FF7700]/40 hover:bg-white/[0.06]">
                  <LayoutDashboard size={16} className="text-[#FF7700]"/>
                  <span>Go to Dashboard</span>
                </Link>

                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 text-sm font-bold text-white/80 transition-all hover:bg-white/[0.05]">
                  <Avatar className="h-6 w-6 rounded-full border border-white/[0.08] bg-[#1C1E22]">
                    <AvatarImage src={user?.avatar || "/defaultPic.svg"} alt={user?.username || "Profile"} className="rounded-full object-cover"/>
                    <AvatarFallback className="rounded-full bg-gradient-to-br from-[#FF2200] via-[#FF7700] to-[#FFDD00] text-[10px] font-black text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span>View Profile</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 text-sm font-bold uppercase tracking-wider text-white/80 transition-all hover:bg-white/[0.05] hover:text-white">
                  <LogIn size={16} className="text-white/40"/>
                  <span>Login</span>
                </Link>

                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-5 text-sm font-black uppercase tracking-wider text-[#0E1013]">
                  <Sparkles size={14} className="mr-1.5" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}