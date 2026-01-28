import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { apiRequest } from "../../api/client";
import type { ApiError } from "../../api/errors";
import {
  AUTHORS_FETCH_REQUEST,
  AUTHOR_DETAIL_REQUEST,
  AUTHOR_CREATE_REQUEST,
  AUTHOR_UPDATE_REQUEST,
  AUTHOR_DELETE_REQUEST,
  authorsFetchFailure,
  authorsFetchSuccess,
  authorDetailFailure,
  authorDetailSuccess,
  authorCreateFailure,
  authorCreateSuccess,
  authorUpdateFailure,
  authorUpdateSuccess,
  authorDeleteFailure,
  authorDeleteSuccess,
} from "./actions";
import type { AuthorListItem, AuthorDetail, AuthorPayload } from "./actions";

const buildAuthorFormData = (payload: AuthorPayload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("lastName", payload.lastName);
  formData.append("secondName", payload.secondName);
  if (payload.shortDescription) {
    formData.append("shortDescription", payload.shortDescription);
  }
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }
  if (payload.removeAvatar) {
    formData.append("removeAvatar", "1");
  }
  return formData;
};

function* handleAuthorsFetch() {
  try {
    const response: { data: AuthorListItem[] } = yield call(
      apiRequest,
      "/manage/authors",
    );
    yield put(authorsFetchSuccess(response.data));
  } catch (error) {
    yield put(authorsFetchFailure(error as ApiError));
  }
}

function* handleAuthorDetail(action: { type: string; payload: { id: number } }) {
  try {
    const response: { data: AuthorDetail } = yield call(
      apiRequest,
      `/manage/authors/detail?id=${action.payload.id}`,
    );
    yield put(authorDetailSuccess(response.data));
  } catch (error) {
    yield put(authorDetailFailure(error as ApiError));
  }
}

function* handleAuthorCreate(action: { type: string; payload: AuthorPayload }) {
  try {
    const formData = buildAuthorFormData(action.payload);
    yield call(apiRequest, "/manage/authors/add", {
      method: "POST",
      body: formData,
    });
    yield put(authorCreateSuccess());
    yield put(push("/authors"));
  } catch (error) {
    yield put(authorCreateFailure(error as ApiError));
  }
}

function* handleAuthorUpdate(action: {
  type: string;
  payload: { id: number; data: AuthorPayload };
}) {
  try {
    const formData = buildAuthorFormData(action.payload.data);
    yield call(apiRequest, `/manage/authors/edit?id=${action.payload.id}`, {
      method: "POST",
      body: formData,
    });
    yield put(authorUpdateSuccess());
    yield put(push("/authors"));
  } catch (error) {
    yield put(authorUpdateFailure(error as ApiError));
  }
}

function* handleAuthorDelete(action: { type: string; payload: { id: number } }) {
  try {
    yield call(apiRequest, `/manage/authors/remove?id=${action.payload.id}`, {
      method: "DELETE",
    });
    yield put(authorDeleteSuccess(action.payload.id));
  } catch (error) {
    yield put(authorDeleteFailure(error as ApiError));
  }
}

export function* authorsSaga() {
  yield takeLatest(AUTHORS_FETCH_REQUEST, handleAuthorsFetch);
  yield takeLatest(AUTHOR_DETAIL_REQUEST, handleAuthorDetail);
  yield takeLatest(AUTHOR_CREATE_REQUEST, handleAuthorCreate);
  yield takeLatest(AUTHOR_UPDATE_REQUEST, handleAuthorUpdate);
  yield takeLatest(AUTHOR_DELETE_REQUEST, handleAuthorDelete);
}
