import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "@/api/client";

const baseUrl = `${baseURL}`;

// Define the async thunk with a userId parameter
const getUserProfileInfo = createAsyncThunk(
  "/users/getUserProfileInfo",
  async (userId, thunkApi) => {
    const res = await axios.get(`${baseUrl}/users/${userId}`);
    return res.data;
  },
);

const userProfileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileInfo.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getUserProfileInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(getUserProfileInfo.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export const selectCurrentUserProfile = (state) => state.userProfile.data;

export default userProfileSlice.reducer;
export { getUserProfileInfo };
