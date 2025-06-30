import React from 'react';
import { Outlet } from 'react-router-dom';  
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-content">
        <Outlet />   
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
