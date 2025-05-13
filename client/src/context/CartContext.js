// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load this user's cart on sign‑in or when user changes
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    fetch(`http://localhost:8000/cart?userId=${user.id}`)
      .then(res => res.json())
      .then(setCartItems)
      .catch(console.error);
  }, [user]);

  const addToCart = async (category, productId, quantity = 1) => {
    if (!user) throw new Error('Not signed in');

    // Check if already in cart
    const existing = cartItems.find(
      item => item.category === category && item.productId === productId
    );

    if (existing) {
      // update quantity
      const res = await fetch(`http://localhost:8000/cart/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: existing.quantity + quantity })
      });
      const updated = await res.json();
      setCartItems(items =>
        items.map(i => (i.id === updated.id ? updated : i))
      );
      return updated;
    } else {
      // create new
      const res = await fetch(`http://localhost:8000/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          category,
          productId,
          quantity
        })
      });
      const created = await res.json();
      setCartItems(items => [...items, created]);
      return created;
    }
  };

  const removeFromCart = async (cartId) => {
    await fetch(`http://localhost:8000/cart/${cartId}`, {
      method: 'DELETE'
    });
    setCartItems(items => items.filter(i => i.id !== cartId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
