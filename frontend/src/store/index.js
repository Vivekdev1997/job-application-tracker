import { configureStore, createSlice } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";

const appSlice = createSlice({
  name: "app",
  initialState: {
    phase: "Phase 1",
  },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
