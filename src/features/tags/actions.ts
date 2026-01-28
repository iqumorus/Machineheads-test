import type { ApiError } from "../../api/errors";

export type TagListItem = {
  id: number;
  name: string;
  code: string;
  sort?: number | null;
  updatedAt: string;
  createdAt: string;
};

export type TagDetail = {
  id: number;
  name: string;
  code: string;
  sort?: number | null;
  updatedAt: string;
  createdAt: string;
};

export type TagPayload = {
  name: string;
  code: string;
  sort?: number | null;
};

export const TAGS_FETCH_REQUEST = "tags/FETCH_REQUEST";
export const TAGS_FETCH_SUCCESS = "tags/FETCH_SUCCESS";
export const TAGS_FETCH_FAILURE = "tags/FETCH_FAILURE";

export const TAG_DETAIL_REQUEST = "tags/DETAIL_REQUEST";
export const TAG_DETAIL_SUCCESS = "tags/DETAIL_SUCCESS";
export const TAG_DETAIL_FAILURE = "tags/DETAIL_FAILURE";

export const TAG_CREATE_REQUEST = "tags/CREATE_REQUEST";
export const TAG_CREATE_SUCCESS = "tags/CREATE_SUCCESS";
export const TAG_CREATE_FAILURE = "tags/CREATE_FAILURE";

export const TAG_UPDATE_REQUEST = "tags/UPDATE_REQUEST";
export const TAG_UPDATE_SUCCESS = "tags/UPDATE_SUCCESS";
export const TAG_UPDATE_FAILURE = "tags/UPDATE_FAILURE";

export const TAG_DELETE_REQUEST = "tags/DELETE_REQUEST";
export const TAG_DELETE_SUCCESS = "tags/DELETE_SUCCESS";
export const TAG_DELETE_FAILURE = "tags/DELETE_FAILURE";

export const TAGS_CLEAR_FORM_ERRORS = "tags/CLEAR_FORM_ERRORS";

export const tagsFetchRequest = () => ({ type: TAGS_FETCH_REQUEST } as const);
export const tagsFetchSuccess = (items: TagListItem[]) =>
  ({ type: TAGS_FETCH_SUCCESS, payload: items } as const);
export const tagsFetchFailure = (error: ApiError) =>
  ({ type: TAGS_FETCH_FAILURE, payload: error } as const);

export const tagDetailRequest = (id: number) =>
  ({ type: TAG_DETAIL_REQUEST, payload: { id } } as const);
export const tagDetailSuccess = (item: TagDetail) =>
  ({ type: TAG_DETAIL_SUCCESS, payload: item } as const);
export const tagDetailFailure = (error: ApiError) =>
  ({ type: TAG_DETAIL_FAILURE, payload: error } as const);

export const tagCreateRequest = (payload: TagPayload) =>
  ({ type: TAG_CREATE_REQUEST, payload } as const);
export const tagCreateSuccess = () => ({ type: TAG_CREATE_SUCCESS } as const);
export const tagCreateFailure = (error: ApiError) =>
  ({ type: TAG_CREATE_FAILURE, payload: error } as const);

export const tagUpdateRequest = (id: number, payload: TagPayload) =>
  ({ type: TAG_UPDATE_REQUEST, payload: { id, data: payload } } as const);
export const tagUpdateSuccess = () => ({ type: TAG_UPDATE_SUCCESS } as const);
export const tagUpdateFailure = (error: ApiError) =>
  ({ type: TAG_UPDATE_FAILURE, payload: error } as const);

export const tagDeleteRequest = (id: number) =>
  ({ type: TAG_DELETE_REQUEST, payload: { id } } as const);
export const tagDeleteSuccess = (id: number) =>
  ({ type: TAG_DELETE_SUCCESS, payload: { id } } as const);
export const tagDeleteFailure = (error: ApiError) =>
  ({ type: TAG_DELETE_FAILURE, payload: error } as const);

export const tagsClearFormErrors = () => ({ type: TAGS_CLEAR_FORM_ERRORS } as const);

export type TagsActions =
  | ReturnType<typeof tagsFetchRequest>
  | ReturnType<typeof tagsFetchSuccess>
  | ReturnType<typeof tagsFetchFailure>
  | ReturnType<typeof tagDetailRequest>
  | ReturnType<typeof tagDetailSuccess>
  | ReturnType<typeof tagDetailFailure>
  | ReturnType<typeof tagCreateRequest>
  | ReturnType<typeof tagCreateSuccess>
  | ReturnType<typeof tagCreateFailure>
  | ReturnType<typeof tagUpdateRequest>
  | ReturnType<typeof tagUpdateSuccess>
  | ReturnType<typeof tagUpdateFailure>
  | ReturnType<typeof tagDeleteRequest>
  | ReturnType<typeof tagDeleteSuccess>
  | ReturnType<typeof tagDeleteFailure>
  | ReturnType<typeof tagsClearFormErrors>;
