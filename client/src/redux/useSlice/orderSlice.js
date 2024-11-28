import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrder,
  getAllOrderByUser,
  getOneOrder,
} from "../../services/order.service";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    dataEdit: {
      status: null,
      order: {},
      order_items: [],
    },
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneOrder.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAllOrderByUser.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllOrderByUser.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllOrderByUser.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
