"use client";
import { useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import DashboardActivityChart from "@/app/components/dashboard/DashboardActivityChart";
import DashboardGreeting from "@/app/components/dashboard/DashboardGreeting";
import DashboardQuickActions from "@/app/components/dashboard/DashboardQuickActions";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import RecentPrograms from "@/app/components/dashboard/RecentPrograms";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchDashboard } from "@/lib/redux/features/dashboard/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { data: dashboard, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
          <Loader2 size={16} className="animate-spin"/>
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-5">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle size={50} strokeWidth={1.5} className="text-red-500 dark:text-red-400"/>
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            <span className="font-semibold">
              Error:
            </span>{" "}
            {error || "Failed to load dashboard."}
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
      <DashboardGreeting/>
      <DashboardStats stats={dashboard.stats}/>
      <DashboardActivityChart activity={dashboard.activity}/>
      <DashboardQuickActions/>
      <RecentPrograms programs={dashboard.recentPrograms}/>
      <RecentActivity activities={dashboard.recentActivity}/>
    </main>
  );
};

export default DashboardPage;