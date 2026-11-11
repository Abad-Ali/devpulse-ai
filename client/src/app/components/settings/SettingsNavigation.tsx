"use client";
import { CircleUserRound, Wallet, ChevronRight, GitBranchPlus, ShieldCheck, ShieldCogCorner } from "lucide-react";
import type { SettingsSection } from "../page";

interface SettingsNavigationProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const navigation = [
  {
    id: "account" as const,
    label: "Account",
    description: "Manage your profile and password",
    icon: CircleUserRound,
  },
  {
    id: "github" as const,
    label: "GitHub",
    description: "Manage your connected account",
    icon: GitBranchPlus,
  },
  {
    id: "usage" as const,
    label: "Usage & Limits",
    description: "Monitor your usage statistics",
    icon: Wallet,
  }
];

const SettingsNavigation = ({ activeSection, onSectionChange }: SettingsNavigationProps) => {
  return (
    <aside className="w-full space-y-5 sm:border-r sm:pr-3">
      <div className="px-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Settings
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Manage your preferences
        </p>
      </div>

      <nav className="space-y-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} aria-current={isActive ? "page" : undefined} className={`group relative flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "border-white bg-white text-gray-900 shadow-md shadow-black/5" : "border-white/10 bg-white/[0.04] backdrop-blur-md hover:border-white/20 hover:bg-white/[0.08]"}`}>
              {isActive && (
                <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-gray-900"/>
              )}

              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${isActive ? "border-gray-200 bg-gray-50 text-gray-900" : "border-white/10 bg-white/[0.06] text-muted-foreground group-hover:bg-white/10 group-hover:text-foreground"}`}>
                <Icon className="size-[18px]" strokeWidth={1.8}/>
              </div>

              <div className="min-w-0 flex-1">
                <p className={`text-[13px] font-semibold transition-colors ${isActive ? "text-gray-900" : "text-foreground/75 group-hover:text-foreground"}`}>
                  {item.label}
                </p>

                <p className={`mt-1 truncate text-[11px] leading-relaxed ${isActive ? "text-gray-500" : "text-muted-foreground"}`}>
                  {item.description}
                </p>
              </div>

              <ChevronRight className={`size-4 shrink-0 transition-all duration-200 ${isActive ? "translate-x-0 text-gray-900" : "-translate-x-1 text-muted-foreground/40 opacity-0 group-hover:translate-x-0 group-hover:text-muted-foreground group-hover:opacity-100"}`}/>
            </button>
          );
        })}
      </nav>

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted">
            <ShieldCheck className="size-4 text-emerald-700 dark:text-emerald-500" strokeWidth={1.8}/>
          </div>

          <p className="text-xs font-semibold text-foreground">
            Account security
          </p>
        </div>

        <p className="mt-3 text-xs leading-[1.7] text-muted-foreground">
          Keep your profile information updated and use a strong password to keep your account secure.
        </p>

        <div className="mt-3 flex items-center gap-2 border-t border-border/70 pt-3">
          <ShieldCogCorner size={14} className="text-emerald-700 dark:text-emerald-500"/>
          <span className="text-[10px] font-medium text-muted-foreground">
            Security matters
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SettingsNavigation;
