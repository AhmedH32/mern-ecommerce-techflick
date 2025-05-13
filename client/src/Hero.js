import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        backgroundImage: 'linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 50%, #0D6EFD 100%)',
      }}
    >
      <Container className="py-5">
        <Row className="align-items-center">
          
          <Col xs={12} md={6} className="text-dark">
            <h1 className="display-4 fw-bold mb-3">
              Flick Into the Future of Tech
            </h1>
            <p className="lead mb-4">
              Discover the latest laptops, smartphones, wearables & more—all powered by your next click.
            </p>
            <Button
              href="/products"
              size="lg"
              className='button-hero'
            >
              Shop Now
            </Button>
          </Col>

          
          <Col xs={12} md={6} className="text-center d-none d-lg-block">
            <img
              src="/images/hero-gadget.png"
              alt="Featured gadget"
              className="img-fluid"
              style={{ maxHeight: '200px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
