import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/shippingPaymentForm.css';

const ShippingPaymentForm = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postal_code: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    card_number: '',
    card_name: '',
    expiry_date: '',
    cvv: ''
  });

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentInfo.expiry_date.length > 5) {
      alert('Expiry date cannot be more than 5 characters');
      return;
    }
    try {
      await orderService.confirmOrderDetails(order_id, shippingInfo, paymentInfo);
      navigate(`/payment-confirmation/${order_id}`);
    } catch (error) {
      console.error('Error confirming order details:', error);
      alert('Failed to confirm order details.');
    }
  };

  return (
    <div className="shipping-payment-form container">
      <h1>Shipping and Payment Information</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <h2>Shipping Information</h2>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City:</label>
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postal_code" className="form-label">Postal Code:</label>
          <input
            type="text"
            name="postal_code"
            className="form-control"
            placeholder="Postal Code"
            value={shippingInfo.postal_code}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            className="form-control"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            required
          />
        </div>
        <h2>Payment Information</h2>
        <div className="mb-3">
          <label htmlFor="card_number" className="form-label">Card Number:</label>
          <input
            type="text"
            name="card_number"
            className="form-control"
            placeholder="Card Number"
            value={paymentInfo.card_number}
            onChange={handlePaymentChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="card_name" className="form-label">Card Name:</label>
          <input
            type="text"
            name="card_name"
            className="form-control"
            placeholder="Card Name"
            value={paymentInfo.card_name}
            onChange={handlePaymentChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiry_date" className="form-label">Expiry Date:</label>
          <input
            type="text"
            name="expiry_date"
            className="form-control"
            placeholder="Expiry Date"
            value={paymentInfo.expiry_date}
            onChange={handlePaymentChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV:</label>
          <input
            type="text"
            name="cvv"
            className="form-control"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Confirm Payment</button>
      </form>
    </div>
  );
};

export default ShippingPaymentForm;
