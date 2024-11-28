import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";
import { message } from "antd";

export const getAllUserChat = createAsyncThunk(
  "admin/get-all/user-chat",
  async () => {
    try {
      const response = await BaseUrl.get(`message`);
      return response.data;
    } catch (error) {
      message.error("Không thể tải danh sách thành viên chat");
    }
  }
);

export const getMessageUserChat = createAsyncThunk(
  "admin/get-message/:id/user-chat",
  async ({ id, created_at }) => {
    try {
      const response = await BaseUrl.get(`message/${id}/${created_at}`);
      return response.data;
    } catch (error) {
      message.error("Không thể tải tin nhắn thành viên chat");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "send-message/:rooom_id",
  async ({ id, data }) => {
    try {
      const response = await BaseUrl.post(`message/${id}`, data);
      return response.data;
    } catch (error) {
      message.error("Không thể tải tin nhắn thành viên chat");
    }
  }
);
