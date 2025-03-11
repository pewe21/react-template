import { PublisherType } from "@/page/publisher/types";
import { fetchPublishers } from "../actions/publisherAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PublisherState {
    publishers: PublisherType[];
    isOpenModal: boolean;
    isDeleteOpenModal: boolean;
    modeModal: "create" | "edit";
    selectedID?: string;
    loading: boolean;
    error: string | null;
}

const initialState: PublisherState = {
    publishers: [],
    isOpenModal: false,
    isDeleteOpenModal: false,
    modeModal: "create",
    selectedID: undefined,
    loading: false,
    error: null,
};

const publisherSlice = createSlice({
    name: "publisher",
    initialState,
    reducers: {
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
        builder
            .addCase(fetchPublishers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublishers.fulfilled, (state, action: PayloadAction<{
                data: PublisherType[]
            }>) => {
                state.publishers = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchPublishers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const { openCreateModal, closeDeleteModal, closeModal, openDeleteModal, openEditModal } = publisherSlice.actions;

export default publisherSlice.reducer;