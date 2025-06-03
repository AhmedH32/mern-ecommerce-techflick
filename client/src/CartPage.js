import React, { useState, useEffect } from 'react';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

const CartPage = () => {
  const { cartItems, loadingCart, errorCart, updateCartItemQuantity, removeCartItem, getTotalPrice } = useCart();
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    if (!user && !userLoading) {
      navigate('/signin', { state: { from: '/cart' } });
    }
  }, [user, userLoading, navigate]);

  if (userLoading || loadingCart) {
    return <div className="text-center my-5">Loading cart...</div>;
  }

  if (errorCart) {
    return <div className="alert alert-danger text-center my-5">Error: {errorCart}</div>;
  }

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity(cartItemId, newQuantity);
      setToastMessage('Cart quantity updated successfully!');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Failed to update quantity: ${error.message}`);
      setToastVariant('danger');
      setShowToast(true);
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setToastMessage('Item removed from cart!');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Failed to remove item: ${error.message}`);
      setToastVariant('danger');
      setShowToast(true);
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <p className="lead">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary mt-3">Start Shopping</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              item.product && (
                <div key={item._id} className="card mb-3 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-3 p-3 d-flex align-items-center justify-content-center">
                      <img
                        src={'/' + item.product.image}
                        alt={item.product.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '120px', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/product/${item.product.category}/${item.product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.product.name}
                          </Link>
                        </h5>
                        <p className="card-text text-muted">
                          EGP {item.product.price.toLocaleString()}
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <label htmlFor={`quantity-${item._id}`} className="me-2">Quantity:</label>
                          <input
                            id={`quantity-${item._id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                            className="form-control me-3"
                            style={{ width: '80px' }}
                          />
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="card-text">
                          <strong>Total: EGP {(item.product.price * item.quantity).toLocaleString()}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Order Summary</h4>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map(item => item.product && (
                  <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.product.name} ({item.quantity}x)</span>
                    <span>EGP {(item.product.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <h4 className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span className="text-primary">EGP {getTotalPrice().toLocaleString()}</span>
              </h4>
              <button className="btn btn-success mt-4">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg={toastVariant}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CartPage;