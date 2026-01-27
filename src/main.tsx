import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { history } from "./app/history";
import { store } from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
