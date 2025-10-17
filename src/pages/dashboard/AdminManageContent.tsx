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
    <div className="card shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-header">
        <h4 className="mb-0">Register a New User</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {error && status === 'failed' && <div className="alert alert-danger">{error}</div>}
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
          <div className="row mb-3">
            <div className="col-md-8">
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
            <div className="col-md-4">
              <label htmlFor="reg-max-leaves" className="form-label">Max Leaves</label>
              <input
                type="number"
                className="form-control"
                id="reg-max-leaves"
                value={maximumLeaveCount}
                onChange={(e) => setMaximumLeaveCount(parseInt(e.target.value, 10))}
                required
              />
            </div>
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