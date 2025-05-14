import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";

const FeaturedProducts = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/featured_products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="featured-products-container">
      <h2 className="home-title">Featured Products</h2>

      <FeaturedProductsCarousel data={data} />

      <div className="featured-products d-none d-lg-grid" style={{width: "100%"}}>
        <div className="row ms-1 w-100 mx-0 g-4">
          {data.slice(0, 5).map(product => (
            <div className="col" key={product.id}>
              <Link to={`/product/${product.category}/${product.refId}`} style={{ textDecoration: 'none'}}>
                <div className="card product-card h-100 d-flex flex-column">
                  {/* Image container with fixed minimum height */}
                  <div className="image-container p-3 bg-light d-flex align-items-center justify-content-center"
                    style={{ minHeight: "250px" }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image img-fluid"
                      style={{ 
                        maxHeight: "200px",
                        width: "auto",
                        objectFit: "contain" 
                      }}
                    />
                  </div>
                  
                  {/* Card body with flexible white space */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="product-name mb-2">
                      {product.name.length > 40
                        ? product.name.substring(0, 40) + "..."
                        : product.name}
                    </h5>

                    {/* Expandable white space */}
                    <div className="flex-grow-1"></div>

                    {/* Price section fixed at bottom */}
                    <div className="price-section mt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="product-price fw-bold">
                          EGP {product.price.toLocaleString()}
                        </span>
                        <span className="rating badge bg-primary">
                          ⭐ {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeaturedProducts;
