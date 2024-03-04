import { Row, Col, Container, Image } from "react-bootstrap";

export default function CarouselSliderItems() {
  return (
    <Container>
      <Row>
        <Image style={{maxHeight: "350px", zIndex: "-1 !important", marginTop :"80px"}} src="/www.skillplusplus.com.jpg" />
      </Row>
    </Container>
  );
}
    