import Offcanvas from "react-bootstrap/Offcanvas";

export default function OffCanvas({
  isShown,
  title,
  onClose,
  children,
}) {
  return (
    <Offcanvas show={isShown} placement="end" onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
