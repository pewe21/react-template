import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteBook, fetchBooks } from "../actions/bookAction";
import { BookType } from "@/page/book/types";


interface BookState {
    books: BookType[];
    book: BookType | null;
    isOpenModal: boolean;
    isDeleteOpenModal: boolean;
    modeModal: "create" | "edit";
    selectedID?: string;
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    book: null,
    isOpenModal: false,
    isDeleteOpenModal: false,
    modeModal: "create",
    selectedID: undefined,
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        resetBook: (state) => {
            state.books = [];
            state.book = null;
            state.loading = false;
            state.error = null;
        },
        openCreateModal: (state, action: PayloadAction<{
            isOpenModal: boolean;
        }>) => {
            state.isOpenModal = action.payload.isOpenModal;
            state.modeModal = "create"
        },
        openEditModal: (state, action: PayloadAction<{
            isOpenModal: boolean;
            id?: string;
        }>) => {
            state.isOpenModal = action.payload.isOpenModal;
            state.selectedID = action.payload.id;
            state.modeModal = "edit"
        },
        closeModal: (state) => {
            state.isOpenModal = false;
            state.selectedID = undefined;
        },
        openDeleteModal: (state, action: PayloadAction<{
            isOpenModal: boolean;
            id?: string;
        }>) => {
            state.isDeleteOpenModal = action.payload.isOpenModal;
            state.selectedID = action.payload.id;
        },
        closeDeleteModal: (state) => {
            state.isDeleteOpenModal = false;
            state.selectedID = undefined;
        }
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

export const { resetBook, openCreateModal, openEditModal, closeModal, openDeleteModal, closeDeleteModal } = bookSlice.actions;

export default bookSlice.reducer;
