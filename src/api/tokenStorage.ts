import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

type TokenPayload = {
  access_token: string;
  refresh_token: string;
  access_expired_at?: number;
  refresh_expired_at?: number;
};

const toExpiryDate = (unixSeconds?: number) =>
  unixSeconds ? new Date(unixSeconds * 1000) : undefined;

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY) ?? "";

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY) ?? "";

export const setTokens = (payload: TokenPayload) => {
  const accessExpires = toExpiryDate(payload.access_expired_at);
  const refreshExpires = toExpiryDate(payload.refresh_expired_at);

  Cookies.set(ACCESS_TOKEN_KEY, payload.access_token, {
    expires: accessExpires,
    sameSite: "Lax",
  });

  Cookies.set(REFRESH_TOKEN_KEY, payload.refresh_token, {
    expires: refreshExpires,
    sameSite: "Lax",
  });
};

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
