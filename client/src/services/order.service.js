import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";
import { message } from "antd";

export const createOrder = createAsyncThunk("create/order", async (data) => {
  try {
    const response = await BaseUrl.post(`order/create`, data);
    return response;
  } catch (error) {
    message.error("Lỗi server");
  }
});

export const getOneOrder = createAsyncThunk(
  "getOne/order/admin",
  async (id) => {
    try {
      const response = await BaseUrl.get(`order/admin/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const getAllOrder = createAsyncThunk(
  "getAll/order/admin",
  async ({ page, limit, status }) => {
    try {
      const response = await BaseUrl.get(
        `order/admin?page=${page}&limit=${limit}&status=${status}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllOrderByUser = createAsyncThunk(
  "getAll/order/user/:id",
  async (id) => {
    try {
      const response = await BaseUrl.get(`order/user/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateStatus = createAsyncThunk(
  "update/order",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.put(`order/${id}`, data);
      return response;
    } catch (error) {
      message.error("Lỗi server");
    }
  }
);

export const createZalopay = createAsyncThunk(
  "create/order/zalopay",
  async (data) => {
    try {
      const response = await BaseUrl.post(`order/create/zalopay`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const checkPaymentZalopay = createAsyncThunk(
  "zalopay/check",
  async (app_trans_id) => {
    try {
      const response = await BaseUrl.get(
        `order/zalopay/check-status/${app_trans_id}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateStatusOrder = createAsyncThunk(
  "put/order/status/:id",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.put(`order/admin/status/${id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
