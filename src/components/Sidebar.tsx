// src/components/Sidebar.tsx
import React from 'react';

// Define the shape of the props for type safety
interface SidebarProps {
  role: 'ADMIN' | 'EMPLOYEE';
  // Add handlers for future navigation/actions here
  onViewLeaves: () => void;
  onApplyLeave: () => void;
  // ... other handlers
}

/**
 * Collapsible navigation sidebar for the LMS dashboard.
 * Content changes slightly based on the user's role.
 */
export default function Sidebar({ role, onViewLeaves, onApplyLeave }: SidebarProps) {
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
        <li className="nav-item mb-1">
          {/* Main Dashboard Link */}
          <a href="/dashboard" className="nav-link active" aria-current="page">
            <i className="bi bi-house-door me-2"></i> {/* Assuming you'll add Bootstrap Icons */}
            Dashboard
          </a>
        </li>
        
        <li className="nav-item my-2">
          <hr className="dropdown-divider bg-secondary"/>
          <span className="text-muted small ms-3">Actions</span>
        </li>

        {/* Apply Leave (for all users) */}
        <li className="nav-item mb-1">
          <a 
            href="#" 
            className="nav-link text-white" 
            onClick={onApplyLeave} // Future implementation
          >
            <i className="bi bi-calendar-plus me-2"></i>
            Apply for Leave 📝
          </a>
        </li>

        {/* View Leaves (for all users) */}
        <li className="nav-item mb-1">
          <a 
            href="#" 
            className="nav-link text-white" 
            onClick={onViewLeaves} // Future implementation
          >
            <i className="bi bi-calendar-week me-2"></i>
            View My Leaves
          </a>
        </li>

        {/* Admin-specific features */}
        {role === 'ADMIN' && (
          <>
            <li className="nav-item my-2">
              <hr className="dropdown-divider bg-secondary"/>
              <span className="text-muted small ms-3">Admin Tools</span>
            </li>
            <li className="nav-item mb-1">
              <a 
                href="#" 
                className="nav-link text-white" 
                // onClick={onViewAllLeaves} // Future implementation
              >
                <i className="bi bi-list-check me-2"></i>
                Review All Leaves
              </a>
            </li>
            <li className="nav-item mb-1">
              <a 
                href="#" 
                className="nav-link text-white" 
                // onClick={onManageUsers} // Future implementation
              >
                <i className="bi bi-people me-2"></i>
                Manage Users
              </a>
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