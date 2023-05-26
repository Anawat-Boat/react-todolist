import { useContext, useEffect, useState } from "react";
import todolistContext from "../../contexts/todolistContext";
import { TodoList } from "../../components";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Store({ todoListApi, setTodoListApi }) {
  const [todoList, setTodoList] = useContext(todolistContext);
  const todolistRedux = useSelector((state) => state);
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
    const result = await axios.delete(`http://10.112.85.212:8999/tasks/${id}`);
    console.log(result);
  };

  const handleSetIsTodoApi = async (id, children) => {
    const result = await axios.put(`http://10.112.85.212:8999/tasks/${id}`, {
      id: id,
      title: children,
      isDone: true,
    });
    console.log(result);
  };

  const handleSetIsTodoRedux = (id, children) => {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
      },
    });
  };

  const handleRemoveRedux = (id, children) => {
    dispatch({
      type: "DELETE",
      payload: {
        id,
      },
    });
  };

  return (
    <>
      <Row>
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
        <Col>
          <h1>Store with Redux </h1>
          {todolistRedux.map((v) => (
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
      </Row>
    </>
  );
}

export default Store;
