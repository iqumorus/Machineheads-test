import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { getErrorMessage } from "../api/errors";
import { postDeleteRequest, postsFetchRequest } from "../features/posts/actions";

export const PostsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, pagination } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsFetchRequest(1, pagination.perPage));
  }, [dispatch, pagination.perPage]);

  const handlePageChange = (page: number) => {
    dispatch(postsFetchRequest(page, pagination.perPage));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить пост?")) {
      dispatch(postDeleteRequest(id));
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Посты</h2>
        <Link className="btn btn-primary" to="/posts/new">
          Добавить пост
        </Link>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{getErrorMessage(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Код</th>
              <th>Автор</th>
              <th>Теги</th>
              <th>Обновлено</th>
              <th className="text-end">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.code}</td>
                <td>{post.authorName}</td>
                <td>{post.tagNames.join(", ")}</td>
                <td>{new Date(post.updatedAt).toLocaleString("ru-RU")}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Link className="btn btn-outline-secondary" to={`/posts/${post.id}/edit`}>
                      Редактировать
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => handleDelete(post.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && !loading && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        pageCount={pagination.pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
