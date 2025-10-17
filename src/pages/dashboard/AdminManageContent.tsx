import React from 'react';

export default function AdminManageContent() {
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="mb-0">Manage Users</h4>
      </div>
      <div className="card-body text-center p-5">
        <i className="bi bi-people-fill" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
        <h5 className="mt-3">User Management</h5>
        <p className="text-muted">
          This section is under construction. Future features will include adding new users,
          <br />
          editing roles, and deactivating accounts.
        </p>
      </div>
    </div>
  );
}