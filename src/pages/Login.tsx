import React, { useState, type FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

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

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nuwantha"
                autoComplete="username"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
                <button
                    type="button"
                    className="btn btn-sm btn-link position-absolute end-0 translate-middle-y me-2 text-decoration-none"
                    style={{ top: '75%' }}
                    onClick={() => setShowPassword((s) => !s)}
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
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="small text-decoration-none text-dark">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 fw-semibold"
              style={{ padding: "10px" }}
            >
              Sign in
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
