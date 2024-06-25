import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';

jest.mock('../services/productService');

const mockProduct = {
  product_id: 1,
  name: 'Product Name',
  description: 'Product Description',
  price: 100,
  stock: 10
};

describe('ProductForm Component', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ProductForm product={mockProduct} onSave={onSave} onCancel={onCancel} />);
    expect(screen.getByLabelText(/name:/i)).toHaveValue(mockProduct.name);
    expect(screen.getByLabelText(/description:/i)).toHaveValue(mockProduct.description);
    expect(screen.getByLabelText(/price:/i)).toHaveValue(mockProduct.price);
    expect(screen.getByLabelText(/stock:/i)).toHaveValue(mockProduct.stock);
  });

  it('calls onSave when the form is submitted', async () => {
    productService.updateProduct.mockResolvedValue({});
    
    render(<ProductForm product={mockProduct} onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText(/save/i));
    
    await waitFor(() => expect(onSave).toHaveBeenCalled());
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<ProductForm product={mockProduct} onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText(/cancel/i));
    
    expect(onCancel).toHaveBeenCalled();
  });

  it('creates a new product when no product prop is provided', async () => {
    productService.createProduct.mockResolvedValue({});
    
    render(<ProductForm onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText(/description:/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/price:/i), { target: { value: 200 } });
    fireEvent.change(screen.getByLabelText(/stock:/i), { target: { value: 20 } });
    
    fireEvent.click(screen.getByText(/save/i));
    
    await waitFor(() => expect(productService.createProduct).toHaveBeenCalled());
    expect(onSave).toHaveBeenCalled();
  });
});
