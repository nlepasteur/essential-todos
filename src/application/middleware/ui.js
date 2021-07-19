import { PAGE_LOADED } from "../actions/ui";
import * as todosActions from "../actions/todos";

const pageLoadedFlow =
  ({ log }) =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    console.log("");
    next(action);

    if (action.type === PAGE_LOADED) {
      log("page loaded");
      dispatch(todosActions.loadTodos); //
    }
    console.log("pageLoadedFLow order: 1", getState());
  };

export default [pageLoadedFlow];
