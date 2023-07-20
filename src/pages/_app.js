import Link from "next/link";
import { useRouter } from "next/router";
import SSRProvider from "react-bootstrap/SSRProvider";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import '../globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <SSRProvider>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Brand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                href="/yandex"
                active={currentPath === "/yandex"}
              >
                Яндекс карты
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/mapbox"
                active={currentPath === "/mapbox"}
              >
                Mapbox карты
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Component {...pageProps} />
      </Container>
    </SSRProvider>
  );
}
