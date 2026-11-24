import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import programsReducer from "./features/programs/programsSlice";
import githubRepositoriesReducer from "./features/github/githubRepositoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    programs: programsReducer,
    githubRepositories: githubRepositoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;