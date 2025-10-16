// src/pages/dashboard/LeavePlannerContent.tsx
import React, { useState } from 'react';
import ApplyLeaveContent from './ApplyLeaveContent';

// Define a type for a single leave record
type Leave = {
  id: number;
  employeeName: string;
  leaveType: 'Annual' | 'Sick' | 'Casual' | 'Unpaid';
  reason: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

// Define the shape of the props for this component
interface LeavePlannerContentProps {
  onAllocateLeaveClick: () => void;
}

// Dummy data
const mockLeaves: Leave[] = [
  { id: 1, employeeName: 'John Doe', leaveType: 'Annual', reason: 'Family vacation', startDate: '2025-11-10', endDate: '2025-11-12', status: 'Approved' },
  { id: 2, employeeName: 'Jane Smith', leaveType: 'Sick', reason: 'Doctor\'s appointment', startDate: '2025-11-15', endDate: '2025-11-15', status: 'Pending' },
  { id: 3, employeeName: 'Peter Jones', leaveType: 'Casual', reason: 'Personal errand', startDate: '2025-12-01', endDate: '2025-12-02', status: 'Approved' },
  { id: 4, employeeName: 'Mary Williams', leaveType: 'Annual', reason: 'Extended holiday', startDate: '2025-11-20', endDate: '2025-11-25', status: 'Rejected' },
];

// Apply the props interface to the component function
export default function ReviewAllLeaves({ onAllocateLeaveClick }: LeavePlannerContentProps) {
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);

  const handleUpdate = (id: number) => {
    alert(`Update action for leave ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this leave record?')) {
      alert(`Delete action for leave ID: ${id}`);
      setLeaves(leaves.filter(leave => leave.id !== id));
    }
  };
  
  const getStatusBadge = (status: Leave['status']) => {
    switch (status) {
      case 'Approved': return 'badge bg-success';
      case 'Pending': return 'badge bg-warning text-dark';
      case 'Rejected': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Leave Planner & History</h4>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Allocate Leaves
        </button>
      </div>
      <div className="card-body">
        {/* ... table remains the same ... */}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Reason</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{leave.employeeName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td><span className={getStatusBadge(leave.status)}>{leave.status}</span></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleUpdate(leave.id)}>
                      <i className="bi bi-pencil-square"></i> Update
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(leave.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}