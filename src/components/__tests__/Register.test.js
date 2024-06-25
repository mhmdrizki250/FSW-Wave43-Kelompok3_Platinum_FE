import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../components/Register';
import userService from '../services/userService';

// Mock userService
jest.mock('../services/userService');

describe('Register Component', () => {
  it('renders without crashing', () => {
    render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('allows user to fill out the form', () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByDisplayValue('user'), {
      target: { value: 'admin' }
    });

    expect(screen.getByPlaceholderText('Username')).toHaveValue('testuser');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');
    expect(screen.getByDisplayValue('admin')).toBeInTheDocument();
  });

  it('shows success message on successful registration', async () => {
    userService.register.mockResolvedValueOnce({});

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.click(screen.getByText('Register'));

    await screen.findByText('User registered successfully!');
    expect(screen.getByText('User registered successfully!')).toBeInTheDocument();
  });

  it('shows error message on failed registration', async () => {
    userService.register.mockRejectedValueOnce({
      response: {
        data: { error: 'Error registering user' }
      }
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });

    fireEvent.click(screen.getByText('Register'));

    await screen.findByText('Error registering user');
    expect(screen.getByText('Error registering user')).toBeInTheDocument();
  });
});
