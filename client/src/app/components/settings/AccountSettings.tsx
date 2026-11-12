"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, KeyRound, Mail, UserRoundPen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountSettings = () => {
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Account Settings
          </h2>
          <span className="rounded-full border border-border/70 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Personal
          </span>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your personal information and account security.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-sm backdrop-blur-xl">

        <div className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 transition-colors group-hover:bg-muted">
            <UserRoundPen className="size-[19px] text-foreground" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Update Profile
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Manage your name, username, and personal information.
            </p>
          </div>

          <Button type="button" variant="outline" size="sm" className="h-9 cursor-pointer rounded-lg border-border/70 bg-background/60 px-3 text-xs font-medium shadow-none transition-all hover:bg-muted sm:self-center">
            Edit Profile
            <ArrowRight className="ml-2 size-3.5"/>
          </Button>
        </div>

        <div className="mx-5 border-t border-border/60"/>

        <div className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 transition-colors group-hover:bg-muted">
            <KeyRound className="size-[19px] text-foreground" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Change Password
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Update your password to keep your account secure.
            </p>
          </div>

          <Button type="button" variant="outline" size="sm" className="h-9 cursor-pointer rounded-lg border-border/70 bg-background/60 px-3 text-xs font-medium shadow-none transition-all hover:bg-muted sm:self-center">
            Change Password
            <ArrowRight className="ml-2 size-3.5"/>
          </Button>
        </div>

        <div className="mx-5 border-t border-border/60"/>

        <div className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 transition-colors group-hover:bg-muted">
            <Mail className="size-[19px] text-foreground" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Forgot Password?
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Receive a password reset link directly in your email.
            </p>
          </div>

          <Button size="sm" className="h-9 cursor-pointer rounded-lg px-3 text-xs font-medium shadow-sm transition-all sm:self-center">
            <Link href="/forgot-password" className="flex">
              Reset Password
              <ArrowUpRight className="ml-2 size-3.5"/>
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/30 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/20">
            <ShieldCheck className="size-[17px] text-emerald-700 dark:text-emerald-500" strokeWidth={1.8}/>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-foreground">
              Your account security matters
            </h3>

            <p className="mt-1.5 text-xs leading-[1.8] text-muted-foreground">
              Your credentials are private and protected. DevPulse AI will never display your existing password. Keep your password updated and avoid sharing your login details.
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                Your privacy is important to us
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
