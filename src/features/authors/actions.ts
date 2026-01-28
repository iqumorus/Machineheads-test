import type { ApiError } from "../../api/errors";

export type AuthorListItem = {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar?: { id: number; name: string; url: string } | null;
  updatedAt: string;
  createdAt: string;
};

export type AuthorDetail = {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  shortDescription?: string;
  description?: string;
  avatar?: { id: number; name: string; url: string } | null;
  updatedAt: string;
  createdAt: string;
};

export type AuthorPayload = {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription?: string;
  description?: string;
  avatar?: File | null;
  removeAvatar?: boolean;
};

export const AUTHORS_FETCH_REQUEST = "authors/FETCH_REQUEST";
export const AUTHORS_FETCH_SUCCESS = "authors/FETCH_SUCCESS";
export const AUTHORS_FETCH_FAILURE = "authors/FETCH_FAILURE";

export const AUTHOR_DETAIL_REQUEST = "authors/DETAIL_REQUEST";
export const AUTHOR_DETAIL_SUCCESS = "authors/DETAIL_SUCCESS";
export const AUTHOR_DETAIL_FAILURE = "authors/DETAIL_FAILURE";

export const AUTHOR_CREATE_REQUEST = "authors/CREATE_REQUEST";
export const AUTHOR_CREATE_SUCCESS = "authors/CREATE_SUCCESS";
export const AUTHOR_CREATE_FAILURE = "authors/CREATE_FAILURE";

export const AUTHOR_UPDATE_REQUEST = "authors/UPDATE_REQUEST";
export const AUTHOR_UPDATE_SUCCESS = "authors/UPDATE_SUCCESS";
export const AUTHOR_UPDATE_FAILURE = "authors/UPDATE_FAILURE";

export const AUTHOR_DELETE_REQUEST = "authors/DELETE_REQUEST";
export const AUTHOR_DELETE_SUCCESS = "authors/DELETE_SUCCESS";
export const AUTHOR_DELETE_FAILURE = "authors/DELETE_FAILURE";

export const AUTHORS_CLEAR_FORM_ERRORS = "authors/CLEAR_FORM_ERRORS";

export const authorsFetchRequest = () => ({ type: AUTHORS_FETCH_REQUEST } as const);
export const authorsFetchSuccess = (items: AuthorListItem[]) =>
  ({ type: AUTHORS_FETCH_SUCCESS, payload: items } as const);
export const authorsFetchFailure = (error: ApiError) =>
  ({ type: AUTHORS_FETCH_FAILURE, payload: error } as const);

export const authorDetailRequest = (id: number) =>
  ({ type: AUTHOR_DETAIL_REQUEST, payload: { id } } as const);
export const authorDetailSuccess = (item: AuthorDetail) =>
  ({ type: AUTHOR_DETAIL_SUCCESS, payload: item } as const);
export const authorDetailFailure = (error: ApiError) =>
  ({ type: AUTHOR_DETAIL_FAILURE, payload: error } as const);

export const authorCreateRequest = (payload: AuthorPayload) =>
  ({ type: AUTHOR_CREATE_REQUEST, payload } as const);
export const authorCreateSuccess = () => ({ type: AUTHOR_CREATE_SUCCESS } as const);
export const authorCreateFailure = (error: ApiError) =>
  ({ type: AUTHOR_CREATE_FAILURE, payload: error } as const);

export const authorUpdateRequest = (id: number, payload: AuthorPayload) =>
  ({ type: AUTHOR_UPDATE_REQUEST, payload: { id, data: payload } } as const);
export const authorUpdateSuccess = () => ({ type: AUTHOR_UPDATE_SUCCESS } as const);
export const authorUpdateFailure = (error: ApiError) =>
  ({ type: AUTHOR_UPDATE_FAILURE, payload: error } as const);

export const authorDeleteRequest = (id: number) =>
  ({ type: AUTHOR_DELETE_REQUEST, payload: { id } } as const);
export const authorDeleteSuccess = (id: number) =>
  ({ type: AUTHOR_DELETE_SUCCESS, payload: { id } } as const);
export const authorDeleteFailure = (error: ApiError) =>
  ({ type: AUTHOR_DELETE_FAILURE, payload: error } as const);

export const authorsClearFormErrors = () => ({ type: AUTHORS_CLEAR_FORM_ERRORS } as const);

export type AuthorsActions =
  | ReturnType<typeof authorsFetchRequest>
  | ReturnType<typeof authorsFetchSuccess>
  | ReturnType<typeof authorsFetchFailure>
  | ReturnType<typeof authorDetailRequest>
  | ReturnType<typeof authorDetailSuccess>
  | ReturnType<typeof authorDetailFailure>
  | ReturnType<typeof authorCreateRequest>
  | ReturnType<typeof authorCreateSuccess>
  | ReturnType<typeof authorCreateFailure>
  | ReturnType<typeof authorUpdateRequest>
  | ReturnType<typeof authorUpdateSuccess>
  | ReturnType<typeof authorUpdateFailure>
  | ReturnType<typeof authorDeleteRequest>
  | ReturnType<typeof authorDeleteSuccess>
  | ReturnType<typeof authorDeleteFailure>
  | ReturnType<typeof authorsClearFormErrors>;
