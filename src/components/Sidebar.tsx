// src/components/Sidebar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  role: 'admin' | 'employee';
}

export default function Sidebar({ role }: SidebarProps) {
  // This function returns an object with styling for the active link
  const getActiveStyle = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? { backgroundColor: '#0d6efd', color: 'white' } 
      : {};

  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow-lg" 
      style={{ width: '280px', minHeight: 'calc(100vh - 56px)' }}
    >
      <div className="text-center mb-3 border-bottom pb-2">
        <span className="fs-5 fw-semibold text-warning">Leave Management</span>
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          {/* 'end' prop ensures this link is only active on the exact path */}
          <NavLink to="/dashboard" end className="nav-link text-white" style={getActiveStyle}>
            <i className="bi bi-house-door me-2"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/dashboard/planner" className="nav-link text-white" style={getActiveStyle}>
            <i className="bi bi-calendar-event me-2"></i> Leave Planner
          </NavLink>
        </li>

        {/* Admin-specific features */}
        {role?.toLocaleLowerCase() === 'admin' && (
          <>
            <li className="nav-item mb-2">
              <NavLink to="/dashboard/review-all" className="nav-link text-white" style={getActiveStyle}>
                <i className="bi bi-list-check me-2"></i> Review All Leaves
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/dashboard/manage-users" className="nav-link text-white" style={getActiveStyle}>
                <i className="bi bi-people me-2"></i> Manage Users
              </NavLink>
            </li>
          </>
        )}
      </ul>
      
      {/* Placeholder for future notifications */}
      <div className="mt-auto pt-3 border-top">
        <p className="text-white small mb-1">🔔 Notifications:</p>
        <div className="alert alert-warning p-1 small text-center">
          2 Pending Requests
        </div>
      </div>
    </div>
  );
}