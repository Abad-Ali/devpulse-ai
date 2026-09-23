"use client";
import React, { useEffect, useRef, useState } from "react";
import { Code2, Command, Search, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SearchContent from "./SearchContent";

const SearchHeader = () => {
  const [searchType, setSearchType] = useState("username");
  const [searchValue, setSearchValue] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
  
    window.addEventListener("keydown", handleSearchShortcut);
  
    return () => {
      window.removeEventListener("keydown", handleSearchShortcut);
    };
  }, []);
  return (
    <>
      <header className="w-full text-black dark:text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-7 lg:px-10">
          <div className="flex flex-col items-center justify-center gap-8 text-center lg:gap-10">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-black/85 sm:text-4xl lg:text-5xl dark:text-white/85">
                Search DevPulse AI
              </h1>
  
              <p className="max-w-xl text-sm leading-7 text-black/45 dark:text-white/35">
                Find developers and programs across the DevPulse AI workspace.
              </p>
            </div>
  
            <div className="group relative w-full max-w-2xl overflow-hidden rounded-[24px] border border-black/20 bg-white/5 p-2 text-left backdrop-blur-sm transition-all duration-200 hover:border-black/35 hover:bg-white/10 dark:border-white/[0.08] dark:bg-[#15171B]/5 dark:hover:border-white/[0.15] dark:hover:bg-[#15171B]/15">
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-black/[0.04] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 dark:bg-white/[0.05]" />
  
              <div className="relative flex flex-col sm:flex-row sm:h-12 w-full items-center gap-1.5 sm:gap-2">
                <div className="flex h-12 w-full items-center gap-2">
                     <div className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.06] text-black/55 transition-all duration-200 group-hover:scale-105  dark:bg-white/[0.05] dark:text-white/45 dark:group-hover:bg-[#181A1F]">
                       <Search className="h-4 w-4" strokeWidth={1.8}/>
                     </div>
    
                     <Input ref={searchInputRef} value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="search" placeholder="Search username or program..." className="h-10 flex-1 rounded-xl border-0 bg-transparent px-3.5 text-sm text-black shadow-none outline-none placeholder:text-black/55 focus-visible:ring-0 dark:text-white dark:placeholder:text-white/25 border border-black/20 dark:border-white/[0.08] dark:hover:border-white/[0.15]"/>
    
                     <div className="mr-1.5 hidden items-center gap-0.5 rounded-lg border border-black/15 bg-black/[0.04] px-2 py-1.5 font-mono text-[9px] text-black/55 sm:flex dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-white/25">
                       <Command className="h-3 w-3" />
                       <span>K</span>
                     </div>
                </div>
  
                <div className="mx-1.5 h-4 w-px bg-black/20 dark:bg-white/[0.06] hidden sm:inline"/>
  
                <Select value={searchType} onValueChange={(value) => { if (value) {setSearchType(value)}}}>
                  <SelectTrigger className="h-10 w-full sm:w-[135px] cursor-pointer rounded-xl border-0 bg-transparent px-3 text-left font-mono text-[10px] uppercase tracking-wider text-black/75 shadow-none transition-colors duration-200 hover:bg-black/[0.04] focus:ring-0 focus:ring-offset-0 dark:text-white/55 dark:hover:bg-white/[0.02] border border-black/20 dark:border-white/[0.08] dark:hover:border-white/[0.15]">
                    <SelectValue />
                  </SelectTrigger>
  
                  <SelectContent className="border-black/15 bg-white/5 backdrop-blur-md dark:border-white/[0.08] dark:bg-[#15171B]/5">
                    <SelectItem value="username" className="cursor-pointer rounded-lg focus:bg-black/[0.04] dark:focus:bg-white/[0.05]">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
                        <UserRound className="h-3.5 w-3.5 text-black/55 dark:text-white/40" />
                        <span>Username</span>
                      </div>
                    </SelectItem>
  
                    <SelectItem value="program" className="cursor-pointer rounded-lg focus:bg-black/[0.04] dark:focus:bg-white/[0.05]">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
                        <Code2 className="h-3.5 w-3.5 text-black/55 dark:text-white/40" />
                        <span>Program</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchContent searchType={searchType} searchValue={searchValue}/>
    </>
  );
};

export default SearchHeader;
