import React from "react";
import { isSystemError, isValidationError } from "../api/errors";
import type { ApiError } from "../api/errors";

type FormErrorsProps = {
  error?: ApiError;
};

export const FormErrors: React.FC<FormErrorsProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (isValidationError(error)) {
    return (
      <div className="alert alert-warning">
        <div className="fw-semibold mb-2">Ошибки валидации</div>
        <ul className="mb-0">
          {error.errors.map((item, index) => (
            <li key={`${item.field}-${index}`}>
              {item.field || "Поле"}: {item.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isSystemError(error)) {
    return (
      <div className="alert alert-danger">
        <div className="fw-semibold mb-1">Системная ошибка</div>
        <div>{error.message ?? "Неизвестная ошибка"}</div>
        {error.code !== undefined && <div>Код: {error.code}</div>}
      </div>
    );
  }

  return <div className="alert alert-danger">{error.message}</div>;
};
