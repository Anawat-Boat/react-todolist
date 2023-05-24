import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import todolistContext from "./contexts/todolistContext";
import StoreTypeContext from "./contexts/storeTypeContext";
import { HomePage, StorePage } from "./pages";
import { InputTask } from "./components";
function App() {
  const [list, setList] = useState([]);
  const [todoListApi, setTodoListApi] = useState([]);
  const [storeType, setStoreType] = useState("UseContext");

  const fetchData = async () => {
    const result = await axios("http://10.112.85.212:8999/tasks");
    setTodoListApi(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <todolistContext.Provider value={[list, setList]}>
      <StoreTypeContext.Provider value={[storeType, setStoreType]}>
        <Container>
          <div className="app-container">
            <h1 className="header">
              aดัม
              <br />
              Todo List
            </h1>
            <Row className="content">
              <InputTask fetchData={fetchData} todoListApi={todoListApi} />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="store/*"
                    element={
                      <StorePage
                        todoListApi={todoListApi}
                        setTodoListApi={setTodoListApi}
                      />
                    }
                  />
                </Routes>
              </BrowserRouter>
            </Row>
          </div>
        </Container>
      </StoreTypeContext.Provider>
    </todolistContext.Provider>
  );
}
export default App;
