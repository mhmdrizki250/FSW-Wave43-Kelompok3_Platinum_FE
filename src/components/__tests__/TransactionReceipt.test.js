import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import TransactionReceipt from '../components/TransactionReceipt';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    order_id: '123',
  }),
}));

describe('TransactionReceipt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <TransactionReceipt />
      </Router>
    );

    expect(screen.getByText('Transaction Receipt')).toBeInTheDocument();
  });

  it('fetches and displays receipt details', async () => {
    const mockReceipt = {
      order_id: '123',
      total_price: '100',
      order_status: 'Confirmed',
      shippingInfo: {
        address: '123 Main St',
        city: 'New York',
        postal_code: '10001',
        country: 'USA',
      },
      paymentInfo: {
        card_number: '4111111111111111',
        card_name: 'John Doe',
        expiry_date: '12/25',
        cvv: '123',
      },
    };

    orderService.getReceiptDetails.mockResolvedValue(mockReceipt);

    render(
      <Router>
        <TransactionReceipt />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Order ID: 123')).toBeInTheDocument();
      expect(screen.getByText('Total Price: 100')).toBeInTheDocument();
      expect(screen.getByText('Order Status: Confirmed')).toBeInTheDocument();
      expect(screen.getByText('Address: 123 Main St')).toBeInTheDocument();
      expect(screen.getByText('City: New York')).toBeInTheDocument();
      expect(screen.getByText('Postal Code: 10001')).toBeInTheDocument();
      expect(screen.getByText('Country: USA')).toBeInTheDocument();
      expect(screen.getByText('Card Number: 4111111111111111')).toBeInTheDocument();
      expect(screen.getByText('Card Name: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Expiry Date: 12/25')).toBeInTheDocument();
      expect(screen.getByText('CVV: 123')).toBeInTheDocument();
    });
  });

  it('calls the correct URL when Download PDF button is clicked', async () => {
    const mockReceipt = {
      order_id: '123',
      total_price: '100',
      order_status: 'Confirmed',
      shippingInfo: {
        address: '123 Main St',
        city: 'New York',
        postal_code: '10001',
        country: 'USA',
      },
      paymentInfo: {
        card_number: '4111111111111111',
        card_name: 'John Doe',
        expiry_date: '12/25',
        cvv: '123',
      },
    };

    orderService.getReceiptDetails.mockResolvedValue(mockReceipt);

    render(
      <Router>
        <TransactionReceipt />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
    });

    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    });

    screen.getByText('Download PDF').click();
    expect(window.location.href).toBe('http://localhost:4040/api/orders/123/receipt-pdf');
  });

  it('shows an error message if fetching receipt details fails', async () => {
    orderService.getReceiptDetails.mockRejectedValue(new Error('Failed to fetch receipt details'));

    render(
      <Router>
        <TransactionReceipt />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching receipt details:')).toBeInTheDocument();
    });
  });
});
