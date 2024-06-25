import axios from 'axios';

const API_URL = 'http://localhost:4040/api/products';

const getProducts = () => {
  return axios.get(API_URL);
};

const createProduct = (product) => {
  return axios.post(API_URL, product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const updateProduct = (productId, product) => {
  return axios.put(`${API_URL}/${productId}`, product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}/${productId}`);
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productService;
