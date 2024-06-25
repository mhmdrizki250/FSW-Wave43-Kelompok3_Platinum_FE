import axios from 'axios';

const API_URL = 'http://localhost:4040/api';

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getOrders = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/orders/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const confirmOrder = async (order_id) => {
  try {
    const response = await axios.post(`${API_URL}/orders/${order_id}/confirm`);
    return response.data;
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error;
  }
};

const confirmOrderDetails = async (order_id, shippingInfo, paymentInfo) => {
  try {
    const response = await axios.post(`${API_URL}/orders/${order_id}/confirm`, {
      shippingInfo,
      paymentInfo,
    });
    return response.data;
  } catch (error) {
    console.error('Error confirming order details:', error);
    throw error;
  }
};

const getOrderConfirmation = async (order_id) => {
  try {
    const response = await axios.get(`${API_URL}/order-confirmation/${order_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order confirmation:', error);
    throw error;
  }
};

const deleteOrder = async (order_id) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/${order_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

const downloadReceiptPDF = async (order_id) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${order_id}/receipt`, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error('Error downloading receipt PDF:', error);
    throw error;
  }
};

const orderService = {
  createOrder,
  getOrders,
  confirmOrder,
  confirmOrderDetails,
  getOrderConfirmation,
  deleteOrder,
  downloadReceiptPDF
};

export default orderService;
