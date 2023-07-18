import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LINE_COLOR_COLLECTION } from "Shared/constants/common";

export default function LineForm({
  id,
  title,
  description,
  color,
  onTextFieldChange,
  onStartDraw,
}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Название линии</Form.Label>
        <Form.Control
          onChange={onTextFieldChange}
          placeholder="Название устройства"
          id={id}
          name="title"
          value={title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Описание линии</Form.Label>
        <Form.Control
          onChange={onTextFieldChange}
          as="textarea"
          rows={3}
          id={id}
          name="description"
          value={description}
        />
      </Form.Group>
      <Form.Select
        onChange={onTextFieldChange}
        name="color"
        value={color}
        placeholder="Цвет линии"
        id={id}
      >
        <option disabled>Выберите цвет линии</option>
        {LINE_COLOR_COLLECTION.map((type) => {
          return (
            <option value={type.VALUE} key={type.VALUE}>
              {type.LABEL}
            </option>
          );
        })}
      </Form.Select>
      <Button className="mt-3" onClick={onStartDraw}>
        Редактировать линию
      </Button>
    </Form>
  );
}
