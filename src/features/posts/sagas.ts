import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { apiRequest } from "../../api/client";
import type { ApiError } from "../../api/errors";
import { getPaginationFromHeaders } from "../../api/pagination";
import {
  POSTS_FETCH_REQUEST,
  POST_DETAIL_REQUEST,
  POST_CREATE_REQUEST,
  POST_UPDATE_REQUEST,
  POST_DELETE_REQUEST,
  postsFetchFailure,
  postsFetchSuccess,
  postDetailFailure,
  postDetailSuccess,
  postCreateFailure,
  postCreateSuccess,
  postUpdateFailure,
  postUpdateSuccess,
  postDeleteFailure,
  postDeleteSuccess,
} from "./actions";
import type { PostPayload, PostListItem, PostDetail } from "./actions";

const buildPostFormData = (payload: PostPayload) => {
  const formData = new FormData();
  if (payload.code) {
    formData.append("code", payload.code);
  }
  formData.append("title", payload.title);
  formData.append("authorId", String(payload.authorId));
  payload.tagIds.forEach((tagId) => {
    formData.append("tagIds[]", String(tagId));
  });
  formData.append("text", payload.text);
  if (payload.previewPicture) {
    formData.append("previewPicture", payload.previewPicture);
  }
  return formData;
};

function* handlePostsFetch(action: {
  type: string;
  payload: { page: number; perPage: number };
}) {
  try {
    const { page, perPage } = action.payload;
    const response: { data: PostListItem[]; headers: Headers } = yield call(
      apiRequest,
      `/manage/posts?page=${page}&per-page=${perPage}`,
    );
    const pagination = getPaginationFromHeaders(response.headers);
    yield put(postsFetchSuccess(response.data, pagination));
  } catch (error) {
    yield put(postsFetchFailure(error as ApiError));
  }
}

function* handlePostDetail(action: { type: string; payload: { id: number } }) {
  try {
    const response: { data: PostDetail } = yield call(
      apiRequest,
      `/manage/posts/detail?id=${action.payload.id}`,
    );
    yield put(postDetailSuccess(response.data));
  } catch (error) {
    yield put(postDetailFailure(error as ApiError));
  }
}

function* handlePostCreate(action: { type: string; payload: PostPayload }) {
  try {
    const formData = buildPostFormData(action.payload);
    yield call(apiRequest, "/manage/posts/add", {
      method: "POST",
      body: formData,
    });
    yield put(postCreateSuccess());
    yield put(push("/posts"));
  } catch (error) {
    yield put(postCreateFailure(error as ApiError));
  }
}

function* handlePostUpdate(action: {
  type: string;
  payload: { id: number; data: PostPayload };
}) {
  try {
    const formData = buildPostFormData(action.payload.data);
    yield call(apiRequest, `/manage/posts/edit?id=${action.payload.id}`, {
      method: "POST",
      body: formData,
    });
    yield put(postUpdateSuccess());
    yield put(push("/posts"));
  } catch (error) {
    yield put(postUpdateFailure(error as ApiError));
  }
}

function* handlePostDelete(action: { type: string; payload: { id: number } }) {
  try {
    yield call(apiRequest, `/manage/posts/remove?id=${action.payload.id}`, {
      method: "DELETE",
    });
    yield put(postDeleteSuccess(action.payload.id));
  } catch (error) {
    yield put(postDeleteFailure(error as ApiError));
  }
}

export function* postsSaga() {
  yield takeLatest(POSTS_FETCH_REQUEST, handlePostsFetch);
  yield takeLatest(POST_DETAIL_REQUEST, handlePostDetail);
  yield takeLatest(POST_CREATE_REQUEST, handlePostCreate);
  yield takeLatest(POST_UPDATE_REQUEST, handlePostUpdate);
  yield takeLatest(POST_DELETE_REQUEST, handlePostDelete);
}
