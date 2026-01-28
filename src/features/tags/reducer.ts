import type { ApiError } from "../../api/errors";
import {
  TAGS_CLEAR_FORM_ERRORS,
  TAGS_FETCH_FAILURE,
  TAGS_FETCH_REQUEST,
  TAGS_FETCH_SUCCESS,
  TAG_CREATE_FAILURE,
  TAG_CREATE_REQUEST,
  TAG_CREATE_SUCCESS,
  TAG_DELETE_FAILURE,
  TAG_DELETE_REQUEST,
  TAG_DELETE_SUCCESS,
  TAG_DETAIL_FAILURE,
  TAG_DETAIL_REQUEST,
  TAG_DETAIL_SUCCESS,
  TAG_UPDATE_FAILURE,
  TAG_UPDATE_REQUEST,
  TAG_UPDATE_SUCCESS,
} from "./actions";
import type { TagDetail, TagListItem, TagsActions } from "./actions";

export type TagsState = {
  items: TagListItem[];
  loading: boolean;
  error?: ApiError;
  detail?: TagDetail;
  detailLoading: boolean;
  saveLoading: boolean;
  saveError?: ApiError;
};

const initialState: TagsState = {
  items: [],
  loading: false,
  detailLoading: false,
  saveLoading: false,
};

export const tagsReducer = (
  state: TagsState = initialState,
  action: TagsActions,
): TagsState => {
  switch (action.type) {
    case TAGS_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case TAGS_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case TAGS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case TAG_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detail: undefined, error: undefined };
    case TAG_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case TAG_DETAIL_FAILURE:
      return { ...state, detailLoading: false, error: action.payload };
    case TAG_CREATE_REQUEST:
    case TAG_UPDATE_REQUEST:
      return { ...state, saveLoading: true, saveError: undefined };
    case TAG_CREATE_SUCCESS:
    case TAG_UPDATE_SUCCESS:
      return { ...state, saveLoading: false };
    case TAG_CREATE_FAILURE:
    case TAG_UPDATE_FAILURE:
      return { ...state, saveLoading: false, saveError: action.payload };
    case TAG_DELETE_REQUEST:
      return { ...state, error: undefined };
    case TAG_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case TAG_DELETE_FAILURE:
      return { ...state, error: action.payload };
    case TAGS_CLEAR_FORM_ERRORS:
      return { ...state, saveError: undefined };
    default:
      return state;
  }
};
