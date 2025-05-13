import React from 'react'
import { Carousel, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css' 

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
              <Card.Img
                variant="top"
                src={prod.image}
                alt={prod.name}
                className="product-image p-3"
                style={{
                  maxHeight: "200px",
                  width: "auto",
                  objectFit: "contain"
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h4" className="mb-2">
                  {prod.name.length > 40
                    ? `${prod.name.slice(0,40)}…`
                    : prod.name}
                </Card.Title>
                
                {/* Add empty div for spacing */}
                <div className="flex-grow-1"></div>

                {/* Price and rating section */}
                <div className="price-rating mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="product-price fw-bold">
                      EGP {prod.price.toLocaleString()}
                    </span>
                    <span className="rating badge bg-primary">
                      ⭐ {prod.rating}
                    </span>
                  </div>
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
