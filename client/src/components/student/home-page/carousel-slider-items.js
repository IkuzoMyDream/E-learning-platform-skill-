import { Row, Col, Container, Image } from "react-bootstrap";
import { AuthContext } from "../../../utils/auth/Auth.context";
import React, { useContext, useState } from "react";

export default function CarouselSliderItems() {
  const { state: ContextState, login, logout } = useContext(AuthContext);

  return (
    
    <Container>
      <Row>
        <Image
          style={{
            maxHeight: "350px",
            zIndex: "-1 !important",
            marginTop: !ContextState.isLoggedIn ? "135px" : "80px"
          }}
          src="/www.skillplusplus.com.jpg" />
      </Row>
    </Container>
  );
}
