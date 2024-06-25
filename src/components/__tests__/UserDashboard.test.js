import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDashboard from '../components/UserDashboard';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../components/UserHeader', () => () => <div>Mocked UserHeader</div>);
jest.mock('../components/Footer', () => () => <div>Mocked Footer</div>);

describe('UserDashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Mocked UserHeader')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });

  it('displays the main header and container', () => {
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    const headerElement = screen.getByText('User Dashboard');
    expect(headerElement).toBeInTheDocument();

    const containerElement = screen.getByRole('main');
    expect(containerElement).toHaveClass('container mt-5');
  });

  it('renders content area correctly', () => {
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    const contentElement = screen.getByText('User Dashboard').nextElementSibling;
    expect(contentElement).toHaveClass('content');
  });
});
