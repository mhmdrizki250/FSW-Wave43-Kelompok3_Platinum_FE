import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/paymentConfirmation.css';

const PaymentConfirmation = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const response = await orderService.getOrderConfirmation(order_id);
        setConfirmation(response);
      } catch (error) {
        console.error('Error fetching order confirmation:', error);
      }
    };

    fetchConfirmation();
  }, [order_id]);

  const handleDownloadPDF = () => {
    window.location.href = `http://localhost:4040/api/orders/${order_id}/receipt-pdf`;
  };

  if (!confirmation) {
    return <p>Loading...</p>;
  }

  return (
    <div className="payment-confirmation-container container">
      <h1 className="payment-confirmation-header text-center">Payment Confirmation</h1>
      <div className="payment-confirmation-details">
        <p><strong>Order ID:</strong> {confirmation.order_id}</p>
        <p><strong>Status:</strong> {confirmation.status}</p>
        <p><strong>Confirmed At:</strong> {confirmation.confirmed_at}</p>
      </div>
      <div className="payment-confirmation-buttons">
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/user-dashboard')}
        >
          Go to User Dashboard
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
