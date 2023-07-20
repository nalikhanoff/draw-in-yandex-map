import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  LINE_COLOR_COLLECTION,
  MARKER_TYPE_COLLECTION,
  MAP_ELEMENT,
} from "Shared/constants/common";

export default function PolygonForm({
  id,
  title,
  description,
  color,
  markerType,
  onTextFieldChange,
  onStartDraw,
  elementType,
}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Название</Form.Label>
        <Form.Control
          onChange={onTextFieldChange}
          placeholder="Название устройства"
          id={id}
          name="title"
          value={title}
          data-element-type={elementType}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          onChange={onTextFieldChange}
          as="textarea"
          rows={3}
          id={id}
          name="description"
          value={description}
          data-element-type={elementType}
        />
      </Form.Group>
      {elementType !== MAP_ELEMENT.PLACEMARK.VALUE ? (
        <>
          <Form.Select
            onChange={onTextFieldChange}
            name="color"
            value={color}
            placeholder="Цвет"
            id={id}
            data-element-type={elementType}
          >
            <option disabled>Выберите цвет</option>
            {LINE_COLOR_COLLECTION.map((type) => {
              return (
                <option value={type.VALUE} key={type.VALUE}>
                  {type.LABEL}
                </option>
              );
            })}
          </Form.Select>
          <Button className="mt-3" onClick={onStartDraw}>
            Редактировать
          </Button>
        </>
      ) : (
        <Form.Select
          onChange={onTextFieldChange}
          name="markerType"
          value={markerType}
          placeholder="Тип"
          id={id}
          data-element-type={MAP_ELEMENT.PLACEMARK.VALUE}
        >
          <option disabled>Выберите тип</option>
          {MARKER_TYPE_COLLECTION.map((type) => {
            return (
              <option value={type.VALUE} key={type.VALUE}>
                {type.LABEL}
              </option>
            );
          })}
        </Form.Select>
      )}
    </Form>
  );
}
