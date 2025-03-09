
import { BACKEND_URL, DISPATCH_LOGOUT, EXP } from '@/app/constants';
import axios from 'axios';

const api = axios.create({
    baseURL: BACKEND_URL, // "http://localhost:7072/api"
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupInterceptors = (store: any) => {
    api.interceptors.request.use((config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {

            if (error.code === "ERR_NETWORK" || error.response?.status === 401) {


                store.dispatch({ type: DISPATCH_LOGOUT, payload: EXP }); // Logout tanpa cyclic dependency
            }
            return Promise.reject(error);
        }
    );
};

export default api;