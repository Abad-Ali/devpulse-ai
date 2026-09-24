"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, IdCard, LogOut, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { signout } from "@/lib/api/auth.api";
import axios from "axios";
import { toast } from "sonner";
import { clearUser } from "@/lib/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const SignOutPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await signout();
  
      if (response.success) {
        dispatch(clearUser());
        toast.success("Signed out successfully.");
        router.replace('/login')  
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed to sign out.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="flex sm:min-h-screen w-full flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-4 py-10 sm:py-0 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Sign out
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your current DevPulse AI session.
          </p>
        </motion.div>

        <Separator className="my-8" />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }} className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-1 items-center gap-6 sm:gap-8">
            <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="group relative shrink-0 cursor-pointer">

              <Avatar className="relative h-28 w-28 border-4 border-background shadow-lg transition-all duration-300 group-hover:shadow-xl sm:h-36 sm:w-36">
                <AvatarImage src={user?.avatar || "/defaultPic.svg"} alt={user?.name} className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                <AvatarFallback className="rounded-full bg-transparent">
                  <img src="/defaultPic.svg" alt="Default profile" className="h-full w-full rounded-full object-cover"/>
                </AvatarFallback>
              </Avatar>

              {user?.isEmailVerified && (
                <motion.div whileHover={{ scale: 1.12 }} className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>

            <div className="min-w-0">
              <h2 className="truncate text-2xl font-semibold tracking-tight transition-colors sm:text-3xl">
                {user?.name || "DevPulse User"}
              </h2>
              <p className="mt-1 text-sm font-medium text-muted-foreground transition-colors">
                @{user?.username || "username"}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground/70">
                {user?.email || "email@example.com"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {user?.isEmailVerified && (
                  <Badge variant="secondary" className="cursor-default gap-1.5 rounded-full px-3 py-1 text-xs transition-colors hover:bg-emerald-500/10">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    Verified
                  </Badge>
                )}

                {user?.isActive && (
                  <Badge variant="outline" className="cursor-default rounded-full px-3 py-1 text-xs transition-colors hover:bg-muted">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border/50 bg-muted/25 px-4 py-3 max-w-sm h-[76px]">
              <IdCard className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col h-full min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground tracking-wide shrink-0">
                  Profile Bio
                </p>
                <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground overflow-y-auto pr-1 scrollbar-thin flex-1 min-h-0">
                  {user?.bio || "No professional biography summary provided yet."}
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="hidden h-44 w-px bg-border lg:block" />

          <div className="flex flex-1 flex-col lg:max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <LogOut className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                Sign out of DevPulse AI
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              You&apos;re about to sign out of your account. Your programs, projects, and development data will remain safely stored.
            </p>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border/50 bg-muted/25 px-4 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">
                  Your workspace is safe
                </p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                  Signing out will not delete your account or programs.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={handleCancel} className="h-10 rounded-lg sm:flex-1 cursor-pointer transition-colors">
                Stay signed in
              </Button>

              <Button onClick={handleSignOut} className="h-10 rounded-lg text-white shadow-sm shadow-orange-500/20 bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] hover:opacity-90 sm:flex-1 cursor-pointer border-0 transition-opacity">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.35, duration: 0.3}} className="mt-12">
          <Separator />
          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            You can sign back in anytime to continue building with
            DevPulse AI.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignOutPage;
