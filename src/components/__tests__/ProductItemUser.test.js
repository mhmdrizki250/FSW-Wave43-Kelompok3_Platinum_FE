import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductItemUser from '../components/ProductItemUser';

const mockProduct = {
  name: 'Product Name',
  description: 'Product Description',
  price: 100000,
  stock: 10,
  image_url: '/path/to/image.jpg'
};

describe('ProductItemUser Component', () => {
  const onAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ProductItemUser product={mockProduct} onAddToCart={onAddToCart} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('Price: Rp100.000,00')).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls onAddToCart when the add to cart button is clicked', () => {
    render(<ProductItemUser product={mockProduct} onAddToCart={onAddToCart} />);
    
    fireEvent.click(screen.getByText(/add to cart/i));
    
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders image if image_url is provided', () => {
    render(<ProductItemUser product={mockProduct} onAddToCart={onAddToCart} />);
    
    const img = screen.getByAltText(mockProduct.name);
    expect(img).toHaveAttribute('src', `http://localhost:4040${mockProduct.image_url}`);
  });

  it('does not render image if image_url is not provided', () => {
    const productWithoutImage = { ...mockProduct, image_url: null };
    render(<ProductItemUser product={productWithoutImage} onAddToCart={onAddToCart} />);
    
    const img = screen.queryByAltText(mockProduct.name);
    expect(img).toBeNull();
  });
});
