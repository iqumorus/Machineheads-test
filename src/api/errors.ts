export type ValidationFieldError = {
  field: string;
  message: string;
};

export type ApiValidationError = {
  type: "validation";
  status: number;
  errors: ValidationFieldError[];
};

export type ApiSystemError = {
  type: "system";
  status: number;
  name?: string;
  message?: string;
  code?: number;
};

export type ApiUnknownError = {
  type: "unknown";
  status: number;
  message: string;
};

export type ApiError = ApiValidationError | ApiSystemError | ApiUnknownError;

export const isValidationError = (error: ApiError): error is ApiValidationError =>
  error.type === "validation";

export const isSystemError = (error: ApiError): error is ApiSystemError =>
  error.type === "system";

export const getErrorMessage = (error: ApiError) => {
  if (error.type === "validation") {
    return "Проверьте корректность введенных данных.";
  }
  if (error.type === "system") {
    return error.message ?? "Системная ошибка";
  }
  return error.message;
};
