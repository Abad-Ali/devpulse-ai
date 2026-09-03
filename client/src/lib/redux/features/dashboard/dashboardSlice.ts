// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getDashboard } from "@/lib/api/dashboard.api";

// // TYPES
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
//   type: string;
//   title: string;
//   language: string | null;
//   status: string;
//   executionTime: number;
//   createdAt: string;
// }

// export interface DashboardData {
//   stats: DashboardStats;
//   activity: DashboardActivity[];
//   recentPrograms: RecentProgram[];
//   recentActivity: RecentActivity[];
// }

// // STATE
// interface DashboardState {
//   data: DashboardData | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: DashboardState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// // ASYNC THUNK
// export const fetchDashboard = createAsyncThunk(
//   "dashboard/fetchDashboard",
//   async () => {
//     const response = await getDashboard();
//     return response.data;
//   }
// );

// // SLICE
// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,

//   reducers: {
//     clearDashboard: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchDashboard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         state.error = null;
//       })

//       .addCase(fetchDashboard.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to load dashboard.";
//       });
//   },
// });

// export const { clearDashboard } = dashboardSlice.actions;

// export default dashboardSlice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDashboard,
  type DashboardData,
} from "@/lib/api/dashboard.api";

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    const response = await getDashboard();

    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setDashboard: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    clearDashboard: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load dashboard.";
      });
  },
});

export const {
  setDashboard,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;