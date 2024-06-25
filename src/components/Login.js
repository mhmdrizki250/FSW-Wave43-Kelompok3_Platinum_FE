// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import userService from '../services/userService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/login.css';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await userService.login(username, password);
//       if (response.data.role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (response.data.role === 'user') {
//         navigate('/user-dashboard');
//       } else {
//         setMessage('Login successful, but no valid role found.');
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(error.response.data.error);
//       } else {
//         setMessage('Error logging in');
//       }
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             className="form-control"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { Alert, Button, Card, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";

import loginImage from '../assets/img/—Pngtree—log in login interface computer_3945571.png';
import useLogin from "../hooks/useLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const Login = () => {
    const { error, loading, loginUser } = useLogin();
    const handleLogin = async (values) => {
        await loginUser(values);
    };

    return (
        <Card className="form-container" bordered>
            <div className="d-flex justify-content-center">
                <div className="flex-1 p-5">
                    <img src={loginImage} className="auth-image" alt="login" />
                </div>
                <div className="flex-1">
                    <Typography.Title level={3} strong className='title'>
                        Sign In
                    </Typography.Title>
                    <Typography.Text type="secondary" strong className="slogan">
                        Unlock your world.
                    </Typography.Text>
                    
                    <Form
                        layout="vertical"
                        onFinish={handleLogin}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Please input your username!" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter your password!" />
                        </Form.Item>

                        {
                            error && (
                                <Alert
                                    description={error}
                                    type='error'
                                    showIcon
                                    closable
                                    className='alert'
                                />
                        )}

                        <Form.Item>
                            <Button
                                type={`${loading ? '' : 'primary'}`}
                                htmlType="submit"
                                size="large"
                                className="btn"
                            >
                                {loading ? <Spin /> : 'Sign In'}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to="/register">
                                <Button
                                    size="large"
                                    className="btn"
                                >
                                    Create an account
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Card>
    );
};

export default Login;


