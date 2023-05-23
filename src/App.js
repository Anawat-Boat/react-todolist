import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Container, Row } from "react-bootstrap";
import { TodoList, InputTask } from "./components";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [list, setList] = useState([]);
  const handleAdd = (value) => {
    const unique_id = uuid();
    const newItem = { id: unique_id, todoItem: value, isTodo: false };
    const newList = [...list, newItem];
    setList(newList);
  };
  const handleRemove = (id) => {
    setList(list.filter((x) => x.id !== id));
  };

  const handleSetIsTodo = (id) => {
    const listCopy = [...list];
    const idx = listCopy.findIndex((x) => x.id === id);
    listCopy[idx].isTodo = true;
    setList(listCopy);
  };

  return (
    <Container>
      <div className="app-container">
        <h1 className="header">
          aดัม
          <br />
          Todo List
        </h1>
        <Row className="content">
          <InputTask addFunction={handleAdd} />
          {list.map((v, i) => (
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
        </Row>
      </div>
    </Container>
  );
}
export default App;
