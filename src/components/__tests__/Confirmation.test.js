import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Confirmation from '../components/Confirmation';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

describe('Confirmation Component', () => {
  const mockConfirmationData = {
    order_id: '123',
    confirmation_status: 'Confirmed',
    confirmed_at: '2024-06-30T12:34:56Z'
  };

  beforeEach(() => {
    orderService.getOrderConfirmation.mockResolvedValue({ data: mockConfirmationData });
  });

  it('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/confirmation/:order_id" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Order ID: 123')).toBeInTheDocument();
      expect(screen.getByText('Status: Confirmed')).toBeInTheDocument();
      expect(screen.getByText('Confirmed At: 2024-06-30T12:34:56Z')).toBeInTheDocument();
    });
  });

  it('navigates to user dashboard on button click', async () => {
    const navigateMock = jest.fn();
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/confirmation/:order_id" element={<Confirmation />} />
          <Route path="/user-dashboard" element={<div>User Dashboard</div>} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
    });

    const button = screen.getByText('Go to User Dashboard');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });
  });
});
