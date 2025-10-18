import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch, persistor } from '../../store/store';
import { logout } from '../../store/auth/authSlice';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username, role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    toast.info("You have been successfully logged out.");
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <nav 
        className="navbar navbar-expand-lg navbar-dark navbar-modern w-100 position-fixed top-0" 
        style={{ 
          zIndex: 1030,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="/dashboard" style={{ fontSize: '1.1rem' }}>
            <div 
              className="me-2"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-briefcase-fill" style={{ fontSize: '1rem' }}></i>
            </div>
            <span>Leave Management</span>
          </a>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <div 
                  className="me-2"
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                >
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="text-start me-2">
                  <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>{username}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{role}</div>
                </div>
                <i className="bi bi-chevron-down" style={{ fontSize: '0.8rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0" style={{ borderRadius: '12px', marginTop: '0.5rem' }}>
                <li className="dropdown-header d-flex align-items-center" style={{ padding: '0.75rem 1rem' }}>
                  <i className="bi bi-person-badge me-2" style={{ color: '#6366f1' }}></i>
                  <span>Account Information</span>
                </li>
                <li><hr className="dropdown-divider my-1"/></li>
                <li>
                  <span className="dropdown-item-text d-flex justify-content-between" style={{ padding: '0.5rem 1rem' }}>
                    <span className="text-muted">Username:</span>
                    <strong>{username}</strong>
                  </span>
                </li>
                <li>
                  <span className="dropdown-item-text d-flex justify-content-between" style={{ padding: '0.5rem 1rem' }}>
                    <span className="text-muted">Role:</span>
                    <span 
                      className="badge" 
                      style={{ 
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        padding: '0.25rem 0.75rem'
                      }}
                    >
                      {role}
                    </span>
                  </span>
                </li>
                <li><hr className="dropdown-divider my-1"/></li>
                <li>
                  <button 
                    className="dropdown-item d-flex align-items-center" 
                    onClick={handleLogout}
                    style={{ 
                      color: '#ef4444',
                      padding: '0.75rem 1rem',
                      fontWeight: 500
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> 
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex w-100" style={{ marginTop: '56px' }}>
        <Sidebar role={role as 'admin' | 'employee'} />
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}