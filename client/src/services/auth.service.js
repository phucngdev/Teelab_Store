import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../apis/axios";
import { message } from "antd";
import Cookies from "js-cookie";

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await BaseUrl.post(`auth/login`, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const loginGoogle = createAsyncThunk("loginGoogle", async (data) => {
  try {
    console.log(data);
    const response = await BaseUrl.post(`auth/login/google`, data);
    return response;
  } catch (error) {
    message.error("Lỗi đăng nhập");
  }
});

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await BaseUrl.post(`auth/register`, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const registerGoogle = createAsyncThunk(
  "register/google",
  async (data) => {
    try {
      const response = await BaseUrl.post(`auth/register/google`, data);
      return response;
    } catch (error) {
      message.error("Lỗi đăng ký");
    }
  }
);

export const checkRoleAdmin = createAsyncThunk(
  "auth/checkRoleAdmin",
  async () => {
    try {
      const response = await BaseUrl.post(`auth/check-role`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await BaseUrl.post(`auth/logout`);
    Cookies.set("isLogin", false);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const refreshToken = createAsyncThunk("refreshToken", async () => {
  try {
    const response = await BaseUrl.post(`auth/refreshToken`);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});
