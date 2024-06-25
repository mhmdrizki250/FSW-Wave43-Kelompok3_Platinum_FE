import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from '../components/Orders';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

const mockOrders = [
  { order_id: 1, total_price: 150, order_status: 'Pending' },
  { order_id: 2, total_price: 200, order_status: 'Confirmed' }
];

describe('Orders Component', () => {
  beforeEach(() => {
    orderService.getOrders.mockResolvedValue({ data: mockOrders });
  });

  it('renders without crashing and displays orders', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Orders user_id={1} />} />
        </Routes>
      </Router>
    );

    await waitFor(() => expect(orderService.getOrders).toHaveBeenCalledWith(1));

    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    mockOrders.forEach(order => {
      expect(screen.getByText(new RegExp(`order #${order.order_id}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`\\$${order.total_price}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${order.order_status}`, 'i'))).toBeInTheDocument();
    });
  });

  it('handles confirm payment button click', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Orders user_id={1} />} />
        </Routes>
      </Router>
    );

    await waitFor(() => screen.getByText(/confirm payment/i));

    fireEvent.click(screen.getByText(/confirm payment/i));

    expect(screen.getByText(/confirm payment/i)).toBeInTheDocument();
  });

  it('handles remove order button click', async () => {
    orderService.deleteOrder.mockResolvedValue({});

    render(
      <Router>
        <Routes>
          <Route path="/" element={<Orders user_id={1} />} />
        </Routes>
      </Router>
    );

    await waitFor(() => screen.getByText(/remove/i));

    fireEvent.click(screen.getAllByText(/remove/i)[0]);

    await waitFor(() => expect(orderService.deleteOrder).toHaveBeenCalledWith(1));
  });
});
