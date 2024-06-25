import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ShippingPaymentForm from '../components/ShippingPaymentForm';
import orderService from '../services/orderService';

jest.mock('../services/orderService');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ order_id: '123' }),
}));

describe('ShippingPaymentForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <ShippingPaymentForm />
      </Router>
    );

    expect(screen.getByText('Shipping and Payment Information')).toBeInTheDocument();
  });

  it('allows input changes', () => {
    render(
      <Router>
        <ShippingPaymentForm />
      </Router>
    );

    const addressInput = screen.getByPlaceholderText('Address');
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    expect(addressInput.value).toBe('123 Main St');

    const cityInput = screen.getByPlaceholderText('City');
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    expect(cityInput.value).toBe('New York');

    const postalCodeInput = screen.getByPlaceholderText('Postal Code');
    fireEvent.change(postalCodeInput, { target: { value: '10001' } });
    expect(postalCodeInput.value).toBe('10001');

    const countryInput = screen.getByPlaceholderText('Country');
    fireEvent.change(countryInput, { target: { value: 'USA' } });
    expect(countryInput.value).toBe('USA');

    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });
    expect(cardNumberInput.value).toBe('4111111111111111');

    const cardNameInput = screen.getByPlaceholderText('Card Name');
    fireEvent.change(cardNameInput, { target: { value: 'John Doe' } });
    expect(cardNameInput.value).toBe('John Doe');

    const expiryDateInput = screen.getByPlaceholderText('Expiry Date');
    fireEvent.change(expiryDateInput, { target: { value: '12/25' } });
    expect(expiryDateInput.value).toBe('12/25');

    const cvvInput = screen.getByPlaceholderText('CVV');
    fireEvent.change(cvvInput, { target: { value: '123' } });
    expect(cvvInput.value).toBe('123');
  });

  it('submits the form successfully', async () => {
    orderService.confirmOrderDetails.mockResolvedValue({});
    
    render(
      <Router>
        <ShippingPaymentForm />
      </Router>
    );

    const addressInput = screen.getByPlaceholderText('Address');
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    const cityInput = screen.getByPlaceholderText('City');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    const postalCodeInput = screen.getByPlaceholderText('Postal Code');
    fireEvent.change(postalCodeInput, { target: { value: '10001' } });

    const countryInput = screen.getByPlaceholderText('Country');
    fireEvent.change(countryInput, { target: { value: 'USA' } });

    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    const cardNameInput = screen.getByPlaceholderText('Card Name');
    fireEvent.change(cardNameInput, { target: { value: 'John Doe' } });

    const expiryDateInput = screen.getByPlaceholderText('Expiry Date');
    fireEvent.change(expiryDateInput, { target: { value: '12/25' } });

    const cvvInput = screen.getByPlaceholderText('CVV');
    fireEvent.change(cvvInput, { target: { value: '123' } });

    const submitButton = screen.getByText('Confirm Payment');
    fireEvent.click(submitButton);

    expect(orderService.confirmOrderDetails).toHaveBeenCalledWith(
      '123',
      {
        address: '123 Main St',
        city: 'New York',
        postal_code: '10001',
        country: 'USA',
      },
      {
        card_number: '4111111111111111',
        card_name: 'John Doe',
        expiry_date: '12/25',
        cvv: '123',
      }
    );
    expect(mockNavigate).toHaveBeenCalledWith('/payment-confirmation/123');
  });

  it('shows an error message if form submission fails', async () => {
    orderService.confirmOrderDetails.mockRejectedValue(new Error('Failed to confirm order details'));
    
    render(
      <Router>
        <ShippingPaymentForm />
      </Router>
    );

    const addressInput = screen.getByPlaceholderText('Address');
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    const cityInput = screen.getByPlaceholderText('City');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    const postalCodeInput = screen.getByPlaceholderText('Postal Code');
    fireEvent.change(postalCodeInput, { target: { value: '10001' } });

    const countryInput = screen.getByPlaceholderText('Country');
    fireEvent.change(countryInput, { target: { value: 'USA' } });

    const cardNumberInput = screen.getByPlaceholderText('Card Number');
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    const cardNameInput = screen.getByPlaceholderText('Card Name');
    fireEvent.change(cardNameInput, { target: { value: 'John Doe' } });

    const expiryDateInput = screen.getByPlaceholderText('Expiry Date');
    fireEvent.change(expiryDateInput, { target: { value: '12/25' } });

    const cvvInput = screen.getByPlaceholderText('CVV');
    fireEvent.change(cvvInput, { target: { value: '123' } });

    const submitButton = screen.getByText('Confirm Payment');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to confirm order details')).toBeInTheDocument();
    });
  });
});
