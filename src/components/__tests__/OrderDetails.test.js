import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

const mockOrderDetails = [
  { order_detail_id: 1, product_id: 101, quantity: 2, price: 50 },
  { order_detail_id: 2, product_id: 102, quantity: 1, price: 100 }
];

const mockOrderConfirmation = {
  confirmation_status: 'Confirmed',
  confirmed_at: '2024-06-22T10:00:00Z'
};

describe('OrderDetails Component', () => {
  beforeEach(() => {
    orderService.getOrderDetails.mockResolvedValue({ data: mockOrderDetails });
    orderService.getOrderConfirmation.mockResolvedValue({ data: mockOrderConfirmation });
  });

  it('renders without crashing and displays order details and confirmation', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/order-details/:order_id" element={<OrderDetails />} />
        </Routes>
      </Router>,
      { route: '/order-details/123' } // Mocking the route with order_id 123
    );

    await waitFor(() => expect(orderService.getOrderDetails).toHaveBeenCalledWith('123'));
    await waitFor(() => expect(orderService.getOrderConfirmation).toHaveBeenCalledWith('123'));

    expect(screen.getByText(/order details/i)).toBeInTheDocument();
    expect(screen.getByText(/order confirmation/i)).toBeInTheDocument();
    expect(screen.getByText(/status: confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmed at:/i)).toBeInTheDocument();

    mockOrderDetails.forEach(detail => {
      expect(screen.getByText(new RegExp(`product id: ${detail.product_id}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`quantity: ${detail.quantity}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`price: \\$${detail.price}`, 'i'))).toBeInTheDocument();
    });
  });
});
