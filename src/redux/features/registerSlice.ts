import { axiosInstance } from "@/_axios/instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface registerState {
	loading: boolean;
    userInfo: any;
    userToken: any;
	error: any;
    success: boolean;
	// data: [];
}

const initialState: registerState = {
	loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
};

interface RegisterData {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
  }

export const registerUser = createAsyncThunk(
    'register',
    async (data: RegisterData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("auth/register", data);
        return response.data;
      } catch (error: any) {
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
          } else {
            return rejectWithValue(error.message)
          }
        }
    }
  );

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
    
	},
	extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;

      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload
    });
  },
});

export const { } =
	registerSlice.actions;

export default registerSlice.reducer;
