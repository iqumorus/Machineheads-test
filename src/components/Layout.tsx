import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/actions";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">MachineHeads Admin</span>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/posts">
                  Посты
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/authors">
                  Авторы
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tags">
                  Теги
                </NavLink>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={() => dispatch(logout())}
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>
      <main className="container py-4">{children}</main>
    </div>
  );
};
