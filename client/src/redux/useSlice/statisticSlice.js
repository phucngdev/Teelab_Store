import { createSlice } from "@reduxjs/toolkit";
import { dashboard } from "../../services/statistics.service";

const statisticSlice = createSlice({
  name: "statistics",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(dashboard.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(dashboard.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(dashboard.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default statisticSlice.reducer;
