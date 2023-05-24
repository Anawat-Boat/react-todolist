import { useContext } from "react";
import todolistContext from "../../contexts/todolistContext";
import { TodoList } from "../../components";
function Store() {
  const [todoList, setTodoList] = useContext(todolistContext);
  const handleRemove = (id) => {
    setTodoList(todoList.filter((x) => x.id !== id));
  };

  const handleSetIsTodo = (id) => {
    const listCopy = [...todoList];
    const idx = listCopy.findIndex((x) => x.id === id);
    listCopy[idx].isTodo = true;
    setTodoList(listCopy);
  };

  return (
    <>
      <h1>Store</h1>

      {todoList.map((v) => (
        <TodoList
          key={v.id}
          id={v.id}
          isTodo={v.isTodo}
          onClickRemove={handleRemove}
          onClickChangeStatus={handleSetIsTodo}
        >
          {v.todoItem}
        </TodoList>
      ))}
    </>
  );
}

export default Store;
