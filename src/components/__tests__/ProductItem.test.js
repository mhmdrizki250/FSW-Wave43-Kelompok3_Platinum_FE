import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductItem from '../components/ProductItem';

const mockProduct = {
  name: 'Product Name',
  description: 'Product Description',
  price: 100000,
  stock: 10,
  image_url: '/path/to/image.jpg'
};

describe('ProductItem Component', () => {
  const onEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ProductItem product={mockProduct} onEdit={onEdit} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('Price: Rp100.000,00')).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(<ProductItem product={mockProduct} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText(/edit/i));
    
    expect(onEdit).toHaveBeenCalledWith(mockProduct);
  });

  it('renders image if image_url is provided', () => {
    render(<ProductItem product={mockProduct} onEdit={onEdit} />);
    
    const img = screen.getByAltText(mockProduct.name);
    expect(img).toHaveAttribute('src', `http://localhost:4040${mockProduct.image_url}`);
  });

  it('does not render image if image_url is not provided', () => {
    const productWithoutImage = { ...mockProduct, image_url: null };
    render(<ProductItem product={productWithoutImage} onEdit={onEdit} />);
    
    const img = screen.queryByAltText(mockProduct.name);
    expect(img).toBeNull();
  });
});
