import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductManagement from '../components/ProductManagement';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

// Mock dependencies
jest.mock('../components/AdminHeader', () => () => <div>AdminHeader</div>);
jest.mock('../components/Footer', () => () => <div>Footer</div>);
jest.mock('../components/ProductList', () => ({ onEdit }) => (
  <div>
    <div>ProductList</div>
    <button onClick={() => onEdit({ id: 1, name: 'Test Product' })}>Edit Product</button>
  </div>
));
jest.mock('../components/ProductForm', () => ({ product, onSave, onCancel }) => (
  <div>
    <div>ProductForm</div>
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
));

describe('ProductManagement Component', () => {
  it('renders without crashing', () => {
    render(<ProductManagement />);
    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByText('ProductList')).toBeInTheDocument();
  });

  it('renders ProductForm when adding a new product', () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByText('Add New Product'));
    expect(screen.getByText('ProductForm')).toBeInTheDocument();
  });

  it('renders ProductForm when editing a product', () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByText('Edit Product'));
    expect(screen.getByText('ProductForm')).toBeInTheDocument();
  });

  it('calls onSave when saving a product', () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByText('Add New Product'));
    fireEvent.click(screen.getByText('Save'));
    expect(screen.queryByText('ProductForm')).not.toBeInTheDocument();
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  it('calls onCancel when canceling a product', () => {
    render(<ProductManagement />);
    fireEvent.click(screen.getByText('Add New Product'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('ProductForm')).not.toBeInTheDocument();
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });
});
