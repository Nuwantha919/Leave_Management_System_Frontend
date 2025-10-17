// src/pages/dashboard/Dashboard.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../../store/store';
import { logout } from '../../store/auth/authSlice';
import { useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username, role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm w-100 position-fixed top-0" style={{ zIndex: 1030 }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/dashboard">
            <i className="bi bi-briefcase-fill me-2"></i> LMS Dashboard
          </a>
          <div className="d-flex align-items-center">
            <div className="dropdown me-3">
              <button 
                className="btn btn-dark dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i> 
                <strong className="text-warning">{username}</strong>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="dropdown-header">User Session</li>
                <li><span className="dropdown-item-text">Role: **{role}**</span></li>
                <li><hr className="dropdown-divider"/></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="d-flex w-100" style={{ marginTop: '56px' }}>
        
        {/* The Sidebar now only needs the user's role */}
        <Sidebar role={role as 'admin' | 'employee'} />

        {/* The Outlet will render the correct child component based on the URL */}
        <main className="flex-grow-1 p-4">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}