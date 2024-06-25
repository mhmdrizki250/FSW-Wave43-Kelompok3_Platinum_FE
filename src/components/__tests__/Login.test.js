import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import useLogin from '../hooks/useLogin';

// Mock the useLogin hook
jest.mock('../hooks/useLogin');

describe('Login Component', () => {
  beforeEach(() => {
    useLogin.mockReturnValue({
      error: null,
      loading: false,
      loginUser: jest.fn(),
    });
  });

  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles user input and form submission with specific values', async () => {
    const loginUser = jest.fn().mockResolvedValue({});
    useLogin.mockReturnValue({
      error: null,
      loading: false,
      loginUser,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Mengisi nilai form dengan "user1" untuk Username dan Password
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'user1' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({ username: 'user1', password: 'user1' });
    });
  });

  it('displays an error message on login failure', async () => {
    const errorMessage = 'Error logging in';
    useLogin.mockReturnValue({
      error: errorMessage,
      loading: false,
      loginUser: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Mengisi nilai form dengan "user1" untuk Username dan Password
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'user1' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
