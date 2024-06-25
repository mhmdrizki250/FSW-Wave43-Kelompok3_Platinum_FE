import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import UserHeader from '../components/UserHeader';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('UserHeader Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <UserHeader />
      </Router>
    );

    expect(screen.getByText('MyApp')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('navigates to the correct links', () => {
    render(
      <Router>
        <UserHeader />
      </Router>
    );

    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/user-dashboard');
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
    expect(screen.getByText('Cart').closest('a')).toHaveAttribute('href', '/cart');
    expect(screen.getByText('Orders').closest('a')).toHaveAttribute('href', '/orders');
  });

  it('calls handleLogout on logout button click', () => {
    const mockedNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockedNavigate);

    render(
      <Router>
        <UserHeader />
      </Router>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
