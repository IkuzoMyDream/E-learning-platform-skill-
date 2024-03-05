import { Row, Col, Container, Image } from "react-bootstrap";
import { AuthContext } from "../../../utils/auth/Auth.context";
import React, { useContext,} from "react";

export default function CarouselSliderItems() {
  const { state: ContextState, login, logout } = useContext(AuthContext);
  
  return (
    
    <Container>
      <Row>
        <Image
          style={{
            maxHeight: "350px",
            height:"350px",
            zIndex: "-1 !important",
            marginTop: !ContextState.isLoggedIn ? "140px" : "85px"
          }}
          src="/banner0.png" 
          
          />
          
      </Row>
    </Container>
  );
}
