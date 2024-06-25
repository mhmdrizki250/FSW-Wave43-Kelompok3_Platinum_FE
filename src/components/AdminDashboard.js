import React from 'react';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container container">
      <AdminHeader />
      <main>
        <h1 className="admin-dashboard-header text-center">Admin Dashboard</h1>
        <p className="admin-dashboard-welcome text-center">Welcome, Admin!</p>
        {/* Tambahkan konten dashboard admin di sini */}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
