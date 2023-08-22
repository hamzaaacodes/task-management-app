import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  userId:  null,
  userFullName: "",
  token:  {},
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Sign Up
export const signUp = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/signup", user);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Log In
export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", credentials);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeLocalStorage: () => {
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
    // Log In
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userFullName = action.payload.name;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.isLoggedIn = action.payload.success;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset,removeLocalStorage } = usersSlice.actions;

export default usersSlice.reducer;
