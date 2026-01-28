import type { ApiError } from "../../api/errors";
import {
  AUTHORS_CLEAR_FORM_ERRORS,
  AUTHORS_FETCH_FAILURE,
  AUTHORS_FETCH_REQUEST,
  AUTHORS_FETCH_SUCCESS,
  AUTHOR_CREATE_FAILURE,
  AUTHOR_CREATE_REQUEST,
  AUTHOR_CREATE_SUCCESS,
  AUTHOR_DELETE_FAILURE,
  AUTHOR_DELETE_REQUEST,
  AUTHOR_DELETE_SUCCESS,
  AUTHOR_DETAIL_FAILURE,
  AUTHOR_DETAIL_REQUEST,
  AUTHOR_DETAIL_SUCCESS,
  AUTHOR_UPDATE_FAILURE,
  AUTHOR_UPDATE_REQUEST,
  AUTHOR_UPDATE_SUCCESS,
} from "./actions";
import type { AuthorsActions, AuthorDetail, AuthorListItem } from "./actions";

export type AuthorsState = {
  items: AuthorListItem[];
  loading: boolean;
  error?: ApiError;
  detail?: AuthorDetail;
  detailLoading: boolean;
  saveLoading: boolean;
  saveError?: ApiError;
};

const initialState: AuthorsState = {
  items: [],
  loading: false,
  detail: undefined,
  detailLoading: false,
  saveLoading: false,
};

export const authorsReducer = (
  state: AuthorsState = initialState,
  action: AuthorsActions,
): AuthorsState => {
  switch (action.type) {
    case AUTHORS_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case AUTHORS_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case AUTHORS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AUTHOR_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detail: undefined, error: undefined };
    case AUTHOR_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case AUTHOR_DETAIL_FAILURE:
      return { ...state, detailLoading: false, error: action.payload };
    case AUTHOR_CREATE_REQUEST:
    case AUTHOR_UPDATE_REQUEST:
      return { ...state, saveLoading: true, saveError: undefined };
    case AUTHOR_CREATE_SUCCESS:
    case AUTHOR_UPDATE_SUCCESS:
      return { ...state, saveLoading: false };
    case AUTHOR_CREATE_FAILURE:
    case AUTHOR_UPDATE_FAILURE:
      return { ...state, saveLoading: false, saveError: action.payload };
    case AUTHOR_DELETE_REQUEST:
      return { ...state, error: undefined };
    case AUTHOR_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case AUTHOR_DELETE_FAILURE:
      return { ...state, error: action.payload };
    case AUTHORS_CLEAR_FORM_ERRORS:
      return { ...state, saveError: undefined };
    default:
      return state;
  }
};
