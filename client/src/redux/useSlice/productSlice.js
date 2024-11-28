import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProduct,
  getOneProduct,
  getOneProductForUpdate,
  getOneProductImport,
  searchProduct,
} from "../../services/product.service";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    dataEdit: null,
    dataSearch: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneProduct.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneProductForUpdate.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneProductForUpdate.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(getOneProductForUpdate.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAllProduct.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(searchProduct.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataSearch = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneProductImport.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneProductImport.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(getOneProductImport.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
