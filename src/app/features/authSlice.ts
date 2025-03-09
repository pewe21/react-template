import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkuserdata, loginAction } from '../actions/authAction';


interface User {
    id: string;
    name: string;
    username: string;
    role: string;
}

interface AuthState {
    token: string | null;
    errMessage: string | null;
    refreshToken: string | null;
    user: User | null;
    loading?: boolean;
}

const initialState: AuthState = {
    token: null,
    errMessage: null,
    refreshToken: null,
    user: null,
    loading: false
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action: PayloadAction) => {

            let message = action.payload as string | unknown;
            if (message == "exp") {
                state.errMessage = "silahkan login kembali";
                state.token = null;
                state.refreshToken = null;
                state.user = null;
            } else {
                state.token = null;
                state.refreshToken = null;
                state.user = null;
                state.errMessage = null;
            }


        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.errMessage = null;
            state.loading = true;

        });

        builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<{ token: string, refreshToken: string, user: User }>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.errMessage = null;
            state.loading = false;
        });

        builder.addCase(loginAction.rejected, (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.errMessage = null;
            state.loading = false;
        });

        builder.addCase(checkuserdata.fulfilled, (state, action: PayloadAction<{ status: string, data: any }>) => {
            if (action.payload.status != "success") {
                state.token = null;
                state.refreshToken = null;
                state.user = null;
                state.errMessage = null;
            }
        });

        builder.addCase(checkuserdata.rejected, (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.errMessage = null;
        });
    }
});



export const { logout } = AuthSlice.actions;


export const selectAuth = (state: { auth: AuthState }) => state.auth;
export default AuthSlice.reducer;
