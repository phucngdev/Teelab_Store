import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";
import { message } from "antd";

export const getAllCategory = createAsyncThunk(
  "user/get-all/category",
  async () => {
    try {
      const response = await BaseUrl.get(`category`);
      return response.data;
    } catch (error) {
      message.error("Không thể tải danh sách danh mục");
    }
  }
);

export const createCategory = createAsyncThunk(
  "admin/create/category",
  async (data) => {
    try {
      const response = await BaseUrl.post(`category/create`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  "admin/update/category",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.put(`category/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "delete/category",
  async (id) => {
    try {
      console.log(id);

      const response = await BaseUrl.delete(`category/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
