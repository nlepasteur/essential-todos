import ui from "./ui";
import todos from "./todos";

export default [...ui, ...todos];

// [pageLoadedFlow, loadTodosFlow, putTodoFlow];
//        1              3              2

//                       3 next vers 2 donc signifie que va de gauche vers la droite
// suppose que 1 appelle next tout à fait en bas
