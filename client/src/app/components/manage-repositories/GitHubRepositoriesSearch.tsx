"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Lock, Globe2, ArrowUpRight, X, FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";

const GitHubRepositoriesSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const repositories = useAppSelector((state) => state.githubRepositories.repositories);
  const router = useRouter();

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) return [];

    return repositories.filter((repository) => {
      return (
        repository.repositoryName.toLowerCase().includes(searchTerm) || repository.fullName.toLowerCase().includes(searchTerm) || (repository.description || "") .toLowerCase() .includes(searchTerm) || repository.visibility.toLowerCase().includes(searchTerm)
      );
    });
  }, [query, repositories]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setQuery("");
    }
  };

  const handleRepositoryClick = (repositoryId: string) => {
    router.push(`/github/manage/repositories/${repositoryId}`);

    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button type="button" variant="outline" className="group h-9 w-full cursor-pointer rounded-2xl border-black/10 bg-white px-3 text-xs font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/[0.06]">
          <Search size={15} strokeWidth={1.8} className="shrink-0 transition-transform duration-300 group-hover:scale-110"/>
          <span className="truncate">Search Repositories</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] gap-0 overflow-hidden rounded-2xl border border-black/[0.08] bg-white/5 p-0 shadow-2xl backdrop-blur-lg dark:border-white/[0.08] dark:bg-black/20 sm:max-w-xl">
        <DialogHeader className="border-b border-black/[0.06] px-6 pb-5 pt-6 dark:border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white/10 dark:border-white/[0.08] dark:bg-black/20">
              <Image src="/assets/github.svg" alt="GitHub" width={20} height={20} className="dark:invert-0 invert"/>
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                Search Repositories
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {!query.trim() ? `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"} available in your workspace` : `${results.length} ${results.length === 1 ? "repository" : "repositories"} found`}
              </DialogDescription>
            </div>
          </div>
          <div className="relative mt-5">
            <Search size={15} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"/>
            <Input autoFocus type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repositories by name, owner, or description..." className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 pl-10 pr-24 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus-visible:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-900/40 dark:placeholder:text-neutral-500 dark:focus-visible:border-neutral-600 dark:focus-visible:ring-neutral-800/60"/>

            {query.trim() && (
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                <button type="button" onClick={() => setQuery("")} className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100" aria-label="Clear repository search">
                  <X size={13} strokeWidth={1.8} />
                  Clear
                </button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[420px] overflow-y-auto px-6 py-5">
          {!query.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-black/[0.06] bg-white/20 dark:border-white/[0.06] dark:bg-black/20">
                <FolderSearch size={22} strokeWidth={1.7} className="text-neutral-400 dark:text-neutral-500"/>
              </div>

              <p className="mt-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Find a repository
              </p>

              <p className="mt-1.5 max-w-xs text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                Search by repository name, owner, description, or visibility.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {results.map((repository) => (
                <button key={repository._id} type="button" onClick={() => handleRepositoryClick(repository.repositoryId)} className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white/20 p-3 text-left backdrop-blur-sm transition-colors duration-200 hover:bg-black/[0.025] dark:border-white/[0.06] dark:bg-black/20 dark:hover:bg-white/[0.035]">
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.05] bg-white/10 dark:border-white/[0.06] dark:bg-black/20">
                      <Image src="/repo.svg" alt="Repository" width={27} height={27} className="dark:invert"/>
                    </div>

                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-black/[0.025] dark:bg-white/[0.04]">
                      {repository.visibility === "public" ? (
                        <Globe2 size={13} strokeWidth={1.8} className="text-neutral-500 dark:text-neutral-400"/>
                      ) : (
                        <Lock size={13} strokeWidth={1.8} className="text-neutral-500 dark:text-neutral-400"/>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 w-full min-w-0">
                    <p className="truncate text-xs font-semibold text-neutral-800 dark:text-neutral-100">
                      {repository.repositoryName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-neutral-400 dark:text-neutral-500">
                      {repository.fullName}
                    </p>

                    <p className="mt-2 line-clamp-2 min-h-8 text-[10px] leading-4 text-neutral-500 dark:text-neutral-400">
                      {repository.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-3 flex w-full items-center justify-between border-t border-black/[0.06] pt-2 dark:border-white/[0.06]">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {repository.visibility}
                    </span>

                    <ArrowUpRight size={13} strokeWidth={1.8} className="text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-neutral-500"/>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-black/[0.06] bg-white/20 dark:border-white/[0.06] dark:bg-black/20">
                <Search size={21} strokeWidth={1.7} className="text-neutral-400 dark:text-neutral-500"/>
              </div>

              <p className="mt-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Repository not found
              </p>

              <p className="mt-1.5 max-w-xs text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                No matching repository exists in your Redux store. Try another search term.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-black/[0.06] bg-white/5 px-6 py-3 backdrop-blur-sm dark:border-white/[0.06] dark:bg-black/20">
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
            Search is performed across repositories already loaded in Redux.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubRepositoriesSearch;