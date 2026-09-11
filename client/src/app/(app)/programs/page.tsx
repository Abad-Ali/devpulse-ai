"use client";

import { useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import ProgramsCards from "@/app/components/programs/ProgramsCards";
import ProgramsIntro from "@/app/components/programs/ProgramsIntro";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPrograms } from "@/lib/redux/features/programs/programsSlice";

const ProgramsPage = () => {
  const dispatch = useAppDispatch();

  const {
    programs,
    loading,
    error,
  } = useAppSelector(
    (state) => state.programs
  );

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
          <Loader2
            size={16}
            className="animate-spin"
          />

          Loading programs...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle
            size={50}
            strokeWidth={1.5}
            className="text-red-500 dark:text-red-400"
          />

          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            <span className="font-semibold">
              Error:
            </span>{" "}
            {error}
          </p>

          <p className="text-xs text-black/40 dark:text-white/40">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-5">
      <ProgramsIntro programs={programs}/>
      <ProgramsCards programs={programs}/>
    </main>
  );
};

export default ProgramsPage;