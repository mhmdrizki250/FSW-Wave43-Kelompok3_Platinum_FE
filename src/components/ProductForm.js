import React, { useState } from 'react';
import productService from '../services/productService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [stock, setStock] = useState(product ? product.stock : '');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (product) {
        await productService.updateProduct(product.product_id, formData);
      } else {
        await productService.createProduct(formData);
      }
      onSave();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Price:</label>
        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Stock:</label>
        <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Image:</label>
        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProductForm;
