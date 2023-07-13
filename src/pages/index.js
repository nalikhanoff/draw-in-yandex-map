import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Тестовая среда для тестов карт</h1>
          <p>
            Здесь вы можете протестировать функционал карт, все данные хранятся
            локально в JSON файле
          </p>
          <Link href="/yandex">
            <Button>Давайте начнем</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
