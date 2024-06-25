import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.login(credentials.username, credentials.password);
      setUser(response.data);
      setLoading(false);
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (response.data.role === 'user') {
        navigate('/user-dashboard');
      } else {
        setError('Login successful, but no valid role found.');
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error logging in');
      }
    }
  };

  return { error, loading, loginUser };
};

export default useLogin;
