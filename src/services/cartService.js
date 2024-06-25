import axios from 'axios';

const API_URL = 'http://localhost:4040/api/cart';

const addToCart = (user_id, product_id, quantity) => {
  return axios.post(API_URL, { user_id, product_id, quantity });
};

const getCart = (user_id) => {
  return axios.get(`${API_URL}/${user_id}`);
};

const updateCart = (cart_id, quantity) => {
  return axios.put(`${API_URL}/${cart_id}`, { quantity });
};

const deleteCartItem = (cart_id) => {
  return axios.delete(`${API_URL}/${cart_id}`);
};

const clearCart = (user_id) => {
  return axios.delete(`${API_URL}/user/${user_id}`);
};

const cartService = {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
  clearCart
};

export default cartService;
