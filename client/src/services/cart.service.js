import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import BaseUrl from "../apis/axios";

export const addToCart = createAsyncThunk(
  "user/add/cart",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.post(`/cart/add/${id}`, data);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error);

      message.error(error.message);
    }
  }
);

export const getCart = createAsyncThunk("user/get/cart/:id", async () => {
  try {
    const response = await BaseUrl.get(`/cart/get_cart`);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const updateCart = createAsyncThunk("user/update/cart", async (data) => {
  try {
    const response = await BaseUrl.put(`/cart/update`, data);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const deleteCartItem = createAsyncThunk(
  "user/delete/cart/item",
  async (id) => {
    try {
      const response = await BaseUrl.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      message.error(error.message);
    }
  }
);
