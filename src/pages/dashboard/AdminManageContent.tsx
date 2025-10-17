// src/pages/dashboard/AdminManageContent.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/store';
import { createUserThunk } from '../../store/users/usersThunks';

export default function AdminManageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.users);

  // Local state for the form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE'); // Default to creating an employee
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear any previous success messages

    dispatch(createUserThunk({ username, password, role }))
      .unwrap() // Use unwrap() to handle the promise here
      .then((newUser) => {
        setSuccessMessage(`Successfully registered user: ${newUser.username}`);
        // Clear form fields on success
        setUsername('');
        setPassword('');
        setRole('EMPLOYEE');
      })
      .catch((err) => {
        // The error is already in the Redux state, so we don't need to set it here
        console.error("Registration failed:", err);
      });
  };

  return (
    <div className="card shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-header">
        <h4 className="mb-0">Register a New User</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Display API error or success message */}
          {error && status === 'failed' && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="mb-3">
            <label htmlFor="reg-username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="reg-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-role" className="form-label">Role</label>
            <select
              className="form-select"
              id="reg-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Registering...' : 'Register User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}