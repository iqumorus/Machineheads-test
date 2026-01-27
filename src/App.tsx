import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { authInit } from "./features/auth/actions";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { PostsListPage } from "./pages/PostsListPage";
import { PostFormPage } from "./pages/PostFormPage";
import { AuthorsListPage } from "./pages/AuthorsListPage";
import { AuthorFormPage } from "./pages/AuthorFormPage";
import { TagsListPage } from "./pages/TagsListPage";
import { TagFormPage } from "./pages/TagFormPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authInit());
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/">
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route exact path="/posts" component={PostsListPage} />
            <Route exact path="/posts/new" component={PostFormPage} />
            <Route exact path="/posts/:id/edit" component={PostFormPage} />
            <Route exact path="/authors" component={AuthorsListPage} />
            <Route exact path="/authors/new" component={AuthorFormPage} />
            <Route exact path="/authors/:id/edit" component={AuthorFormPage} />
            <Route exact path="/tags" component={TagsListPage} />
            <Route exact path="/tags/new" component={TagFormPage} />
            <Route exact path="/tags/:id/edit" component={TagFormPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ProtectedRoute>
    </Switch>
  );
};

export default App;
