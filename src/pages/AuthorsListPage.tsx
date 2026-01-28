import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loader } from "../components/Loader";
import { getErrorMessage } from "../api/errors";
import { authorDeleteRequest, authorsFetchRequest } from "../features/authors/actions";

export const AuthorsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.authors);

  useEffect(() => {
    dispatch(authorsFetchRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить автора?")) {
      dispatch(authorDeleteRequest(id));
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Авторы</h2>
        <Link className="btn btn-primary" to="/authors/new">
          Добавить автора
        </Link>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{getErrorMessage(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Создан</th>
              <th className="text-end">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((author) => (
              <tr key={author.id}>
                <td>
                  {author.lastName} {author.name} {author.secondName}
                </td>
                <td>{new Date(author.createdAt).toLocaleString("ru-RU")}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Link className="btn btn-outline-secondary" to={`/authors/${author.id}/edit`}>
                      Редактировать
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => handleDelete(author.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && !loading && (
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">
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
