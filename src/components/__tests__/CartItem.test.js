import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartItem from '../components/CartItem';

describe('CartItem Component', () => {
  const mockItem = {
    cart_id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    quantity: 2,
    stock: 10,
    image_url: '/image1.jpg'
  };

  const mockOnUpdateQuantity = jest.fn();
  const mockOnRemove = jest.fn();

  it('renders without crashing', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $100')).toBeInTheDocument();
    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();
  });

  it('updates quantity', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('removes item from cart', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});
