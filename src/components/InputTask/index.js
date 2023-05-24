import { Col, InputGroup, Form, Button } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";
import todolistContext from "../../contexts/todolistContext";
import { v4 as uuid } from "uuid";
function InputTask() {
  const [todoList, setTodoList] = useContext(todolistContext);
  const [newItem, setNewItem] = useState();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      addNewItem();
    }
  };

  const addNewItem = () => {
    if (newItem == null || newItem.trim().length === 0) {
      return;
    }
    const unique_id = uuid();
    const newTodo = { id: unique_id, todoItem: newItem, isTodo: false };
    const newList = [...todoList, newTodo];
    setNewItem("");
    setTodoList(newList);
    inputRef.current.focus();
  };

  return (
    <Col md={8}>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Text input with checkbox"
          placeholder="Add New Task ..."
          value={newItem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <Button onClick={addNewItem} variant="primary" id="button-addon2">
          +
        </Button>
      </InputGroup>
    </Col>
  );
}

export default InputTask;
