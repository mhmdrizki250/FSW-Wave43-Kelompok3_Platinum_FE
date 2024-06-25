import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../components/Cart';
import cartService from '../services/cartService';
import orderService from '../services/orderService';

jest.mock('../services/cartService');
jest.mock('../services/orderService');

describe('Cart Component', () => {
  const mockCartItems = [
    { cart_id: 1, product_id: 1, name: 'Product 1', description: 'Description 1', price: 100, quantity: 2, image_url: '/image1.jpg' },
    { cart_id: 2, product_id: 2, name: 'Product 2', description: 'Description 2', price: 200, quantity: 1, image_url: '/image2.jpg' },
  ];

  beforeEach(() => {
    cartService.getCart.mockResolvedValue({ data: mockCartItems });
    cartService.updateCart.mockResolvedValue({});
    cartService.deleteCartItem.mockResolvedValue({});
    cartService.clearCart.mockResolvedValue({});
    orderService.createOrder.mockResolvedValue({});
  });

  it('renders without crashing', async () => {
    render(
      <Router>
        <Cart user_id={1} />
      </Router>
    );
    await waitFor(() => expect(screen.getByText('Cart')).toBeInTheDocument());
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('updates quantity of cart item', async () => {
    render(
      <Router>
        <Cart user_id={1} />
      </Router>
    );

    await waitFor(() => screen.getByText('Product 1'));
    const quantityInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(quantityInput, { target: { value: '3' } });

    await waitFor(() => {
      expect(cartService.updateCart).toHaveBeenCalledWith(1, 3);
    });
  });

  it('removes cart item', async () => {
    render(
      <Router>
        <Cart user_id={1} />
      </Router>
    );

    await waitFor(() => screen.getByText('Product 1'));
    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(cartService.deleteCartItem).toHaveBeenCalledWith(1);
    });
  });

  it('adds items to order', async () => {
    render(
      <Router>
        <Cart user_id={1} />
      </Router>
    );

    await waitFor(() => screen.getByText('Product 1'));
    const addToOrderButton = screen.getByText('Add to Order');
    fireEvent.click(addToOrderButton);

    await waitFor(() => {
      expect(orderService.createOrder).toHaveBeenCalledWith({
        user_id: 1,
        total_price: 400,
        order_items: [
          { product_id: 1, quantity: 2, price: 100 },
          { product_id: 2, quantity: 1, price: 200 },
        ],
      });
      expect(cartService.clearCart).toHaveBeenCalledWith(1);
    });
  });
});
