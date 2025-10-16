import React, { useState, useEffect } from 'react';

// Define the shape of the props for type safety
interface DashboardContentProps {
  role: string | null;
  username: string | null;
}

export default function DashboardContent({ role, username }: DashboardContentProps) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Set up a timer to update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* --- DASHBOARD HEADER --- */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="mb-0">Welcome back, {username || 'User'}!</h2>
          <p className="text-muted">
            You are logged in as a <strong className="text-primary">{role}</strong>.
          </p>
        </div>
        <div className="text-end">
          <h5 className="fw-light mb-0">
            {currentDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h5>
          <p className="text-muted mb-0">
            {currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <hr />

      {/* --- ROLE-BASED WELCOME MESSAGE --- */}
      {role === 'ADMIN' ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-tools me-2"></i>
          <strong>Admin View:</strong> You have full access to manage all employee leave requests and system settings.
        </div>
      ) : (
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          <strong>Employee View:</strong> You can apply for new leave and track the status of your requests here.
        </div>
      )}

      {/* --- DASHBOARD WIDGETS --- */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-primary h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Total Leave Balance</h5>
              <p className="card-text display-4 fw-bold">15</p>
              <p className="text-muted small mb-0">Days Remaining</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-warning h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Pending Requests</h5>
              <p className="card-text display-4 fw-bold">3</p>
              <p className="text-muted small mb-0">Action required by <strong>{role === 'ADMIN' ? 'you' : 'Admin'}</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}