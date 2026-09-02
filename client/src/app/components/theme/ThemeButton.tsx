"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-[72px] rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 backdrop-blur-md" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="relative flex h-9 w-[72px] items-center justify-between rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/5 dark:bg-[#15171B]/5 p-1 backdrop-blur-md shadow-sm cursor-pointer select-none">
      <div className={`absolute top-1 bottom-1 h-7 w-7 rounded-full border border-black/[0.06] dark:border-white/[0.12] bg-white dark:bg-[#1E2025] shadow-xs transition-all duration-300 ease-out ${isDark ? "left-[39px] shadow-amber-500/10" : "left-1 shadow-indigo-500/10"}`} />

      <div className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${isDark ? "text-black/45 dark:text-white/70 opacity-80 group-hover:opacity-100" : "text-[#FF7700] opacity-100 scale-105 font-bold"}`}>
        <Sun size={14} strokeWidth={isDark ? 2 : 2.5} />
      </div>

      <div className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${isDark ? "text-[#A78BFA] opacity-100 scale-105 font-bold" : "text-black/70 dark:text-white/30 opacity-80 group-hover:opacity-100"}`}>
        <Moon size={14} strokeWidth={isDark ? 2.5 : 2} />
      </div>
    </button>
  );
};

export default ThemeButton;
