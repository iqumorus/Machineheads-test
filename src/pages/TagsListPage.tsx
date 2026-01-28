import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loader } from "../components/Loader";
import { getErrorMessage } from "../api/errors";
import { tagDeleteRequest, tagsFetchRequest } from "../features/tags/actions";

export const TagsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(tagsFetchRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить тег?")) {
      dispatch(tagDeleteRequest(id));
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Теги</h2>
        <Link className="btn btn-primary" to="/tags/new">
          Добавить тег
        </Link>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{getErrorMessage(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Название</th>
              <th>Код</th>
              <th>Сортировка</th>
              <th className="text-end">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.name}</td>
                <td>{tag.code}</td>
                <td>{tag.sort ?? "-"}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Link className="btn btn-outline-secondary" to={`/tags/${tag.id}/edit`}>
                      Редактировать
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => handleDelete(tag.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && !loading && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
