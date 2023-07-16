import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { MARKER_TYPE_COLLECTION } from "Shared/constants/common";

export default function MarkerForm({
  id,
  isShown,
  title,
  description,
  markerType,
  onClose,
  onTextFieldChange,
}) {
  return (
    <Offcanvas show={isShown} placement="end" onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={onTextFieldChange}
              placeholder="Title"
              id={id}
              name="title"
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
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
            id={id}
          >
            <option disabled>Open this select menu</option>
            {MARKER_TYPE_COLLECTION.map((type) => {
              return (
                <option value={type.VALUE} key={type.VALUE}>
                  {type.LABEL}
                </option>
              );
            })}
          </Form.Select>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
