import {
  loadTodosFailure,
  loadTodosSuccess,
  LOAD_TODOS,
  PUT_TODO,
  setTodos,
} from "../actions/todos";
import * as uiActions from "../actions/ui";

const loadTodosFlow =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (
    next // le dernier next dans chain de middleware correspond à dispatch, les précédents sont (si j'ai bien compris) les middlewares qui prennent l'action
  ) =>
  async (action) => {
    next(action); // comme si code de ce middleware dépendait de ce qui ressort d'un autre middleware
    // Peut-être fait passé le middleware d'après avant???

    // peut-être permet d'etre sûr que sera  atteint en dernier en passant expressement à middleware suivant
    // en effet, admettons qu'est passé après putTodoFlow,
    //
    if (action.type === LOAD_TODOS) {
      try {
        dispatch(uiActions.setLoading(true));
        const todos = await api.todos.getAll(); // async
        dispatch(loadTodosSuccess(todos));
        dispatch(uiActions.setLoading(false));
      } catch (error) {
        dispatch(loadTodosFailure(error));
      }
      console.log("loadTodosFlow, order: 3", getState());
    }
  };

const putTodoFlow =
  () =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // donc logiquement est mieux de l'avoir dispatch avant de fetch les todos
    // mais alors pourquoi ne pas juste avoir placé middleware avant???
    if (action.type === PUT_TODO) {
      const oldTodosClone = getState().todos.allTodos.map((todo) => {
        return {
          ...todo,
        };
      });

      const newTodo = action.payload;

      const index = oldTodosClone.findIndex((todo) => todo.id === newTodo.id);

      oldTodosClone[index] = newTodo;

      dispatch(setTodos(oldTodosClone));
    }

    next(action);
    console.log("putTodoFlow order: 2", getState()); // peut-être ici doit passé avant le fetch puisque potentiellement ajoute un todo
  };

export default [loadTodosFlow, putTodoFlow];
