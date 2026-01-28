import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => (
  <div className="text-center py-5">
    <h2>Страница не найдена</h2>
    <Link className="btn btn-outline-primary mt-3" to="/posts">
      На главную
    </Link>
  </div>
);
