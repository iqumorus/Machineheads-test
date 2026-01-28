import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { apiRequest } from "../../api/client";
import type { ApiError } from "../../api/errors";
import {
  TAGS_FETCH_REQUEST,
  TAG_DETAIL_REQUEST,
  TAG_CREATE_REQUEST,
  TAG_UPDATE_REQUEST,
  TAG_DELETE_REQUEST,
  tagsFetchFailure,
  tagsFetchSuccess,
  tagDetailFailure,
  tagDetailSuccess,
  tagCreateFailure,
  tagCreateSuccess,
  tagUpdateFailure,
  tagUpdateSuccess,
  tagDeleteFailure,
  tagDeleteSuccess,
} from "./actions";
import type { TagListItem, TagDetail, TagPayload } from "./actions";

function* handleTagsFetch() {
  try {
    const response: { data: TagListItem[] } = yield call(apiRequest, "/manage/tags");
    yield put(tagsFetchSuccess(response.data));
  } catch (error) {
    yield put(tagsFetchFailure(error as ApiError));
  }
}

function* handleTagDetail(action: { type: string; payload: { id: number } }) {
  try {
    const response: { data: TagDetail } = yield call(
      apiRequest,
      `/manage/tags/detail?id=${action.payload.id}`,
    );
    yield put(tagDetailSuccess(response.data));
  } catch (error) {
    yield put(tagDetailFailure(error as ApiError));
  }
}

function* handleTagCreate(action: { type: string; payload: TagPayload }) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("code", action.payload.code);
    if (action.payload.sort !== undefined && action.payload.sort !== null) {
      formData.append("sort", String(action.payload.sort));
    }
    yield call(apiRequest, "/manage/tags/add", {
      method: "POST",
      body: formData,
    });
    yield put(tagCreateSuccess());
    yield put(push("/tags"));
  } catch (error) {
    yield put(tagCreateFailure(error as ApiError));
  }
}

function* handleTagUpdate(action: {
  type: string;
  payload: { id: number; data: TagPayload };
}) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.data.name);
    formData.append("code", action.payload.data.code);
    if (action.payload.data.sort !== undefined && action.payload.data.sort !== null) {
      formData.append("sort", String(action.payload.data.sort));
    }
    yield call(apiRequest, `/manage/tags/edit?id=${action.payload.id}`, {
      method: "POST",
      body: formData,
    });
    yield put(tagUpdateSuccess());
    yield put(push("/tags"));
  } catch (error) {
    yield put(tagUpdateFailure(error as ApiError));
  }
}

function* handleTagDelete(action: { type: string; payload: { id: number } }) {
  try {
    yield call(apiRequest, `/manage/tags/remove?id=${action.payload.id}`, {
      method: "DELETE",
    });
    yield put(tagDeleteSuccess(action.payload.id));
  } catch (error) {
    yield put(tagDeleteFailure(error as ApiError));
  }
}

export function* tagsSaga() {
  yield takeLatest(TAGS_FETCH_REQUEST, handleTagsFetch);
  yield takeLatest(TAG_DETAIL_REQUEST, handleTagDetail);
  yield takeLatest(TAG_CREATE_REQUEST, handleTagCreate);
  yield takeLatest(TAG_UPDATE_REQUEST, handleTagUpdate);
  yield takeLatest(TAG_DELETE_REQUEST, handleTagDelete);
}
