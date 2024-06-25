import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productListUser.css';
import UserHeader from './UserHeader';
import productService from '../services/productService';
import cartService from '../services/cartService';
import ProductItemUser from './ProductItemUser';

const ProductListUser = () => {
  const [products, setProducts] = useState([]);
  const user_id = 1; // Gantilah dengan ID pengguna yang sesungguhnya

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

  const handleAddToCart = async (product) => {
    try {
      await cartService.addToCart(user_id, product.product_id, 1);
      console.log(`Added ${product.name} to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <>
    <UserHeader />
    <div className="container">
      <h1 className="my-4">Products</h1>
      <div className="row product-list">
        {products.map(product => (
          <div key={product.product_id} className="col-md-4 product-item">
            <ProductItemUser product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductListUser;
