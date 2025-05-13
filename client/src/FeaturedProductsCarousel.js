import React from 'react'
import { Carousel, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'  // assume all your CSS lives here

const FeaturedProductsCarousel = ({ data }) => {
  if (!data || data.length === 0) return null

  return (
    <Carousel
      indicators={false}
      className="d-block d-lg-none featured-carousel"
    >
      {data.slice(0, 5).map((prod) => (
        <Carousel.Item key={prod.id}>
          <Link to={`/product/${prod.category}/${prod.id}`} className="text-decoration-none">
            <Card className="product-card-carousel h-100">
              <div className="text-center pt-3">
                <i className="bi bi-star-fill primary-icon"></i>
              </div>
              <Card.Img
                variant="top"
                src={prod.image}
                alt={prod.name}
                className="product-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h4" className="text-center mb-1">
                  {prod.name.length > 25
                    ? `${prod.name.slice(0,25)}…`
                    : prod.name}
                </Card.Title>
                <hr className="title-separator" />
                <div className="mt-auto text-center product-price">
                  EGP {prod.price}
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default FeaturedProductsCarousel
