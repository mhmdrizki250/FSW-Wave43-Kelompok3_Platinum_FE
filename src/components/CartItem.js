import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity); // Set the initial quantity
  }, [item.quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.cart_id, newQuantity);
    }
  };

  return (
    <div className="cart-item row">
      <div className="col-md-3">
        {item.image_url && <img src={`http://localhost:4040${item.image_url}`} alt={item.name} className="img-fluid" />}
      </div>
      <div className="col-md-6">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        <p>Stock: {item.stock}</p>
      </div>
      <div className="col-md-3">
        <p>Quantity:</p>
        <input type="number" value={quantity} onChange={handleQuantityChange} className="form-control" />
        <button className="btn btn-danger mt-2" onClick={() => onRemove(item.cart_id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
