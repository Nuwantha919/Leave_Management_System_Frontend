import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/store';
import { createUserThunk } from '../../store/users/usersThunks';
import { toast } from 'react-toastify';

export default function AdminManageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.users);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [maximumLeaveCount, setMaximumLeaveCount] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(createUserThunk({ username, password, role, maximumLeaveCount }))
      .unwrap()
      .then((newUser) => {
        toast.success(`Successfully registered user: ${newUser.username}`);
        setUsername('');
        setPassword('');
        setRole('EMPLOYEE');
        setMaximumLeaveCount(20);
      })
      .catch((err) => {
        toast.error(err || "Registration failed. Please try again.");
      });
  };

  return (
    <div className="card shadow-sm modern-card" style={{ maxWidth: '700px', margin: 'auto' }}>
      <div className="card-header gradient-header">
        <div className="d-flex align-items-center">
          <div className="icon-wrapper me-3">
            <i className="bi bi-person-plus"></i>
          </div>
          <h4 className="mb-0">Register a New User</h4>
        </div>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {error && status === 'failed' && (
            <div className="alert alert-danger d-flex align-items-center mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="reg-username" className="form-label fw-semibold">
              <i className="bi bi-person me-2"></i>Username
            </label>
            <input
              type="text"
              className="form-control form-control-lg modern-input"
              id="reg-username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reg-password" className="form-label fw-semibold">
              <i className="bi bi-lock me-2"></i>Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg modern-input"
              id="reg-password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="row mb-4">
            <div className="col-md-8">
              <label htmlFor="reg-role" className="form-label fw-semibold">
                <i className="bi bi-shield-check me-2"></i>Role
              </label>
              <select
                className="form-select form-select-lg modern-input"
                id="reg-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="reg-max-leaves" className="form-label fw-semibold">
                <i className="bi bi-calendar3 me-2"></i>Max Leaves
              </label>
              <input
                type="number"
                className="form-control form-control-lg modern-input"
                id="reg-max-leaves"
                placeholder="0"
                value={maximumLeaveCount}
                onChange={(e) => setMaximumLeaveCount(parseInt(e.target.value, 10))}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success btn-lg modern-btn px-5" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registering...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>Register User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}