import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../../services/cart.service";
import { login } from "../../services/auth.service";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getCart.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});
export default cartSlice.reducer;
