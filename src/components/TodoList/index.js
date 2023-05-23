import "./style.scss";
import { Col, Button } from "react-bootstrap";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
function TodoList({
  children,
  id,
  onClickRemove,
  isTodo,
  onClickChangeStatus,
}) {
  const styles = {
    textDecoration: isTodo ? "line-through" : "none",
  };

  return (
    <>
      <Col md={8} className="todo-list-container p-2">
        <Col md={10} className="text" style={styles}>
          {children}
        </Col>
        <Col className="button-group">
          <Button
            onClick={() => onClickChangeStatus(id)}
            variant="success"
            className="ms-1"
          >
            <CheckIcon strokeWidth={5} className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => onClickRemove(id)}
            variant="danger"
            className="ms-1"
          >
            <TrashIcon strokeWidth={3} className="h-5 w-5" />
          </Button>
        </Col>
      </Col>
    </>
  );
}
export default TodoList;
