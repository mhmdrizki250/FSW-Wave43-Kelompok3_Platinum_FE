import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import cartService from '../services/cartService';
import orderService from '../services/orderService'; // Pastikan import sudah benar
import CartItem from './CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cart.css';

const Cart = ({ user_id }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await cartService.getCart(user_id);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [user_id]);

  const handleUpdateQuantity = async (cart_id, quantity) => {
    try {
      await cartService.updateCart(cart_id, quantity);
      setCartItems(cartItems.map(item => 
        item.cart_id === cart_id ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemove = async (cart_id) => {
    try {
      await cartService.deleteCartItem(cart_id);
      setCartItems(cartItems.filter(item => item.cart_id !== cart_id));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleAddToOrder = async () => {
    try {
      const total_price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const order_items = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));
      await orderService.createOrder({ user_id, total_price, order_items });
      await cartService.clearCart(user_id);
      setCartItems([]);
      alert('Order created successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  return (
    <>
    <UserHeader />
    <div className="cart-container container">
      <h1>Cart</h1>
      <ul className="list-group">
        {cartItems.map(item => (
          <CartItem key={item.cart_id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
        ))}
      </ul>
      {cartItems.length > 0 && <button className="btn btn-primary" onClick={handleAddToOrder}>Add to Order</button>}
    </div>
    </>
  );
};

export default Cart;
