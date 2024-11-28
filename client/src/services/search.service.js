import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";

export const searchGlobal = createAsyncThunk("search/global", async (query) => {
  try {
    const response = await BaseUrl.get(`search/global?query=${query}`);
    return response.data;
  } catch (error) {
    return error;
  }
});
