import { loadTodosSuccess, LOAD_TODOS } from "../actions/todos";
import todosMiddleware from "./todos";

describe("todos middleware", () => {
  describe("load todos flow", () => {
    const [loadTodosFlow] = todosMiddleware;

    const dummyTodo = {
      id: "1",
      title: "Dummy todo",
      completed: true,
    };
    const api = {
      todos: {
        getAll: jest
          .fn()
          .mockImplementationOnce(
            () => new Promise((resolve) => resolve([dummyTodo]))
          ),
      },
    };
    const dispatch = jest.fn();
    const next = jest.fn();
    const action = {
      type: LOAD_TODOS,
    };

    // est testé ici que middleware est bien appliqué en gros, ne semble pas pouvoir me servir de
    // ce style (en l'état) d'injection dependency pour tester renders
    // à quoi sert ce middleware en fin de compte???
    // est call à chaque dispatch d'action, et crée un ensemble d'opération automatiques
    // qui en l'occurence dispatch automatiquement une série d'actions
    // il me semble comprendre que la seule différence avec redux-thunk est l'automatisation des actions
    // ici est confondant le fait que middleware est asynchrone et non pas actions qui elles sont synchrones
    // tandisque qu'avec redux-thunk les actions peuvent être des fonctions de sorte à faire de l'asynchrone
    it("passes action to next middleware", async () => {
      await loadTodosFlow({ api })({ dispatch })(next)(action);

      expect(next).toHaveBeenCalledWith(action);
    });

    it("calls api.todos.getAll at least once", async () => {
      await loadTodosFlow({ api })({ dispatch })(next)(action);

      expect(api.todos.getAll).toHaveBeenCalled();
    });

    it("calls api.todos.getAll at least once", async () => {
      await loadTodosFlow({ api })({ dispatch })(next)(action);

      expect(dispatch).toHaveBeenCalledWith(loadTodosSuccess([dummyTodo]));
    });
  });
});
