import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/interceptor/axiosInstance";
import { RootState } from "../store";

export const loginAction = createAsyncThunk(
    "auth/login",
    async (data: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to login");
        }
    }
);

export const checkuserdata = createAsyncThunk(
    "auth/checkuserdata",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.token;
            const response = await api.get("/auth/userdata", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to check user data");
        }
    });