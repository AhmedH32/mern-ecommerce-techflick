// src/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // Or a placeholder if product data is missing
  }

  // Ensure product.category is correctly formatted for the URL
  // If your categories have spaces or special characters, you might need to slugify them.
  // Assuming formatKey is needed if categories like "smart_watches" are stored
  // and need to be converted to "smart-watches" or similar for URLs.
  // For simplicity, using product.category directly.
  const categorySlug = product.category ? product.category.toLowerCase().replace(/\s+/g, '_') : 'unknown';

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${categorySlug}/${product._id}`} className="text-decoration-none text-dark">
        <img
          src={product.image ? '/' + product.image : 'https://via.placeholder.com/200?text=No+Image'}
          className="card-img-top p-3"
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center mb-2">{product.name}</h5>
          <p className="card-text text-center text-success fw-bold mt-auto">
            {product.currency} {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
      {/* You can add an "Add to Cart" button here if desired */}
    </div>
  );
};

export default ProductCard;