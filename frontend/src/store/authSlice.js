import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from "../services/authService";

const token = localStorage.getItem("jobTrackerToken");
const storedUser = localStorage.getItem("jobTrackerUser");

const parseStoredUser = () => {
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("jobTrackerUser");
    return null;
  }
};

const persistAuth = ({ token: authToken, user }) => {
  localStorage.setItem("jobTrackerToken", authToken);
  localStorage.setItem("jobTrackerUser", JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem("jobTrackerToken");
  localStorage.removeItem("jobTrackerUser");
};

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  (error.code === "ERR_NETWORK"
    ? "API server is not reachable. Please start the backend on port 5000."
    : error.message) ||
  "Something went wrong";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await registerUser(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginUser(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await requestPasswordReset(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const resetUserPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await resetPassword(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const initialState = {
  user: parseStoredUser(),
  token,
  isAuthenticated: Boolean(token),
  status: "idle",
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearAuth();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
    clearAuthFeedback(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        persistAuth(action.payload);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        persistAuth(action.payload);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        persistAuth(action.payload);
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAuthFeedback, logout } = authSlice.actions;
export default authSlice.reducer;
