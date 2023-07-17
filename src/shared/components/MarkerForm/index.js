import Form from "react-bootstrap/Form";
import { MARKER_TYPE_COLLECTION } from "Shared/constants/common";

export default function MarkerForm({
  id,
  title,
  description,
  markerType,
  onTextFieldChange,
}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Название устройства</Form.Label>
        <Form.Control
          onChange={onTextFieldChange}
          placeholder="Название устройства"
          id={id}
          name="title"
          value={title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Описание устройства</Form.Label>
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
        name="markerType"
        value={markerType}
        placeholder="Тип устройства"
        id={id}
      >
        <option disabled>Выберите тип устройства</option>
        {MARKER_TYPE_COLLECTION.map((type) => {
          return (
            <option value={type.VALUE} key={type.VALUE}>
              {type.LABEL}
            </option>
          );
        })}
      </Form.Select>
    </Form>
  );
}
