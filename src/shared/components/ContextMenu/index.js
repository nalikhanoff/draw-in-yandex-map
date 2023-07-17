import ListGroup from "react-bootstrap/ListGroup";

export default function ContextMenu({
  onObjectSelected,
  onRoadSelected,
}) {
  return (
    <ListGroup>
      <ListGroup.Item action onClick={onObjectSelected}>
        Устройство
      </ListGroup.Item>
      <ListGroup.Item action onClick={onRoadSelected}>
        Кабельная линия
      </ListGroup.Item>
    </ListGroup>
  );
}
