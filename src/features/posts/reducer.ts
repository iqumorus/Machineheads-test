import type { ApiError } from "../../api/errors";
import type { PaginationMeta } from "../../api/pagination";
import {
  POSTS_CLEAR_FORM_ERRORS,
  POSTS_FETCH_FAILURE,
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_FAILURE,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_UPDATE_FAILURE,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "./actions";
import type { PostsActions, PostDetail, PostListItem } from "./actions";

export type PostsState = {
  items: PostListItem[];
  loading: boolean;
  error?: ApiError;
  pagination: PaginationMeta;
  detail?: PostDetail;
  detailLoading: boolean;
  saveLoading: boolean;
  saveError?: ApiError;
  deleteLoading: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  pagination: {
    currentPage: 1,
    pageCount: 1,
    perPage: 9,
    totalCount: 0,
  },
  detail: undefined,
  detailLoading: false,
  saveLoading: false,
  saveError: undefined,
  deleteLoading: false,
};

export const postsReducer = (
  state: PostsState = initialState,
  action: PostsActions,
): PostsState => {
  switch (action.type) {
    case POSTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        pagination: action.payload.pagination,
      };
    case POSTS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_DETAIL_REQUEST:
      return {
        ...state,
        detailLoading: true,
        detail: undefined,
        error: undefined,
      };
    case POST_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload,
      };
    case POST_DETAIL_FAILURE:
      return {
        ...state,
        detailLoading: false,
        error: action.payload,
      };
    case POST_CREATE_REQUEST:
    case POST_UPDATE_REQUEST:
      return {
        ...state,
        saveLoading: true,
        saveError: undefined,
      };
    case POST_CREATE_SUCCESS:
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      };
    case POST_CREATE_FAILURE:
    case POST_UPDATE_FAILURE:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload,
      };
    case POST_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: undefined,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case POST_DELETE_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload,
      };
    case POSTS_CLEAR_FORM_ERRORS:
      return {
        ...state,
        saveError: undefined,
      };
    default:
      return state;
  }
};
