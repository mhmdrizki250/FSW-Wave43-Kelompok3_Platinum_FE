import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderDetails.css';

const OrderDetails = () => {
  const { order_id } = useParams();
  const [details, setDetails] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsResponse = await orderService.getOrderDetails(order_id);
        setDetails(detailsResponse.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const fetchConfirmation = async () => {
      try {
        const confirmationResponse = await orderService.getOrderConfirmation(order_id);
        setConfirmation(confirmationResponse.data);
      } catch (error) {
        console.error('Error fetching order confirmation:', error);
      }
    };

    fetchDetails();
    fetchConfirmation();
  }, [order_id]);

  return (
    <div className="order-details-container container">
      <h1 className="text-center mb-4">Order Details</h1>
      {confirmation && (
        <div className="order-confirmation mb-4">
          <h2>Order Confirmation</h2>
          <p>Status: {confirmation.confirmation_status}</p>
          <p>Confirmed At: {confirmation.confirmed_at}</p>
        </div>
      )}
      <h2 className="mb-3">Order Items</h2>
      <ul className="order-items list-group">
        {details.map(detail => (
          <li key={detail.order_detail_id} className="order-item list-group-item">
            Product ID: {detail.product_id} - Quantity: {detail.quantity} - Price: ${detail.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
