import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/confirmation.css';

const Confirmation = () => {
  const { order_id } = useParams();
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const response = await orderService.getOrderConfirmation(order_id);
        setConfirmation(response.data);
      } catch (error) {
        console.error('Error fetching order confirmation:', error);
      }
    };

    fetchConfirmation();
  }, [order_id]);

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  if (!confirmation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmation-container container">
      <h1 className="confirmation-header">Order Confirmation</h1>
      <p className="confirmation-detail">Order ID: {confirmation.order_id}</p>
      <p className="confirmation-detail">Status: {confirmation.confirmation_status}</p>
      <p className="confirmation-detail">Confirmed At: {confirmation.confirmed_at}</p>
      <div className="confirmation-button">
        <button className="btn btn-primary" onClick={handleGoToDashboard}>Go to User Dashboard</button>
      </div>
    </div>
  );
};

export default Confirmation;
