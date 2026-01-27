import type { ApiError } from "../../api/errors";

export const AUTH_INIT = "auth/INIT";
export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
export const LOGOUT = "auth/LOGOUT";

export type LoginPayload = {
  email: string;
  password: string;
};

export const authInit = () => ({ type: AUTH_INIT } as const);
export const loginRequest = (payload: LoginPayload) =>
  ({ type: LOGIN_REQUEST, payload } as const);
export const loginSuccess = () => ({ type: LOGIN_SUCCESS } as const);
export const loginFailure = (error: ApiError) =>
  ({ type: LOGIN_FAILURE, payload: error } as const);
export const logout = () => ({ type: LOGOUT } as const);

export type AuthActions =
  | ReturnType<typeof authInit>
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logout>;
