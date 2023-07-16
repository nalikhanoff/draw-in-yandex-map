import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";

export default function ContextMenu({
  isShown = false,
  title,
  onClose,
  onObjectSelected,
  onRoadSelected,
}) {
  return (
    <Offcanvas show={isShown} placement="end" onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          <ListGroup.Item action onClick={onObjectSelected}>
            Объект
          </ListGroup.Item>
          <ListGroup.Item action onClick={onRoadSelected}>
            Путь
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
