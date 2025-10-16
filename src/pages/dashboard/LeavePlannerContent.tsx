// src/pages/dashboard/LeavePlannerContent.tsx
import React, { useState } from 'react';

// Define a type for a single leave record for type safety
type Leave = {
  id: number;
  employeeName: string;
  leaveType: 'Annual' | 'Sick' | 'Casual' | 'Unpaid';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

// Dummy data to simulate fetching from an API
const mockLeaves: Leave[] = [
  { id: 1, employeeName: 'John Doe', leaveType: 'Annual', startDate: '2025-11-10', endDate: '2025-11-12', status: 'Approved' },
  { id: 2, employeeName: 'Jane Smith', leaveType: 'Sick', startDate: '2025-11-15', endDate: '2025-11-15', status: 'Pending' },
  { id: 3, employeeName: 'Peter Jones', leaveType: 'Casual', startDate: '2025-12-01', endDate: '2025-12-02', status: 'Approved' },
  { id: 4, employeeName: 'Mary Williams', leaveType: 'Annual', startDate: '2025-11-20', endDate: '2025-11-25', status: 'Rejected' },
];

export default function LeavePlannerContent() {
  // Use state to hold the leave data. This is where you'll store data from your API.
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);

  // Placeholder functions for button actions
  const handleUpdate = (id: number) => {
    alert(`Update action for leave ID: ${id}`);
    // Later, this will open an edit modal or navigate to an edit page
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this leave record?')) {
      alert(`Delete action for leave ID: ${id}`);
      // Later, this will make an API call to delete the record
      setLeaves(leaves.filter(leave => leave.id !== id));
    }
  };
  
  // Helper function to get badge color based on status
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
          <i className="bi bi-plus-circle me-2"></i>Apply for Leave
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Leave Type</th>
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
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>
                    <span className={getStatusBadge(leave.status)}>{leave.status}</span>
                  </td>
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
        
        {/*
          PAGINATION will go here later. 
          You can add a component here that controls the state of the displayed data.
        */}
      </div>
    </div>
  );
}