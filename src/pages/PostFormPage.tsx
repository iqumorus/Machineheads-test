import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormErrors } from "../components/FormErrors";
import { Loader } from "../components/Loader";
import { authorsFetchRequest } from "../features/authors/actions";
import {
  postCreateRequest,
  postDetailRequest,
  postUpdateRequest,
  postsClearFormErrors,
} from "../features/posts/actions";
import { tagsFetchRequest } from "../features/tags/actions";

type RouteParams = {
  id?: string;
};

export const PostFormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<RouteParams>();
  const isEdit = Boolean(id);

  const { detail, detailLoading, saveLoading, saveError } = useAppSelector(
    (state) => state.posts,
  );
  const { items: authors } = useAppSelector((state) => state.authors);
  const { items: tags } = useAppSelector((state) => state.tags);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [authorId, setAuthorId] = useState<number | "">("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [text, setText] = useState("");
  const [previewPicture, setPreviewPicture] = useState<File | null>(null);

  useEffect(() => {
    dispatch(postsClearFormErrors());
    dispatch(authorsFetchRequest());
    dispatch(tagsFetchRequest());
    if (isEdit && id) {
      dispatch(postDetailRequest(Number(id)));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (detail && isEdit) {
      setTitle(detail.title);
      setCode(detail.code ?? "");
      setAuthorId(detail.author?.id ?? "");
      setSelectedTags(detail.tags.map((tag) => tag.id));
      setText(detail.text ?? "");
    }
  }, [detail, isEdit]);

  const tagOptions = useMemo(
    () =>
      tags.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.name}
        </option>
      )),
    [tags],
  );

  const handleTagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(event.target.selectedOptions).map((option) => Number(option.value));
    setSelectedTags(values);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!authorId) {
      return;
    }
    const payload = {
      title,
      code: code || undefined,
      authorId: Number(authorId),
      tagIds: selectedTags,
      text,
      previewPicture,
    };
    if (isEdit && id) {
      dispatch(postUpdateRequest(Number(id), payload));
    } else {
      dispatch(postCreateRequest(payload));
    }
  };

  if (isEdit && detailLoading) {
    return <Loader />;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">{isEdit ? "Редактировать пост" : "Добавить пост"}</h2>
        <Link className="btn btn-outline-secondary" to="/posts">
          Назад
        </Link>
      </div>

      <FormErrors error={saveError} />

      <form className="card card-body d-grid gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Заголовок</label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Код</label>
          <input
            className="form-control"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Автор</label>
          <select
            className="form-select"
            value={authorId}
            onChange={(event) => setAuthorId(event.target.value ? Number(event.target.value) : "")}
            required
          >
            <option value="">Выберите автора</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.lastName} {author.name} {author.secondName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Теги</label>
          <select
            className="form-select"
            multiple
            value={selectedTags.map(String)}
            onChange={handleTagsChange}
          >
            {tagOptions}
          </select>
          <div className="form-text">Можно выбрать несколько тегов.</div>
        </div>
        <div>
          <label className="form-label">Текст</label>
          <textarea
            className="form-control"
            rows={6}
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Превью изображение</label>
          <input
            type="file"
            className="form-control"
            onChange={(event) => setPreviewPicture(event.target.files?.[0] ?? null)}
          />
          {detail?.previewPicture?.url && (
            <div className="form-text">
              Текущее: <a href={detail.previewPicture.url}>посмотреть</a>
            </div>
          )}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saveLoading}>
            {saveLoading ? "Сохраняем..." : "Сохранить"}
          </button>
          <Link className="btn btn-outline-secondary" to="/posts">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
};
