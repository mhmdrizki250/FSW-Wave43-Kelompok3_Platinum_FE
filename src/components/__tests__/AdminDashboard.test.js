import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminDashboard from '../components/AdminDashboard';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

// Mock komponen AdminHeader dan Footer
jest.mock('../components/AdminHeader', () => () => <div data-testid="admin-header">AdminHeader</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('AdminDashboard Component', () => {
  it('renders without crashing', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('renders AdminHeader and Footer components', () => {
    render(<AdminDashboard />);
    expect(screen.getByTestId('admin-header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays welcome message for admin', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Welcome, Admin!')).toBeInTheDocument();
  });
});
