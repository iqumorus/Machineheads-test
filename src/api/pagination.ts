export type PaginationMeta = {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
};

const toNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getPaginationFromHeaders = (headers: Headers): PaginationMeta => ({
  currentPage: toNumber(headers.get("x-pagination-current-page"), 1),
  pageCount: toNumber(headers.get("x-pagination-page-count"), 1),
  perPage: toNumber(headers.get("x-pagination-per-page"), 10),
  totalCount: toNumber(headers.get("x-pagination-total-count"), 0),
});
