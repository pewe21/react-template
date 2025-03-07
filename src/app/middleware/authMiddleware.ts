import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { logout } from "@/app/features/authSlice";
import { RootState, AppDispatch } from "@/app/store";
import api from "@/interceptor/axiosInstance";

export const authMiddleware: Middleware<{}> =
    (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => async (action) => {
        if (isRejectedWithValue(action)) {
            const errorPayload = action.payload as string;

            // 🔹 Jika error 401, coba refresh token
            if (errorPayload === "Unauthorized") {
                const refreshTokenState = store.getState().auth.refreshToken;

                if (!refreshTokenState) {
                    store.dispatch(logout());
                    return;
                }

                // try {
                //   const refreshResponse = await store.dispatch(refreshToken()).unwrap();

                //   // ✅ Simpan token baru di axios instance
                //   api.defaults.headers.common["Authorization"] = `Bearer ${refreshResponse.token}`;

                //   // ✅ Simpan token baru di Redux store
                //   store.dispatch(refreshTokenSuccess(refreshResponse));
                // } catch (error) {
                //   // ❌ Jika gagal refresh, langsung logout
                //   store.dispatch(logout());
                // }
            }
        }
        return next(action);
    };
