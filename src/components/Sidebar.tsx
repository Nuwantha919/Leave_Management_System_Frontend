import { NavLink } from 'react-router-dom';

interface SidebarProps {
  role: 'admin' | 'employee';
}

export default function Sidebar({ role }: SidebarProps) {
  const getActiveClass = ({ isActive }: { isActive: boolean }) => 
    `nav-link text-white nav-link-modern d-flex align-items-center ${isActive ? 'active' : ''}`;

  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-4 text-white sidebar-modern" 
      style={{ 
        width: '280px', 
        minHeight: 'calc(100vh - 56px)',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
      }}
    >
      <div className="text-center mb-4 pb-3" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="d-flex align-items-center justify-content-center mb-2">
          <div 
            className="icon-wrapper me-2"
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="bi bi-briefcase-fill" style={{ fontSize: '1.2rem' }}></i>
          </div>
          <span className="fs-5 fw-bold" style={{ 
            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Leave System
          </span>
        </div>
        <p className="small text-white-50 mb-0">Management Portal</p>
      </div>
      
      <nav className="nav flex-column mb-auto">
        <NavLink to="/dashboard" end className={getActiveClass}>
          <i className="bi bi-grid-fill me-3" style={{ fontSize: '1.1rem' }}></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/planner" className={getActiveClass}>
          <i className="bi bi-calendar-check-fill me-3" style={{ fontSize: '1.1rem' }}></i>
          <span>Leave Planner</span>
        </NavLink>

        {/* Conditionally render admin-specific navigation links. */}
        {role?.toLocaleLowerCase() === 'admin' && (
          <>
            <div className="mt-3 mb-2 px-3">
              <small className="text-white-50 fw-semibold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                Admin Tools
              </small>
            </div>
            <NavLink to="/dashboard/review-all" className={getActiveClass}>
              <i className="bi bi-list-check me-3" style={{ fontSize: '1.1rem' }}></i>
              <span>Review Leaves</span>
            </NavLink>

            <NavLink to="/dashboard/manage-users" className={getActiveClass}>
              <i className="bi bi-people-fill me-3" style={{ fontSize: '1.1rem' }}></i>
              <span>Manage Users</span>
            </NavLink>
          </>
        )}
      </nav>

      <div 
        className="mt-auto pt-3"
        style={{ 
          borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="d-flex align-items-center">
          <i className="bi bi-shield-check me-2"></i>
          <span>Secured by Haulmatic</span>
        </div>
      </div>
    </div>
  );
}