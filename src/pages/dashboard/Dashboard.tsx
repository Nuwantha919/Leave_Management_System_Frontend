// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../../store/store';
import { logout } from '../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; // <-- Import the new component
import DashboardContent from './DashboardContent';
import ViewLeaveContent from './ViewLeaveContent';
import ApplyLeaveContent from './ApplyLeaveContent';

/**
 * Main application dashboard/home page.
 * Hosts the main application layout (Header, Sidebar, Content).
 */
export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Get user info from Redux state
  const { username, role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // State to manage which content section is active (future use)
  const [activeContent, setActiveContent] = useState('DASHBOARD');

  // NOTE: Removed the isAuthenticated check as ProtectedRoute should handle primary control.

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear state
    navigate('/login'); // Redirect to login page
  };

  // Handlers for Sidebar actions (to be implemented later)
  const handleViewLeaves = () => setActiveContent('VIEW_LEAVES');
  const handleApplyLeave = () => setActiveContent('APPLY_LEAVE');

  return (
    // Main container uses d-flex for a full-height layout
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      
      {/* TOP NAVBAR/HEADER (User Details Panel) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm w-100 position-fixed top-0" style={{ zIndex: 1030 }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/dashboard">
            <i className="bi bi-briefcase-fill me-2"></i> LMS Dashboard
          </a>
          
          <div className="d-flex align-items-center">
            {/* User Details Dropdown (Click to show details) */}
            <div className="dropdown me-3">
              <button 
                className="btn btn-dark dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" // Assumes Bootstrap JS is included
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i> 
                <strong className="text-warning">{username}</strong>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="dropdown-header">User Session</li>
                <li><span className="dropdown-item-text">Role: **{role}**</span></li>
                <li><span className="dropdown-item-text">ID: #00123</span></li> {/* Placeholder */}
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

      {/* Main Content Area: Sidebar and Content */}
      <div className="d-flex w-100" style={{ marginTop: '56px' }}> {/* Margin to clear the fixed navbar */}
        
        {/* Sidebar (Leave Planar functions) */}
        <Sidebar 
          role={role as 'ADMIN' | 'EMPLOYEE'} // Cast role for type safety
          onViewLeaves={handleViewLeaves}
          onApplyLeave={handleApplyLeave}
        />

        {/* Content Panel (Main working area) */}
        <main className="flex-grow-1 p-4">
          
          <h2 className="mb-4">Welcome to the Leave Management System</h2>
          
          {/* Conditional Content/Router View (Based on activeContent state, future implementation) */}
          {activeContent === 'DASHBOARD' && <div><DashboardContent role={role} /></div>}

          {/* You would add more conditional renderings here for VIEW_LEAVES, APPLY_LEAVE, etc. */}
          {activeContent === 'VIEW_LEAVES' && <div><ViewLeaveContent /></div>}
          {activeContent === 'APPLY_LEAVE' && <div><ApplyLeaveContent /></div>}

        </main>
      </div>
    </div>
  );
}