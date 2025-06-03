// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [errorCart, setErrorCart] = useState(null);

  const BASE_URL = 'http://localhost:5000/api/cart';

  const fetchCartItems = async (userId) => {
    if (!userId) {
      setCartItems([]);
      setLoadingCart(false);
      return;
    }

    setLoadingCart(true);
    setErrorCart(null);
    try {
      const response = await fetch(`${BASE_URL}/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch cart items.');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setErrorCart(error.message);
      setCartItems([]);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchCartItems(user.id);
    } else {
      setCartItems([]);
      setLoadingCart(false);
    }
  }, [user]);

  // Modified addToCart: Removed 'category' as an argument and from the request body
  const addToCart = async (productId, quantity = 1) => {
    if (!user || !user.id) throw new Error('User not authenticated.');

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Only sending userId, productId, and quantity
        body: JSON.stringify({ userId: user.id, productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart.');
      }

      // Re-fetch cart items to ensure the state is up-to-date with the backend
      await fetchCartItems(user.id);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (!user || !user.id) throw new Error('User not authenticated.');

    try {
      const response = await fetch(`${BASE_URL}/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, quantity: newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart item quantity.');
      }

      await fetchCartItems(user.id);
      return { success: true };
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  };

  const removeCartItem = async (cartItemId) => {
    if (!user || !user.id) throw new Error('User not authenticated.');

    try {
      const response = await fetch(`${BASE_URL}/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove cart item.');
      }

      await fetchCartItems(user.id);
      return { success: true };
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product ? item.product.price * item.quantity : 0), 0);
  };

  const contextValue = {
    cartItems,
    loadingCart,
    errorCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    getTotalPrice,
    fetchCartItems
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}