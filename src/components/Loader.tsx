import React from "react";

export const Loader: React.FC = () => (
  <div className="d-flex align-items-center gap-2 text-secondary">
    <div className="spinner-border spinner-border-sm" role="status" />
    <span>Загрузка...</span>
  </div>
);
