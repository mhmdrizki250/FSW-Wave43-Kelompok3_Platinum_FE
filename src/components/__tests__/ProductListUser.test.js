import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductListUser from '../components/ProductListUser';
import productService from '../services/productService';
import cartService from '../services/cartService';

jest.mock('../services/productService');
jest.mock('../services/cartService');

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

describe('ProductListUser Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and displays products', async () => {
    productService.getProducts.mockResolvedValue({ data: mockProducts });

    render(<ProductListUser />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });
  });

  it('calls handleAddToCart when the add to cart button is clicked', async () => {
    productService.getProducts.mockResolvedValue({ data: mockProducts });
    cartService.addToCart.mockResolvedValue({});

    render(<ProductListUser />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const addToCartButtons = screen.getAllByText('Add to Cart');
    addToCartButtons.forEach((button, index) => {
      button.click();
      expect(cartService.addToCart).toHaveBeenCalledWith(1, mockProducts[index].product_id, 1);
    });
  });

  it('displays an error message if fetching products fails', async () => {
    productService.getProducts.mockRejectedValue(new Error('Error fetching products'));

    console.error = jest.fn(); // Mock console.error to suppress error messages in the test output

    render(<ProductListUser />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
    });

    console.error.mockRestore();
  });
});
