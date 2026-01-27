import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { history } from "./history";
import { createRootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];

const composeEnhancers =
  (window as { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose })
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export type AppDispatch = typeof store.dispatch;
