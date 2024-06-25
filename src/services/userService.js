import axios from 'axios';

const API_URL = 'http://localhost:4040/api/users';

const register = (username, password, email, role) => {
  return axios.post(`${API_URL}/register`, {
    username,
    password,
    email,
    role,
  });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, {
    username,
    password,
  });
};

const userService = {
  register,
  login,
};

export default userService;
