import ListGroup from "react-bootstrap/ListGroup";

export default function ContextMenu({
  onObjectSelected,
  onRoadSelected,
}) {
  return (
    <ListGroup>
      <ListGroup.Item action onClick={onObjectSelected}>
        Объект
      </ListGroup.Item>
      <ListGroup.Item action onClick={onRoadSelected}>
        Путь
      </ListGroup.Item>
    </ListGroup>
  );
}
