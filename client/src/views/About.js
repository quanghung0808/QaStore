import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button
          variant="primary"
          href="https://quanghung0808.github.io/quanghung.github.io/"
          size="lg"
        >
          Visit my channel for more tutorials
        </Button>
      </Col>
    </Row>
  );
};

export default About;
