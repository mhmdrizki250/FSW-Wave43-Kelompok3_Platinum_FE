import React from 'react';

const ProductItemUser = ({ product, onAddToCart }) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="card h-100">
      {product.image_url && <img src={`http://localhost:4040${product.image_url}`} className="card-img-top" alt={product.name} />}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">Price: {formatRupiah(product.price)}</p>
        <p className="card-text">Stock: {product.stock}</p>
        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItemUser;
