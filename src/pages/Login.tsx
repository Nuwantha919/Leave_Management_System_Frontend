// src/pages/Login.tsx (UPDATED)

import React, { useState, type FormEvent, useEffect } from "react"; // <-- Added useEffect
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // <-- NEW
import { setUsername, setPassword } from '../features/auth/authSlice'; 
import { loginUser } from '../features/auth/authThunks'; 
import { type RootState, type AppDispatch } from '../app/store';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // <-- NEW: Hook for navigation
  
  // Select state from Redux store
  const { username, password, isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

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
    dispatch(loginUser({ username, password }));
  };
  
  // NOTE: If isAuthenticated is true, the useEffect handles the redirect, so we don't render the form
  if (isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-info text-white" style={{ minHeight: "100vh" }}>
        <h1 className="fw-bold">Login Successful! Redirecting to Dashboard...</h1>
      </div>
    );
  }

  // ... (The rest of the component remains the same, showing the login form)
  return (
    <div
      className="bg-white d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
        }}
      >
        <div className="card-body p-4">
            {/* ... (Error display and form code remains the same) */}
            <div className="text-center mb-4">
                <div
                    className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded mb-2"
                    style={{
                        width: 100,
                        height: 48,
                        fontWeight: "bold",
                        fontSize: 19,
                        borderRadius: "14px",
                    }}
                >
                    Haulmatic
                </div>
                <h4 className="fw-bold mb-1">Leave Management System</h4>
                <p className="text-muted small mb-0">Sign in to continue</p>
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
                        value={username}
                // Redux Dispatch: onChange calls setUsername action
                        onChange={(e) => dispatch(setUsername(e.target.value))}
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
                        value={password}
                // Redux Dispatch: onChange calls setPassword action
                        onChange={(e) => dispatch(setPassword(e.target.value))}
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
                    className="btn btn-dark w-100 fw-semibold"
                    style={{ padding: "10px" }}
                    disabled={isLoading} 
                >
                    {isLoading ? 'Signing In...' : 'Sign in'} 
                </button>
            </form>

            <p className="text-center text-muted small mt-3 mb-0">
                By continuing you agree to our{" "}
                <a href="#" className="text-decoration-underline text-dark">
                    Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-decoration-underline text-dark">
                    Privacy Policy
                </a>.
            </p>
        </div>
      </div>
    </div>
  );
}