// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import App from './App';
// import Register from './components/Register';
// import Login from './components/Login';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import ProductListUser from './components/ProductListUser';
// import Cart from './components/Cart';
// import Orders from './components/Orders';
// import Confirmation from './components/Confirmation';
// import PaymentConfirmation from './components/PaymentConfirmation';
// import ProductManagement from './components/ProductManagement';
// import ShippingPaymentForm from './components/ShippingPaymentForm';
// import TransactionReceipt from './components/TransactionReceipt'; // Tambahkan ini

// const container = document.getElementById('root');
// const root = createRoot(container);

// const userId = 1; // Gantilah dengan ID pengguna yang sesungguhnya atau ambil dari state/context

// root.render(
//   <Router>
//     <Routes>
//       <Route exact path="/" element={<App />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       <Route path="/user-dashboard" element={<UserDashboard />} />
//       <Route path="/products" element={<ProductListUser />} />
//       <Route path="/cart" element={<Cart user_id={userId} />} />
//       <Route path="/orders" element={<Orders user_id={userId} />} />
//       <Route path="/confirmation/:order_id" element={<Confirmation />} />
//       <Route path="/payment-confirmation/:order_id" element={<PaymentConfirmation />} />
//       <Route path="/product-management" element={<ProductManagement />} />
//       <Route path="/shipping-payment/:order_id" element={<ShippingPaymentForm />} />
//       <Route path="/transaction-receipt/:order_id" element={<TransactionReceipt />} /> {/* Tambahkan rute ini */}
//     </Routes>
//   </Router>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProductListUser from "./components/ProductListUser";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Confirmation from "./components/Confirmation";
import PaymentConfirmation from "./components/PaymentConfirmation";
import ProductManagement from "./components/ProductManagement";
import ShippingPaymentForm from "./components/ShippingPaymentForm";
import TransactionReceipt from "./components/TransactionReceipt";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
const root = createRoot(container);

const userId = 1; // Gantilah dengan ID pengguna yang sesungguhnya atau ambil dari state/context

root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/products" element={<ProductListUser />} />
        <Route path="/cart" element={<Cart user_id={userId} />} />
        <Route path="/orders" element={<Orders user_id={userId} />} />
        <Route path="/confirmation/:order_id" element={<Confirmation />} />
        <Route
          path="/payment-confirmation/:order_id"
          element={<PaymentConfirmation />}
        />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route
          path="/shipping-payment/:order_id"
          element={<ShippingPaymentForm />}
        />
        <Route
          path="/transaction-receipt/:order_id"
          element={<TransactionReceipt />}
        />
      </Routes>
    </Router>
  </AuthProvider>
);
