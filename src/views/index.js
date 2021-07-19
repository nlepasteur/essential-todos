import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../application/selectors/todos";
import { pageLoaded } from "../application/actions/ui";
import { putTodo } from "../application/actions/todos";
import { getLoading } from "../application/selectors/ui";

export default () => {
  const dispatch = useDispatch();
  // mais comment teste-t-il render??? peut-pas un problème après tout que soit appelé vrai store
  // puisque n'est pas asynchrone tant qu'une action n'est pas dispatch (si tant est qu'elle soit asynchrone)
  // par exemple dans todos je veux checker:
  // - qu'il y a x items? auquel il faudrait que je puisse injecter data dans composant plutôt que de recevoir data en interne
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoading);
  useEffect(() => {
    dispatch(pageLoaded);
  }, [dispatch]); // ne devrait être call qu'une fois il me semble
  return (
    <>
      <h1>Essential Todos</h1>
      {loading ? (
        "Loading todos..."
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() =>
                dispatch(putTodo({ ...todo, completed: !todo.completed }))
              }
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
