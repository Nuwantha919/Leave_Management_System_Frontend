import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function DashboardContent() {
  const { username, role, leaveBalance, leavesTaken } = useSelector((state: RootState) => state.auth);
  
  // Logic to ensure leave balance is never displayed as negative (shows 0 instead)
  const displayedLeaveBalance = leaveBalance === null || leaveBalance === undefined
    ? '...'
    : Math.max(0, leaveBalance); // CRITICAL FIX: Ensures value is 0 or positive

  const pendingRequests = useSelector((state: RootState) => 
    state.leaves.leaves.filter(l => l.status === 'PENDING').length
  );

  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
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
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-primary h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Leave Balance</h5>
              {/* This line uses the corrected value */}
              <p className="card-text display-4 fw-bold">{displayedLeaveBalance}</p>
              <p className="text-muted small mb-0">Days Remaining</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-success h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Leaves Taken</h5>
              <p className="card-text display-4 fw-bold">{leavesTaken ?? '...'}</p>
              <p className="text-muted small mb-0">This Year</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-warning h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Pending Requests</h5>
              <p className="card-text display-4 fw-bold">{pendingRequests}</p>
              <p className="text-muted small mb-0">Awaiting Approval</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
