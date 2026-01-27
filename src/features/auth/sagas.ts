import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { apiRequest } from "../../api/client";
import type { ApiError } from "../../api/errors";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../../api/tokenStorage";
import {
  AUTH_INIT,
  LOGIN_REQUEST,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from "./actions";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  access_expired_at?: number;
  refresh_expired_at?: number;
};

function* handleAuthInit() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (accessToken || refreshToken) {
    yield put(loginSuccess());
  } else {
    yield put({ type: LOGOUT });
  }
}

function* handleLogin(action: { type: string; payload: { email: string; password: string } }) {
  try {
    const formData = new FormData();
    formData.append("email", action.payload.email);
    formData.append("password", action.payload.password);

    const response: { data: TokenResponse } = yield call(apiRequest, "/auth/token-generate", {
      method: "POST",
      body: formData,
      skipAuth: true,
    });

    setTokens(response.data);
    yield put(loginSuccess());
    yield put(push("/posts"));
  } catch (error) {
    yield put(loginFailure(error as ApiError));
  }
}

function* handleLogout() {
  clearTokens();
  yield put(push("/login"));
}

export function* authSaga() {
  yield takeLatest(AUTH_INIT, handleAuthInit);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(LOGOUT, handleLogout);
}
