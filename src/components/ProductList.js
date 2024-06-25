import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productList.css';
import productService from '../services/productService';
import ProductItem from './ProductItem';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div key={product.product_id} className="col-md-4">
            <ProductItem product={product} onEdit={onEdit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
