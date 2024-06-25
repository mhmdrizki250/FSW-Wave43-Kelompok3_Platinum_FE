import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from '../components/ProductList';
import productService from '../services/productService';

jest.mock('../services/productService');

const mockProducts = [
  {
    product_id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100000,
    stock: 10,
    image_url: '/path/to/image1.jpg',
  },
  {
    product_id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 200000,
    stock: 20,
    image_url: '/path/to/image2.jpg',
  },
  {
    product_id: 3,
    name: 'Product 3',
    description: 'Description 3',
    price: 300000,
    stock: 30,
    image_url: '/path/to/image3.jpg',
  },
];

describe('ProductList Component', () => {
  const onEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and displays products', async () => {
    productService.getProducts.mockResolvedValue({ data: mockProducts });

    render(<ProductList onEdit={onEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });
  });

  it('calls onEdit when the edit button is clicked', async () => {
    productService.getProducts.mockResolvedValue({ data: mockProducts });

    render(<ProductList onEdit={onEdit} />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText('Edit');
    editButtons.forEach((button, index) => {
      button.click();
      expect(onEdit).toHaveBeenCalledWith(mockProducts[index]);
    });
  });

  it('displays an error message if fetching products fails', async () => {
    productService.getProducts.mockRejectedValue(new Error('Error fetching products'));

    console.error = jest.fn(); // Mock console.error to suppress error messages in the test output

    render(<ProductList onEdit={onEdit} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
    });

    console.error.mockRestore();
  });
});
