import React from 'react';

const ProductItem = ({ product, onEdit }) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="product-item">
      <h3 className="h5">{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {formatRupiah(product.price)}</p>
      <p>Stock: {product.stock}</p>
      {product.image_url && <img src={`http://localhost:4040${product.image_url}`} alt={product.name} />}
      <button className="btn btn-primary" onClick={() => onEdit(product)}>Edit</button>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default ProductItem;
