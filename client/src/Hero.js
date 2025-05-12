import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        // gradient from navbar-light (#F8F9FA) → light-blue → logo-blue
        backgroundImage: 'linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 50%, #0D6EFD 100%)',
        minHeight: '60vh',
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Text column */}
          <Col xs={12} md={6} className="py-5 text-dark">
            <h1 className="display-4 fw-bold">
              Flick Into the Future of Tech
            </h1>
            <p className="lead mb-4">
              Discover the latest laptops, smartphones, wearables & more—all powered by your next click.
            </p>
            <Button
              href="/products"
              size="lg"
              style={{
                backgroundColor: '#0D6EFD',
                border: 'none',
              }}
            >
              Shop Now
            </Button>
          </Col>

          {/* Illustration column (optional) */}
          <Col xs={12} md={6} className="text-center">
            <img
              src="/images/hero-gadget.png"
              alt="Featured gadget"
              className="img-fluid"
              style={{ maxHeight: '300px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
