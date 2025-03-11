
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/interceptor/axiosInstance";


export const fetchPublishers = createAsyncThunk(
    "publisher/fetchPublishers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/publisher");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.statusText || "Failed to fetch publishers");
        }
    }
);

export const deletePublisher = createAsyncThunk(
    "publisher/deletePublisher",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/publisher/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete publisher");
        }
    }
);

export const addPublisher = createAsyncThunk(
    "publisher/addPublisher",
    async (data: { name: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/publisher", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to add publisher");
        }
    }
);

export const getPublisherById = createAsyncThunk(
    "publisher/getPublisherId",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/publisher/${id}`);
            return response.data;
        } catch (error: any) {
            console.log("masuk error", error);

            return rejectWithValue(error.response?.statusText || "Failed to fetch publisher");
        }
    }
);
