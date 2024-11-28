import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getInfoUser } from "../../services/user.service";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    infoUser: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getInfoUser.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.infoUser = action.payload;
      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
