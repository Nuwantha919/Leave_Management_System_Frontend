import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeaveTable, { type Leave } from './components/LeaveTable';

// Mock data representing only the logged-in employee's leaves
const mockMyLeaves: Leave[] = [
  { id: 2, employeeName: 'employee', reason: 'Doctor\'s appointment', startDate: '2025-11-15', endDate: '2025-11-15', status: 'PENDING' },
  { id: 5, employeeName: 'employee', reason: 'Personal', startDate: '2025-12-05', endDate: '2025-12-06', status: 'APPROVED' },
  { id: 8, employeeName: 'employee', reason: 'Conference', startDate: '2025-10-20', endDate: '2025-10-22', status: 'REJECTED' },
];

export default function LeavePlannerContent() {
  // We remove 'setLeaves' since it's not used yet
  const [leaves] = useState<Leave[]>(mockMyLeaves);

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">My Leave Planner & History</h4>
        <Link to="/dashboard/apply" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Apply for Leave
        </Link>
      </div>
      <div className="card-body">
        <LeaveTable leaves={leaves} isAdminView={false} />
      </div>
    </div>
  );
}