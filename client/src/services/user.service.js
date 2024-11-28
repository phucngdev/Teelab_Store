import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";

export const getInfoUser = createAsyncThunk("get/users/info", async () => {
  try {
    const response = await BaseUrl.get(`user/info`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getAllUsers = createAsyncThunk("get/users", async () => {
  try {
    const response = await BaseUrl.get("user/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const updateStatusUser = createAsyncThunk(
  "update/user",
  async ({ id, status }) => {
    try {
      console.log(status);

      const response = await BaseUrl.put(`user/${id}/status/${status}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteUser = createAsyncThunk("delete/user", async (id) => {
  try {
    const response = await BaseUrl.delete(`user/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
});
