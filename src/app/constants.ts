
const env = import.meta.env;

export const BACKEND_URL = env.VITE_BACKEND_URL as string;
export const EXP = "exp";





export const DISPATCH_LOGOUT = "auth/logout";
export const DISPATCH_LOGIN = "auth/login";
export const DISPATCH_CHECKUSERDATA = "auth/checkuserdata";