import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../../services/category.service";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
