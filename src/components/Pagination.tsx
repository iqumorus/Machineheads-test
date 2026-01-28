import React from "react";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const getPages = (current: number, total: number) => {
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let page = current - 2; page <= current + 2; page += 1) {
    if (page >= 1 && page <= total) {
      pages.add(page);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
}) => {
  if (pageCount <= 1) {
    return null;
  }

  const pages = getPages(currentPage, pageCount);

  return (
    <nav aria-label="pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
            disabled={currentPage === 1}
          >
            Назад
          </button>
        </li>
        {pages.map((page, index) => {
          const prevPage = pages[index - 1];
          const showEllipsis = index > 0 && page - prevPage > 1;
          return (
            <React.Fragment key={page}>
              {showEllipsis && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}
              <li className={`page-item ${page === currentPage ? "active" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                  type="button"
                >
                  {page}
                </button>
              </li>
            </React.Fragment>
          );
        })}
        <li className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
            disabled={currentPage === pageCount}
          >
            Далее
          </button>
        </li>
      </ul>
    </nav>
  );
};
