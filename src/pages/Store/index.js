import { useContext } from "react";
import todolistContext from "../../contexts/todolistContext";
import storeTypeContext from "../../contexts/storeTypeContext";
import { TodoList } from "../../components";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as todolistActions from "../../actions/todolistActions";

function Store({ todoListApi, fetchData }) {
  const [todoList, setTodoList] = useContext(todolistContext);
  const todolistRedux = useSelector((state) => state.todolistReducer);
  const [storeType, setStoreType] = useContext(storeTypeContext);

  const dispatch = useDispatch();

  const handleRemoveContext = (id) => {
    setTodoList(todoList.filter((x) => x.id !== id));
  };

  const handleSetIsTodoContext = (id, children) => {
    const listCopy = [...todoList];
    const idx = listCopy.findIndex((x) => x.id === id);
    listCopy[idx].isTodo = true;
    setTodoList(listCopy);
  };

  const handleRemoveApi = async (id) => {
    await axios.delete(`http://10.112.85.212:8999/tasks/${id}`);
    fetchData();
  };

  const handleSetIsTodoApi = async (id, children) => {
    await axios.put(`http://10.112.85.212:8999/tasks/${id}`, {
      id: id,
      title: children,
      isDone: true,
    });
    fetchData();
  };

  const handleSetIsTodoRedux = (id, children) => {
    const action = {
      type: "UPDATE",
      payload: {
        id,
      },
    };
    dispatch(todolistActions.actionAsync(action));
  };

  const handleRemoveRedux = (id, children) => {
    const action = {
      type: "DELETE",
      payload: {
        id,
      },
    };
    dispatch(todolistActions.actionAsync(action));
  };

  return (
    <>
      <Row>
        {storeType === "UseContext" && (
          <Col>
            <h1>Store with useContext</h1>
            {todoList.map((v) => (
              <TodoList
                key={v.id}
                id={v.id}
                isTodo={v.isTodo}
                onClickRemove={handleRemoveContext}
                onClickChangeStatus={handleSetIsTodoContext}
              >
                {v.todoItem}
              </TodoList>
            ))}
          </Col>
        )}
        {storeType === "UseApi" && (
          <Col>
            <h1>Store with Api</h1>
            {todoListApi.map((v) => (
              <TodoList
                key={v.id}
                id={v.id}
                isTodo={v.isDone}
                onClickRemove={handleRemoveApi}
                onClickChangeStatus={handleSetIsTodoApi}
              >
                {v.title}
              </TodoList>
            ))}
          </Col>
        )}
        {storeType === "UseRedux" && (
          <Col>
            <div>
              {todolistRedux.loading ? (
                <h1>Loading... </h1>
              ) : (
                <h1>Store with Redux </h1>
              )}
            </div>
            {todolistRedux.list.map((v) => (
              <TodoList
                key={v.id}
                id={v.id}
                isTodo={v.isDone}
                onClickRemove={handleRemoveRedux}
                onClickChangeStatus={handleSetIsTodoRedux}
              >
                {v.title}
              </TodoList>
            ))}
          </Col>
        )}
      </Row>
    </>
  );
}

export default Store;
