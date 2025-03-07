import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteBook, fetchBooks } from "../actions/bookAction";
import { BookType } from "@/page/book/types";


interface BookState {
    books: BookType[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        resetBook: (state) => {
            state.books = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{
            data: BookType[];
        }>) => {
            state.loading = false;
            state.books = action.payload.data;

        });
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string;
        });

        builder.addCase(deleteBook.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(deleteBook.fulfilled, (state) => {
            state.loading = false;

        });

        builder.addCase(deleteBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string
        });
    }
})

export const { resetBook } = bookSlice.actions;

export default bookSlice.reducer;
