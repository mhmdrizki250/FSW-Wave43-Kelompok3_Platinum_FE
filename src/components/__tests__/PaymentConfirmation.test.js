import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentConfirmation from '../components/PaymentConfirmation';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

const mockConfirmation = {
  order_id: 1,
  status: 'Confirmed',
  confirmed_at: '2024-06-20T12:34:56Z'
};

describe('PaymentConfirmation Component', () => {
  beforeEach(() => {
    orderService.getOrderConfirmation.mockResolvedValue({ data: mockConfirmation });
  });

  it('renders without crashing and displays confirmation details', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/payment-confirmation/:order_id" element={<PaymentConfirmation />} />
        </Routes>
      </Router>
    );

    await waitFor(() => expect(orderService.getOrderConfirmation).toHaveBeenCalled());

    expect(screen.getByText(/payment confirmation/i)).toBeInTheDocument();
    expect(screen.getByText(/order id:/i)).toHaveTextContent(`Order ID: ${mockConfirmation.order_id}`);
    expect(screen.getByText(/status:/i)).toHaveTextContent(`Status: ${mockConfirmation.status}`);
    expect(screen.getByText(/confirmed at:/i)).toHaveTextContent(`Confirmed At: ${mockConfirmation.confirmed_at}`);
  });

  it('handles Go to User Dashboard button click', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/payment-confirmation/:order_id" element={<PaymentConfirmation />} />
          <Route path="/user-dashboard" element={<div>User Dashboard</div>} />
        </Routes>
      </Router>
    );

    await waitFor(() => screen.getByText(/go to user dashboard/i));

    fireEvent.click(screen.getByText(/go to user dashboard/i));

    expect(screen.getByText(/user dashboard/i)).toBeInTheDocument();
  });

  it('handles Download PDF button click', async () => {
    global.window.location.href = jest.fn();

    render(
      <Router>
        <Routes>
          <Route path="/payment-confirmation/:order_id" element={<PaymentConfirmation />} />
        </Routes>
      </Router>
    );

    await waitFor(() => screen.getByText(/download pdf/i));

    fireEvent.click(screen.getByText(/download pdf/i));

    expect(global.window.location.href).toBe(`http://localhost:4040/api/orders/${mockConfirmation.order_id}/receipt-pdf`);
  });
});
