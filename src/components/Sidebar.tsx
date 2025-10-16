// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Make sure this import is here

// Define the shape of the props for type safety
interface SidebarProps {
  role: 'admin' | 'employee';
  // Add handlers for future navigation/actions here
  onDashboardContent: () => void;
  onLeavePlanner: () => void;
  onViewLeaves: () => void;
  onApplyLeave: () => void;
  onAdminManagement?: () => void;
  onViewAllLeaves?: () => void;
  // ... other handlers
}

/**
 * Collapsible navigation sidebar for the LMS dashboard.
 * Content changes slightly based on the user's role.
 */
export default function Sidebar({ role, onDashboardContent, onViewLeaves, onApplyLeave, onLeavePlanner , onAdminManagement, onViewAllLeaves }: SidebarProps) {
  return (
    // Sidebar structure: Fixed-width column, responsive for smaller screens
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow-lg" 
      style={{ width: '280px', minHeight: 'calc(100vh - 56px)' }} // Adjust height for the top navbar
    >
      <div className="text-center mb-3 border-bottom pb-2">
        <span className="fs-5 fw-semibold text-warning">Leave Management</span>
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-4">
          <Link to="/dashboard" className="nav-link active" aria-current="page" onClick={onDashboardContent}>
            <i className="bi bi-house-door me-2"></i>
            Dashboard
          </Link>
        </li>
        
        <li className="nav-item mb-4">
          <button className="nav-link active text-start w-100" onClick={onLeavePlanner}>
            <i className="bi bi-calendar-event me-2"></i> 
            Leave Planner
          </button>
        </li>

        {/* Admin-specific features */}
        {role?.toLocaleLowerCase() === 'admin' && (
          <>

            <li className="nav-item mb-4">
              {/* CHANGE: Using <button> for future actions */}
              <button className="nav-link active text-start w-100" onClick={onViewAllLeaves}>
                <i className="bi bi-list-check me-2"></i>
                Review All Leaves
              </button>
            </li>
            <li className="nav-item mb-4">
              {/* CHANGE: Using <button> for future actions */}
              <button className="nav-link active text-start w-100" onClick={onAdminManagement}>
                <i className="bi bi-people me-2"></i>
                Manage Users
              </button>
            </li>
          </>
        )}
      </ul>
      
      {/* User Notifications Placeholder (Future Implementation) */}
      <div className="mt-auto pt-3 border-top">
        <p className="text-white small mb-1">🔔 Notifications:</p>
        <div className="alert alert-warning p-1 small text-center">
          2 Pending Requests
        </div>
      </div>
    </div>
  );
}