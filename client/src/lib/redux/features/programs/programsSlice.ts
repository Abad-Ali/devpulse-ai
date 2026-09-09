import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getMyPrograms,
  type Program,
} from "@/lib/api/program.api";

interface ProgramsState {
  programs: Program[];
  selectedProgram: Program | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgramsState = {
  programs: [],
  selectedProgram: null,
  loading: false,
  error: null,
};

/**
 * Fetch all programs belonging to the authenticated user.
 */
export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    const response = await getMyPrograms();

    return response.data;
  }
);

const programsSlice = createSlice({
  name: "programs",
  initialState,

  reducers: {
    setPrograms: (
      state,
      action: PayloadAction<Program[]>
    ) => {
      state.programs = action.payload;
      state.loading = false;
      state.error = null;
    },

    setSelectedProgram: (
      state,
      action: PayloadAction<Program | null>
    ) => {
      state.selectedProgram = action.payload;
    },

    addProgram: (
      state,
      action: PayloadAction<Program>
    ) => {
      state.programs.unshift(action.payload);
    },

    updateProgram: (
      state,
      action: PayloadAction<Program>
    ) => {
      const index = state.programs.findIndex(
        (program) => program.id === action.payload.id
      );

      if (index !== -1) {
        state.programs[index] = action.payload;
      }

      if (
        state.selectedProgram?.id === action.payload.id
      ) {
        state.selectedProgram = action.payload;
      }
    },

    removeProgram: (
      state,
      action: PayloadAction<string>
    ) => {
      state.programs = state.programs.filter(
        (program) => program.id !== action.payload
      );

      if (
        state.selectedProgram?.id === action.payload
      ) {
        state.selectedProgram = null;
      }
    },

    clearPrograms: (state) => {
      state.programs = [];
      state.selectedProgram = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
        state.error = null;
      })

      .addCase(fetchPrograms.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load programs.";
      });
  },
});

export const {
  setPrograms,
  setSelectedProgram,
  addProgram,
  updateProgram,
  removeProgram,
  clearPrograms,
} = programsSlice.actions;

export default programsSlice.reducer;
