import React from 'react';
import UserHeader from './UserHeader';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/userDashboard.css';

const UserDashboard = () => {
  return (
    <div>
      <UserHeader />
      <div className="container mt-5">
        <h1 className="text-center">User Dashboard</h1>
        <div className="content">
          {/* Tambahkan konten dashboard pengguna di sini */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
