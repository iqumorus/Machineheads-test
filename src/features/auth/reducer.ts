import type { ApiError } from "../../api/errors";
import { AUTH_INIT, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actions";
import type { AuthActions } from "./actions";

export type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  error?: ApiError;
};

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: undefined,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: undefined,
      };
    default:
      return state;
  }
};
