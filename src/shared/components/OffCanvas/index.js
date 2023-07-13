import Offcanvas from "react-bootstrap/Offcanvas";

export default function ContextMenu({ isShown = false, children, title }) {
  return (
    <Offcanvas show={isShown} placement="end">
      <Offcanvas.Header>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
