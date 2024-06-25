import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

describe('AdminHeader Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <AdminHeader />
      </Router>
    );
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <Router>
        <AdminHeader />
      </Router>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout', () => {
    // Mock the useNavigate hook
    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate,
    }));

    render(
      <Router>
        <AdminHeader />
      </Router>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });
});
