import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import todolistContext from "./contexts/todolistContext";
import { HomePage, StorePage } from "./pages";
import { InputTask } from "./components";
function App() {
  const [list, setList] = useState([]);

  return (
    <todolistContext.Provider value={[list, setList]}>
      <Container>
        <div className="app-container">
          <h1 className="header">
            aดัม
            <br />
            Todo List
          </h1>
          <Row className="content">
            <InputTask />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="store/*" element={<StorePage />} />
              </Routes>
            </BrowserRouter>
          </Row>
        </div>
      </Container>
    </todolistContext.Provider>
  );
}
export default App;
