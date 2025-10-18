import { useState, type FormEvent, useEffect } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../store/auth/authThunks'; 
import { type RootState, type AppDispatch } from '../../store/store';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  
  // Manage form fields with local state
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');

// Get only the authentication status from Redux
const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Effect to handle navigation on successful login
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the dashboard upon successful login
      navigate('/dashboard', { replace: true }); 
    }
    // Dependency array includes isAuthenticated to run the effect when its value changes
  }, [isAuthenticated, navigate]); 

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Use the local state variables here
    dispatch(loginUser({ username: localUsername, password: localPassword }));
  };
  
  // NOTE: If isAuthenticated is true, the useEffect handles the redirect, so we don't render the form
  if (isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-info text-white" style={{ minHeight: "100vh" }}>
        <h1 className="fw-bold">Login Successful! Redirecting to Dashboard...</h1>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      <div
        className="card border-0"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="card-body p-5">
            <div className="text-center mb-4">
                <div
                    className="d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                        width: 80,
                        height: 80,
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
                    }}
                >
                    <i className="bi bi-briefcase-fill text-white" style={{ fontSize: "2.5rem" }}></i>
                </div>
                <h3 className="fw-bold mb-2" style={{ color: "#1e293b" }}>Welcome Back</h3>
                <p className="text-muted mb-0">Sign in to access your leave management</p>
            </div>

            {error && (
                <div className="alert alert-danger small" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                // Redux State: value={username}
                        value={localUsername}
                        onChange={(e) => setLocalUsername(e.target.value)}
                placeholder="nuwantha"
                        autoComplete="username"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control pe-5"
                // Redux State: value={password}
                        value={localPassword}
                // Redux Dispatch: onChange calls setPassword action
                        onChange={(e) => setLocalPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className="btn btn-sm btn-link position-absolute end-0 translate-middle-y me-2 text-dark"
                        style={{ top: '75%' }} 
                        onClick={() => setShowPassword((s) => !s)}
                        disabled={isLoading}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            disabled={isLoading}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>
                    <a href="#" className="small text-decoration-none text-dark" onClick={(e) => e.preventDefault()}>
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold"
                    style={{ 
                        padding: "14px",
                        fontSize: "1rem",
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
                    }}
                    disabled={isLoading} 
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Sign In
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-muted small mt-4 mb-0">
                By continuing you agree to our{" "}
                <a href="#" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 500 }}>
                    Terms
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 500 }}>
                    Privacy Policy
                </a>
            </p>
        </div>
      </div>
    </div>
  );
}