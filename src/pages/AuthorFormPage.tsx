import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormErrors } from "../components/FormErrors";
import { Loader } from "../components/Loader";
import {
  authorCreateRequest,
  authorDetailRequest,
  authorUpdateRequest,
  authorsClearFormErrors,
} from "../features/authors/actions";

type RouteParams = {
  id?: string;
};

export const AuthorFormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<RouteParams>();
  const isEdit = Boolean(id);
  const { detail, detailLoading, saveLoading, saveError } = useAppSelector(
    (state) => state.authors,
  );

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  useEffect(() => {
    dispatch(authorsClearFormErrors());
    if (isEdit && id) {
      dispatch(authorDetailRequest(Number(id)));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (detail && isEdit) {
      setName(detail.name);
      setLastName(detail.lastName);
      setSecondName(detail.secondName);
      setShortDescription(detail.shortDescription ?? "");
      setDescription(detail.description ?? "");
    }
  }, [detail, isEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      name,
      lastName,
      secondName,
      shortDescription,
      description,
      avatar,
      removeAvatar,
    };
    if (isEdit && id) {
      dispatch(authorUpdateRequest(Number(id), payload));
    } else {
      dispatch(authorCreateRequest(payload));
    }
  };

  if (isEdit && detailLoading) {
    return <Loader />;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">{isEdit ? "Редактировать автора" : "Добавить автора"}</h2>
        <Link className="btn btn-outline-secondary" to="/authors">
          Назад
        </Link>
      </div>

      <FormErrors error={saveError} />

      <form className="card card-body d-grid gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Имя</label>
          <input
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Фамилия</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Отчество</label>
          <input
            className="form-control"
            value={secondName}
            onChange={(event) => setSecondName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Короткое описание</label>
          <input
            className="form-control"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Аватар</label>
          <input
            type="file"
            className="form-control"
            onChange={(event) => setAvatar(event.target.files?.[0] ?? null)}
          />
          {detail?.avatar?.url && (
            <div className="form-text">
              Текущий: <a href={detail.avatar.url}>посмотреть</a>
            </div>
          )}
        </div>
        {detail?.avatar?.url && (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="removeAvatar"
              checked={removeAvatar}
              onChange={(event) => setRemoveAvatar(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="removeAvatar">
              Удалить текущий аватар
            </label>
          </div>
        )}
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saveLoading}>
            {saveLoading ? "Сохраняем..." : "Сохранить"}
          </button>
          <Link className="btn btn-outline-secondary" to="/authors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
};
