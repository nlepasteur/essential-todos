import { compose, applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware"; // ici sont import les functions avec x closures

// dev tool
const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/*
import services from './infrastructure/services';
import App from './views';

ReactDOM.render(            /!\ injection de services /!\
    <Provider store={configureStore(services)}>
        <App />
    </Provider>,
    document.getElementById('root')
);
*/ // /!\ injection de services depuis app lorsqu'est passé value de store dans provider /!\
export const configureStore = (services) =>
  createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware.map((f) => f(services)))) // f équivaut à un middleware comme par exemple loadTodosFlow
  );
/*
 ()
  const loadTodosFlow = ({ api }) => ({ dispatch }) => next => async (action) => {
    next(action);

    if (action.type === LOAD_TODOS) {
        try {
            dispatch(uiActions.setLoading(true));
            const todos = await api.todos.getAll();
            dispatch(loadTodosSuccess(todos));
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            dispatch(loadTodosFailure(error));
        }
    }
}
*/
