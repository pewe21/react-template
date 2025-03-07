
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/interceptor/axiosInstance";


export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/book");
            return response.data;
        } catch (error: any) {
            console.log("masuk error", error);

            return rejectWithValue(error.response?.statusText || "Failed to fetch books");
        }
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/book/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete book");
        }
    }
);

export const addBook = createAsyncThunk(
    "books/addBook",
    async (data: { code: string, title: string, desc: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/book", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to add book");
        }
    }
);