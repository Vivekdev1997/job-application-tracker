import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDashboardStats } from "../services/dashboardService";

const initialState = {
  stats: {
    cards: {
      totalApplications: 0,
      interviews: 0,
      offers: 0,
      rejected: 0,
    },
    monthlyApplications: [],
    statusDistribution: [],
  },
  status: "idle",
  error: null,
};

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  (error.code === "ERR_NETWORK"
    ? "API server is not reachable. Please start the backend on port 5000."
    : error.message) ||
  "Something went wrong";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboardStats();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

