import React, { useState, useEffect } from 'react';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const [detailedItems, setDetailedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/signin', { state: { from: '/cart' } });
      return;
    }

    async function loadDetails() {
      try {
        setLoading(true);
        const promises = cartItems.map(async (item) => {
          const res = await fetch(
            `http://localhost:8000/${item.category}/${item.productId}`
          );
          const product = await res.json();
          return {
            cartId: item.id,
            category: item.category,
            quantity: item.quantity,
            product,
          };
        });
        const results = await Promise.all(promises);
        setDetailedItems(results);
      } catch (e) {
        console.error(e);
        setError('Failed to load cart details');
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [cartItems, user, navigate]);

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error)   return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (detailedItems.length === 0)
    return <p className="m-5 text-center">Your cart is empty.</p>;

  const grandTotal = detailedItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Cart</h2>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {detailedItems.map(({ cartId, product, quantity }) => (
            <tr key={cartId}>
              <td className="d-flex align-items-center">
                <img
                  src={'/' + product.image}
                  alt={product.name}
                  style={{ width: 64, height: 64, objectFit: 'cover' }}
                  className="me-3 rounded"
                />
                <span>{product.name}</span>
              </td>
              <td>EGP {product.price}</td>
              <td>{quantity}</td>
              <td>EGP {product.price * quantity}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(cartId)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td colSpan="2"><strong>EGP {grandTotal}</strong></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default CartPage;
