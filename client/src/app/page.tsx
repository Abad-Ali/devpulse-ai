"use client";
import Image from "next/image";
import { ArrowRight, Code2, LayoutDashboard, LoaderCircle, LogIn, UserPlus } from "lucide-react";
import MountainBackground from "./components/background/MountainBackground";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Features from "./components/home/Features";
import HowItWorks from "./components/home/HowItWorks";
import About from "./components/home/About";
import FinalCTA from "./components/home/FinalCTA";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2A2C32] text-white">
      <MountainBackground />

      <Navbar/>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-27">
        <div className="mx-auto w-full max-w-5xl text-center">

          <div className="mb-8 flex justify-center">
            <Image src="/assets/logo.png" alt="DevPulse AI" width={110} height={110} priority className="h-auto w-20 sm:w-24 md:w-28"/>
          </div>

          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF7700]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFAA00] sm:text-sm">
              Code. Execute. Understand.
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF7700]" />
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Build, Run &{" "}
            <span className="bg-gradient-to-r from-[#FF2200] via-[#FF7700] via-[#FFAA00] to-[#FFDD00] bg-clip-text text-transparent">
              Learn
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg md:text-xl">
            DevPulse AI is your intelligent coding workspace for writing, running, understanding, and improving your code — all in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {loading ? (
              <div className="flex h-12 items-center justify-center">
                <LoaderCircle size={22} className="animate-spin text-[#FFAA00]"/>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link href='/programs/new' className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-[#17191e] transition duration-200 hover:brightness-110 shadow-md shadow-[#FF7700]/10 sm:w-auto">
                  <Code2 size={16} strokeWidth={2.5} />
                  <span>Start Coding</span>
                  <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>              

                <Link href='/dashboard' className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-200 hover:border-[#FFAA00]/50 hover:bg-white/10 shadow-sm sm:w-auto">
                  <LayoutDashboard size={16} className="text-[#FFAA00] transition-transform duration-200 group-hover:scale-105"/>
                  <span>Go to Dashboard</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-[#17191e] transition duration-200 hover:brightness-110 shadow-md shadow-[#FF7700]/10 sm:w-auto">
                  <UserPlus size={16} strokeWidth={2.5} />
                  <span>Create Your Account</span>
                  <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>
              
                <Link href="/login" className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-200 hover:border-[#FFAA00]/50 hover:bg-white/10 shadow-sm sm:w-auto">
                  <LogIn size={16} className="text-[#FFAA00] transition-transform duration-200 group-hover:scale-105"/>
                  <span>Login Now</span>
                </Link>
              </>
            )}
          </div>

          <p className="mt-10 text-sm text-white/45">
            Your code. Your progress. Your pulse.
          </p>
        </div>
      </section>
      <Features/>
      <HowItWorks/>
      <About/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}