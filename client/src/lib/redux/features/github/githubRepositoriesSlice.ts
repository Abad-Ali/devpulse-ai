import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GitHubRepository {
  _id: string;
  repositoryId: string;
  repositoryName: string;
  fullName: string;
  description: string;
  visibility: "public" | "private";
}

interface GitHubRepositoriesState {
  repositories: GitHubRepository[];
  selectedRepository: GitHubRepository | null;
}

const initialState: GitHubRepositoriesState = {
  repositories: [],
  selectedRepository: null,
};

const githubRepositoriesSlice = createSlice({
  name: "githubRepositories",
  initialState,
  reducers: {
    setRepositories: (state, action: PayloadAction<GitHubRepository[]>) => {
      state.repositories = action.payload;
    },

    setSelectedRepository: (state, action: PayloadAction<GitHubRepository | null>) => {
      state.selectedRepository = action.payload;
    },

    updateRepository: (state, action: PayloadAction<GitHubRepository>) => {
      const index = state.repositories.findIndex(
        (repository) => repository._id === action.payload._id
      );

      if (index !== -1) {
        state.repositories[index] = action.payload;
      }
    },

    removeRepository: (state, action: PayloadAction<string>) => {
      state.repositories = state.repositories.filter(
        (repository) => repository._id !== action.payload
      );

      if (state.selectedRepository?._id === action.payload) {
        state.selectedRepository = null;
      }
    },

    clearRepositories: (state) => {
      state.repositories = [];
      state.selectedRepository = null;
    },

    clearSelectedRepository: (state) => {
      state.selectedRepository = null;
    },
  },
});

export const { setRepositories, setSelectedRepository, updateRepository, removeRepository, clearRepositories, clearSelectedRepository } = githubRepositoriesSlice.actions;

export default githubRepositoriesSlice.reducer;