import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productManagement.css';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsAdding(true);
  };

  const handleSave = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  return (
    <div className="product-management container">
      <AdminHeader />
      <main>
        <h1 className="text-center">Product Management</h1>
        {isAdding || editingProduct ? (
          <ProductForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <>
            <button className="btn btn-primary" onClick={handleAdd}>Add New Product</button>
            <ProductList onEdit={handleEdit} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductManagement;
