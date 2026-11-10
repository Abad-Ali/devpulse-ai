"use client";

import { Settings } from "lucide-react";

const SettingsHeader = () => {
  return (
    <header className="py-3">

      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-muted/60">
          <Settings className="size-7 text-foreground" strokeWidth={1.7}/>
        </div>

        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Settings
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your account, security, and connected services.
          </p>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;