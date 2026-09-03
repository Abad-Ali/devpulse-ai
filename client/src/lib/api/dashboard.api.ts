// import api from "./axios";

// export interface DashboardStats {
//   programs: number;
//   executions: number;
//   successfulExecutions: number;
//   successRate: number;
//   aiRequests: number;
// }

// export interface DashboardActivity {
//   date: string;
//   executions: number;
//   successful: number;
//   ai: number;
//   github: number;
// }

// export interface RecentProgram {
//   id: string;
//   title: string;
//   language: string;
//   visibility: "private" | "public";
//   updatedAt: string;
// }

// export interface RecentActivity {
//   id: string;
//   type: "execution" | "ai" | "github";
//   title: string;
//   language: string | null;
//   status?: string;
//   executionTime?: number;
//   createdAt: string;
// }

// export interface DashboardData {
//   stats: DashboardStats;
//   activity: DashboardActivity[];
//   recentPrograms: RecentProgram[];
//   recentActivity: RecentActivity[];
// }

// export interface DashboardResponse {
//   success: boolean;
//   data: DashboardData;
// }

// export const getDashboard = async (): Promise<DashboardResponse> => {
//   const res = await api.get<DashboardResponse>("/dashboard");

//   return res.data;
// };

import api from "./axios";

export interface DashboardStats {
  programs: number;
  executions: number;
  successfulExecutions: number;
  successRate: number;
  aiRequests: number;
}

export interface DashboardActivity {
  date: string;
  executions: number;
  successful: number;
  ai: number;
  github: number;
}

export interface RecentProgram {
  id: string;
  title: string;
  language: string;
  visibility: "private" | "public";
  updatedAt: string;
}

export interface RecentActivity {
  id: string;
  type: "execution" | "ai" | "github";
  title: string;
  language: string | null;
  status?: string;
  executionTime?: number;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  activity: DashboardActivity[];
  recentPrograms: RecentProgram[];
  recentActivity: RecentActivity[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  const res = await api.get<DashboardResponse>("/dashboard");

  return res.data;
};