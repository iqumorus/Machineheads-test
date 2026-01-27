import React from "react";
import { Redirect, Route } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
