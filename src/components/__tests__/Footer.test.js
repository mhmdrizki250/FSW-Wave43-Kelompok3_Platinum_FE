import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders without crashing and displays the correct text', () => {
    render(<Footer />);
    const footerText = screen.getByText(/© 2024 Your Company. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });
});
