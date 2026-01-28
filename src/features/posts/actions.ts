import type { ApiError } from "../../api/errors";
import type { PaginationMeta } from "../../api/pagination";

export type PostListItem = {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture?: { id: number; name: string; url: string } | null;
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
};

export type PostDetail = {
  id: number;
  title: string;
  code: string;
  text: string;
  author?: { id: number; fullName: string };
  previewPicture?: { id: number; name: string; url: string } | null;
  tags: Array<{ id: number; name: string; code: string }>;
  updatedAt: string;
  createdAt: string;
};

export type PostPayload = {
  title: string;
  code?: string;
  authorId: number;
  tagIds: number[];
  text: string;
  previewPicture?: File | null;
};

export const POSTS_FETCH_REQUEST = "posts/FETCH_REQUEST";
export const POSTS_FETCH_SUCCESS = "posts/FETCH_SUCCESS";
export const POSTS_FETCH_FAILURE = "posts/FETCH_FAILURE";

export const POST_DETAIL_REQUEST = "posts/DETAIL_REQUEST";
export const POST_DETAIL_SUCCESS = "posts/DETAIL_SUCCESS";
export const POST_DETAIL_FAILURE = "posts/DETAIL_FAILURE";

export const POST_CREATE_REQUEST = "posts/CREATE_REQUEST";
export const POST_CREATE_SUCCESS = "posts/CREATE_SUCCESS";
export const POST_CREATE_FAILURE = "posts/CREATE_FAILURE";

export const POST_UPDATE_REQUEST = "posts/UPDATE_REQUEST";
export const POST_UPDATE_SUCCESS = "posts/UPDATE_SUCCESS";
export const POST_UPDATE_FAILURE = "posts/UPDATE_FAILURE";

export const POST_DELETE_REQUEST = "posts/DELETE_REQUEST";
export const POST_DELETE_SUCCESS = "posts/DELETE_SUCCESS";
export const POST_DELETE_FAILURE = "posts/DELETE_FAILURE";

export const POSTS_CLEAR_FORM_ERRORS = "posts/CLEAR_FORM_ERRORS";

export const postsFetchRequest = (page = 1, perPage = 9) =>
  ({ type: POSTS_FETCH_REQUEST, payload: { page, perPage } } as const);
export const postsFetchSuccess = (items: PostListItem[], pagination: PaginationMeta) =>
  ({ type: POSTS_FETCH_SUCCESS, payload: { items, pagination } } as const);
export const postsFetchFailure = (error: ApiError) =>
  ({ type: POSTS_FETCH_FAILURE, payload: error } as const);

export const postDetailRequest = (id: number) =>
  ({ type: POST_DETAIL_REQUEST, payload: { id } } as const);
export const postDetailSuccess = (item: PostDetail) =>
  ({ type: POST_DETAIL_SUCCESS, payload: item } as const);
export const postDetailFailure = (error: ApiError) =>
  ({ type: POST_DETAIL_FAILURE, payload: error } as const);

export const postCreateRequest = (payload: PostPayload) =>
  ({ type: POST_CREATE_REQUEST, payload } as const);
export const postCreateSuccess = () => ({ type: POST_CREATE_SUCCESS } as const);
export const postCreateFailure = (error: ApiError) =>
  ({ type: POST_CREATE_FAILURE, payload: error } as const);

export const postUpdateRequest = (id: number, payload: PostPayload) =>
  ({ type: POST_UPDATE_REQUEST, payload: { id, data: payload } } as const);
export const postUpdateSuccess = () => ({ type: POST_UPDATE_SUCCESS } as const);
export const postUpdateFailure = (error: ApiError) =>
  ({ type: POST_UPDATE_FAILURE, payload: error } as const);

export const postDeleteRequest = (id: number) =>
  ({ type: POST_DELETE_REQUEST, payload: { id } } as const);
export const postDeleteSuccess = (id: number) =>
  ({ type: POST_DELETE_SUCCESS, payload: { id } } as const);
export const postDeleteFailure = (error: ApiError) =>
  ({ type: POST_DELETE_FAILURE, payload: error } as const);

export const postsClearFormErrors = () => ({ type: POSTS_CLEAR_FORM_ERRORS } as const);

export type PostsActions =
  | ReturnType<typeof postsFetchRequest>
  | ReturnType<typeof postsFetchSuccess>
  | ReturnType<typeof postsFetchFailure>
  | ReturnType<typeof postDetailRequest>
  | ReturnType<typeof postDetailSuccess>
  | ReturnType<typeof postDetailFailure>
  | ReturnType<typeof postCreateRequest>
  | ReturnType<typeof postCreateSuccess>
  | ReturnType<typeof postCreateFailure>
  | ReturnType<typeof postUpdateRequest>
  | ReturnType<typeof postUpdateSuccess>
  | ReturnType<typeof postUpdateFailure>
  | ReturnType<typeof postDeleteRequest>
  | ReturnType<typeof postDeleteSuccess>
  | ReturnType<typeof postDeleteFailure>
  | ReturnType<typeof postsClearFormErrors>;
