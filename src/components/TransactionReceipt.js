import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/transactionReceipt.css';

const TransactionReceipt = () => {
  const { order_id } = useParams();
  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await orderService.getReceiptDetails(order_id);
        setReceipt(response);
      } catch (error) {
        console.error('Error fetching receipt details:', error);
      }
    };

    fetchReceipt();
  }, [order_id]);

  const handleDownloadPDF = () => {
    window.location.href = `http://localhost:4040/api/orders/${order_id}/receipt-pdf`;
  };

  return (
    <div className="transaction-receipt container">
      <h1>Transaction Receipt</h1>
      <div className="detail-group">
        <p><strong>Order ID:</strong> {receipt.order_id}</p>
        <p><strong>Total Price:</strong> {receipt.total_price}</p>
        <p><strong>Order Status:</strong> {receipt.order_status}</p>
      </div>
      <h2>Shipping Information</h2>
      <div className="detail-group">
        <p><strong>Address:</strong> {receipt.shippingInfo?.address}</p>
        <p><strong>City:</strong> {receipt.shippingInfo?.city}</p>
        <p><strong>Postal Code:</strong> {receipt.shippingInfo?.postal_code}</p>
        <p><strong>Country:</strong> {receipt.shippingInfo?.country}</p>
      </div>
      <h2>Payment Information</h2>
      <div className="detail-group">
        <p><strong>Card Number:</strong> {receipt.paymentInfo?.card_number}</p>
        <p><strong>Card Name:</strong> {receipt.paymentInfo?.card_name}</p>
        <p><strong>Expiry Date:</strong> {receipt.paymentInfo?.expiry_date}</p>
        <p><strong>CVV:</strong> {receipt.paymentInfo?.cvv}</p>
      </div>
      <button className="btn btn-primary" onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default TransactionReceipt;
