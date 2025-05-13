import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";

const FeaturedProducts = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/featured_products");

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="featured-products-container">
      <h2 className="home-title">Featured Products</h2>

      {/* pass data into the carousel */}
      <FeaturedProductsCarousel data={data} />

      {/* grid layout for lg & up */}
      <div className="featured-products d-none d-lg-grid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {data.slice(0, 5).map(product => (
            <div className="col" key={product.id}>
              <Link to={`/product/${product.category}/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="card product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h4>
                      {product.name.length > 25
                        ? product.name.substring(0, 25) + "..."
                        : product.name}
                    </h4>
                    <p className="product-price">EGP {product.price}</p>
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
