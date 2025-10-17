import React from 'react';

// This defines what a single leave object looks like
export type Leave = {
  id: number;
  employeeName: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

// This defines the props our table component will accept
interface LeaveTableProps {
  leaves: Leave[];
  isAdminView: boolean; // Controls whether to show the employee name column
}

export default function LeaveTable({ leaves, isAdminView }: LeaveTableProps) {
  
  const handleApprove = (id: number) => alert(`Approve action for leave ID: ${id}`);
  const handleReject = (id: number) => alert(`Reject action for leave ID: ${id}`);
  const handleEdit = (id: number) => alert(`Edit action for leave ID: ${id}`);
  const handleCancel = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      alert(`Cancel action for leave ID: ${id}`);
    }
  };

  const getStatusBadge = (status: Leave['status']) => {
    switch (status) {
      case 'APPROVED': return 'badge bg-success';
      case 'PENDING': return 'badge bg-warning text-dark';
      case 'REJECTED': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            {isAdminView && <th scope="col">Employee Name</th>}
            <th scope="col">Dates</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan={isAdminView ? 5 : 4} className="text-center p-4 text-muted">
                No leave requests found.
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave.id}>
                {isAdminView && <td>{leave.employeeName}</td>}
                <td>{leave.startDate} to {leave.endDate}</td>
                <td>{leave.reason}</td>
                <td><span className={getStatusBadge(leave.status)}>{leave.status}</span></td>
                <td className="text-end">
                  {isAdminView ? (
                    // --- START OF FIX ---
                    // Admin Actions now have text for clarity
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(leave.id)}>
                        <i className="bi bi-check-lg me-1"></i> Approve
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleReject(leave.id)}>
                        <i className="bi bi-x-lg me-1"></i> Reject
                      </button>
                    </>
                    // --- END OF FIX ---
                  ) : (
                    // Employee Actions (only show if status is PENDING)
                    leave.status === 'PENDING' && (
                      <>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(leave.id)}>
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(leave.id)}>
                          <i className="bi bi-trash"></i> Cancel
                        </button>
                      </>
                    )
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}