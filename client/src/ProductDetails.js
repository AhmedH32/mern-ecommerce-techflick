// src/components/ProductDetails.js
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SpecsTable from './SpecsTable';
import useFetch from './useFetch';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { Toast, ToastContainer } from 'react-bootstrap';

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { data: product, loading, error } = useFetch(
    `http://localhost:5000/api/products/${id}`
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  const { name, price, currency, image, specifications: specs } = product;

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/signin', { state: { from: location } });
      return;
    }
    try {
      // Modified: Only pass product._id (and quantity if needed, default is 1)
      // The 'category' argument is no longer passed as it's not needed by CartContext's addToCart
      await addToCart(product._id);
      setToastMsg('Added to cart successfully!');
    } catch (e) {
      setToastMsg(`Failed to add to cart: ${e.message}`);
    }
    setShowToast(true);
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img
            src={'/' + image}
            alt={name}
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
        <div className="col-12 col-md-7">
          <h2 className="mb-2">{name}</h2>
          <h4 className="text-success mb-3">{currency} {price}</h4>
          <p className="text-muted small">Category: {formatKey(category)}</p>
          <h5 className="mt-4">Specifications</h5>
          <SpecsTable specs={specs} />

          <div className="mt-4">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              {user ? 'Add to Cart' : 'Sign In to Add'}
            </button>

            <ToastContainer position="top-end" className="p-3">
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                bg={toastMsg.includes('Failed') ? 'danger' : 'success'}
                autohide
                delay={2000}
              >
                <Toast.Body className="text-white">{toastMsg}</Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export default ProductDetails;