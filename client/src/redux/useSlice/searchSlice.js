import { createSlice } from "@reduxjs/toolkit";
import { searchGlobal } from "../../services/search.service";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGlobal.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(searchGlobal.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(searchGlobal.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
