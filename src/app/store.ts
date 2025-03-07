
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import bookSlice from "./features/bookSlice";
import AuthReducer from "@/app/features/authSlice";

import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { setupInterceptors } from "@/interceptor/axiosInstance";
import { authMiddleware } from "./middleware/authMiddleware";


const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    book: bookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});

export const persistor = persistStore(store);

setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

