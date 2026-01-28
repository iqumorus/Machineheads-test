import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormErrors } from "../components/FormErrors";
import { Loader } from "../components/Loader";
import {
  tagCreateRequest,
  tagDetailRequest,
  tagUpdateRequest,
  tagsClearFormErrors,
} from "../features/tags/actions";

type RouteParams = {
  id?: string;
};

export const TagFormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<RouteParams>();
  const isEdit = Boolean(id);
  const { detail, detailLoading, saveLoading, saveError } = useAppSelector(
    (state) => state.tags,
  );

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    dispatch(tagsClearFormErrors());
    if (isEdit && id) {
      dispatch(tagDetailRequest(Number(id)));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (detail && isEdit) {
      setName(detail.name);
      setCode(detail.code);
      setSort(detail.sort !== null && detail.sort !== undefined ? String(detail.sort) : "");
    }
  }, [detail, isEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      name,
      code,
      sort: sort ? Number(sort) : null,
    };
    if (isEdit && id) {
      dispatch(tagUpdateRequest(Number(id), payload));
    } else {
      dispatch(tagCreateRequest(payload));
    }
  };

  if (isEdit && detailLoading) {
    return <Loader />;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">{isEdit ? "Редактировать тег" : "Добавить тег"}</h2>
        <Link className="btn btn-outline-secondary" to="/tags">
          Назад
        </Link>
      </div>

      <FormErrors error={saveError} />

      <form className="card card-body d-grid gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Название</label>
          <input
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Код</label>
          <input
            className="form-control"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Сортировка</label>
          <input
            className="form-control"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saveLoading}>
            {saveLoading ? "Сохраняем..." : "Сохранить"}
          </button>
          <Link className="btn btn-outline-secondary" to="/tags">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
};
