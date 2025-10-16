// src/pages/Dashboard.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Main application dashboard/home page.
 * Will host the main application layout and content (e.g., Leave Module).
 */
export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Get user info from Redux state
  const { username, role, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If for some reason a non-authenticated user lands here, redirect them.
  // Although the ProtectedRoute wrapper below handles this, it's good practice.
  if (!isAuthenticated) {
    // This client-side check is useful, but routing control is primary.
    navigate('/login');
    return null; // Don't render anything while redirecting
  }

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Navbar/Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/dashboard">LMS Dashboard</a>
          <div className="d-flex">
            <span className="navbar-text me-3 text-white">
              Hello, <strong className="text-warning">{username}</strong> ({role})
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout 🚪
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Welcome to the Leave Management System</h2>
            
            {/* Conditional content based on role */}
            {role === 'ADMIN' ? (
              <div className="alert alert-info" role="alert">
                Admin View: You can manage all leave requests.
              </div>
            ) : (
              <div className="alert alert-success" role="alert">
                Employee View: You can apply for and view your leave requests.
              </div>
            )}
            
            {/* Future Leave Module implementation goes here */}
            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <h5 className="card-title">Leave Module Status</h5>
                    <p className="card-text">
                        The Leave Management functionality (Create, View, Edit) will be implemented here.
                    </p>
                    {/* Placeholder for the main Leave management content */}
                    <p className="text-muted small">
                        *Next step will be to implement the Leave module in a dedicated feature folder.*
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}