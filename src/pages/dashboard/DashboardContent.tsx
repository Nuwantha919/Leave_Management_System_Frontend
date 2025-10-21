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
      {/* Welcome Header */}
      <div 
        className="card border-0 mb-4" 
        style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)'
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center text-white">
            <div>
              <h2 className="mb-2 fw-bold">Welcome back, {username || 'User'}! 👋</h2>
              <p className="mb-0 opacity-90">
                <i className="bi bi-shield-check me-2"></i>
                Logged in as <strong>{role}</strong>
              </p>
            </div>
            <div className="text-end">
              <div className="d-flex align-items-center justify-content-end mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                <span className="fw-semibold">
                  {currentDateTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-end opacity-90">
                <i className="bi bi-clock me-2"></i>
                <span>{currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div 
            className="card border-0 h-100 stats-card stats-card-primary"
            style={{ 
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.1)';
            }}
          >
            <div className="card-body text-center p-4">
              <div 
                className="icon-wrapper mx-auto mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }}
              >
                <i className="bi bi-calendar-check"></i>
              </div>
              <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 600 }}>
                Leave Balance
              </h6>
              <h2 className="display-4 fw-bold mb-2" style={{ color: '#6366f1' }}>
                {displayedLeaveBalance}
              </h2>
              <p className="text-muted small mb-0">Days Remaining</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div 
            className="card border-0 h-100 stats-card stats-card-success"
            style={{ 
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
            }}
          >
            <div className="card-body text-center p-4">
              <div 
                className="icon-wrapper mx-auto mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <i className="bi bi-check-circle"></i>
              </div>
              <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 600 }}>
                Leaves Taken
              </h6>
              <h2 className="display-4 fw-bold mb-2" style={{ color: '#10b981' }}>
                {leavesTaken ?? '...'}
              </h2>
              <p className="text-muted small mb-0">This Year</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div 
            className="card border-0 h-100 stats-card stats-card-warning"
            style={{ 
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.1)';
            }}
          >
            <div className="card-body text-center p-4">
              <div 
                className="icon-wrapper mx-auto mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
              >
                <i className="bi bi-hourglass-split"></i>
              </div>
              <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 600 }}>
                Pending Requests
              </h6>
              <h2 className="display-4 fw-bold mb-2" style={{ color: '#f59e0b' }}>
                {pendingRequests}
              </h2>
              <p className="text-muted small mb-0">Awaiting Approval</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
