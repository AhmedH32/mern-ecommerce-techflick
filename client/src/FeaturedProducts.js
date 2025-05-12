import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch"; // Importing the custom hook

const FeaturedProducts = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/featured_products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="featured-products-container">
      {/* Featured Products Heading */}
      <h2 className="featured-title">Featured Products</h2>

      {data && 
      <div id="featuredProductsCarousel" className="carousel slide d-md-none" data-bs-ride="carousel">
        <div className="carousel-inner">
          {data && data.length > 0 && data.slice(0, 5).map((product, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={product.id}>
              <Link to={`/product/${product.category}/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h4>{product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name}</h4>
                    <p className="product-price">{`EGP ${product.price}`}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#featuredProductsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#featuredProductsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
}
      {/* For larger screens (lg and up), use grid layout */}
      <div className="featured-products d-none d-lg-grid">
        {/* Apply Bootstrap grid classes for larger screens */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {data && data.length > 0 && data.slice(0, 5).map((product) => (
            <div className="col" key={product.id}>
              <div className="product-card">
                <Link to={`/product/${product.category}/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <h4>{product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name}</h4>
                      <p className="product-price">{`EGP ${product.price}`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
