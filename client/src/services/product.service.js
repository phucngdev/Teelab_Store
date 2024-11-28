import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";
import { message } from "antd";

export const getOneProduct = createAsyncThunk(
  "getOne/product/:id",
  async (id) => {
    try {
      const response = await BaseUrl.get(`product/detail/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const getOneProductForUpdate = createAsyncThunk(
  "getOne/product/update",
  async (id) => {
    try {
      const response = await BaseUrl.get(`product/detail/admin/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "getAll/product",
  async ({ page, limit }) => {
    try {
      const response = await BaseUrl.get(`product?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "put/product",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.put(`product/update/${id}`, data);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "search/product/query",
  async (q) => {
    try {
      const response = await BaseUrl.get(`product/search?q=${q}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete/product/:id",
  async (id) => {
    try {
      const response = await BaseUrl.delete(`product/delete/product/${id}`);
      return response;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const createProduct = createAsyncThunk(
  "create/product",
  async (data) => {
    try {
      const response = await BaseUrl.post(`product/create`, data);
      return response;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const updateActiveProduct = createAsyncThunk(
  "update/status/product/:id",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.put(`product/update-status/${id}`, data);
      return response;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const getOneProductImport = createAsyncThunk(
  "getOne/product/import/:id",
  async (id) => {
    try {
      const response = await BaseUrl.get(`product/product-import/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const importQuantityProduct = createAsyncThunk(
  "post/product/import/:id",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.post(`product/product-import/${id}`, data);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const addNewSize = createAsyncThunk(
  "post/product/new-size/:id",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.post(`product/new-size/${id}`, data);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const deleteSize = createAsyncThunk(
  "delete/product/size/:id",
  async (id) => {
    try {
      const response = await BaseUrl.delete(`product/delete/size/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);
