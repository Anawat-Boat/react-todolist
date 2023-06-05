import { Col, InputGroup, Form, Button } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";
import todolistContext from "../../contexts/todolistContext";
import storeTypeContext from "../../contexts/storeTypeContext";
import * as todolistActions from "../../actions/todolistActions";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function InputTask({ fetchData, todoListApi }) {
  const [todoList, setTodoList] = useContext(todolistContext);
  const [storeType, setStoreType] = useContext(storeTypeContext);
  const todolistRedux = useSelector((state) => state.todolistReducer);
  const [newItem, setNewItem] = useState();
  const inputRef = useRef();
  const dispatch = useDispatch();

  const sendData = async () => {
    const maxObj = todoListApi.reduce((accumulator, current) => {
      return accumulator.id > current.id ? accumulator : current;
    });
    await axios.post("http://10.112.85.212:8999/tasks", {
      id: maxObj.id + 1,
      title: newItem,
      isDone: false,
    });
    fetchData();
  };

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
  const handleStoreTypeChange = (event) => {
    if (event.target) {
      setStoreType(event.target.id);
    }
  };

  const addNewItem = () => {
    if (newItem == null || newItem.trim().length === 0) {
      return;
    }
    if (storeType === "UseContext") {
      const unique_id = uuid();
      const newTodo = { id: unique_id, todoItem: newItem, isTodo: false };
      const newList = [...todoList, newTodo];
      setTodoList(newList);
    } else if (storeType === "UseApi") {
      sendData();
    } else if (storeType === "UseRedux") {
      const maxObj =
        todolistRedux.list.length === 0
          ? 0
          : todolistRedux.list.reduce((accumulator, current) => {
              return accumulator.id > current.id ? accumulator : current;
            }).id;
      const action = {
        type: "ADD",
        payload: { id: maxObj + 1, title: newItem, isDone: false },
      };
      dispatch(todolistActions.actionAsync(action));
    }
    setNewItem("");
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
      <Form>
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="UseContext"
            name="group1"
            checked={storeType === "UseContext"}
            type="radio"
            onChange={handleStoreTypeChange}
            id="UseContext"
          />
          <Form.Check
            inline
            label="UseApi"
            name="group1"
            type="radio"
            checked={storeType === "UseApi"}
            onChange={handleStoreTypeChange}
            id="UseApi"
          />
          <Form.Check
            inline
            label="UseRedux"
            name="group1"
            type="radio"
            checked={storeType === "UseRedux"}
            onChange={handleStoreTypeChange}
            id="UseRedux"
          />
        </div>
      </Form>
    </Col>
  );
}

export default InputTask;
