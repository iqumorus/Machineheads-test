import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginRequest } from "../features/auth/actions";
import { FormErrors } from "../components/FormErrors";

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("test@test.ru");
  const [password, setPassword] = useState("khro2ij3n2730");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Вход в панель администратора</h4>
          <FormErrors error={error} />
          <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Пароль</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
