import {
  Col, 
  InputGroup, 
  Form, 
  Button
} from 'react-bootstrap';
import { useRef, useState, useEffect} from 'react';

function InputTask({addFunction}) {
  const [newItem, setNewItem] = useState();
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const handleChange = (event) => {
    setNewItem(event.target.value);
  }
  
  const handleKeyDown = event => {
    if(event.keyCode === 13){
        addNewItem()
    }
  };

  const addNewItem = () =>{
    if(newItem == null || newItem.trim().length === 0){
      return
    }
    addFunction(newItem) 
    setNewItem('')
    inputRef.current.focus()
  }

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
        <Button onClick={ addNewItem } variant="primary"  id="button-addon2">
          +
        </Button>
      </InputGroup>
    </Col>
  );
}

export default InputTask;