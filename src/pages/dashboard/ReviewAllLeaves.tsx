import React, { useState } from 'react';
import LeaveTable, { type Leave } from './components/LeaveTable';

// Mock data for all employees
const mockAllLeaves: Leave[] = [
  { id: 1, employeeName: 'John Doe', reason: 'Family vacation', startDate: '2025-11-10', endDate: '2025-11-12', status: 'APPROVED' },
  { id: 2, employeeName: 'employee', reason: 'Doctor\'s appointment', startDate: '2025-11-15', endDate: '2025-11-15', status: 'PENDING' },
  { id: 3, employeeName: 'Peter Jones', reason: 'Personal errand', startDate: '2025-12-01', endDate: '2025-12-02', status: 'APPROVED' },
  { id: 4, employeeName: 'Mary Williams', reason: 'Extended holiday', startDate: '2025-11-20', endDate: '2025-11-25', status: 'REJECTED' },
  { id: 6, employeeName: 'David Lee', reason: 'Sick leave', startDate: '2025-10-18', endDate: '2025-10-18', status: 'PENDING' },
];

export default function ReviewAllLeaves() {
  const [leaves, setLeaves] = useState<Leave[]>(mockAllLeaves);
  const [filter, setFilter] = useState<string>('ALL'); // For future filtering

  // This will be used later to filter data from Redux/API
  const filteredLeaves = leaves.filter(leave => {
    if (filter === 'ALL') return true;
    return leave.status === filter;
  });
  
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="mb-0">Review All Employee Leaves</h4>
      </div>
      <div className="card-body">
        {/* Filter Controls */}
        <div className="d-flex justify-content-end mb-3">
            <div className="btn-group">
                <button className={`btn btn-outline-secondary ${filter === 'ALL' && 'active'}`} onClick={() => setFilter('ALL')}>All</button>
                <button className={`btn btn-outline-warning ${filter === 'PENDING' && 'active'}`} onClick={() => setFilter('PENDING')}>Pending</button>
                <button className={`btn btn-outline-success ${filter === 'APPROVED' && 'active'}`} onClick={() => setFilter('APPROVED')}>Approved</button>
                <button className={`btn btn-outline-danger ${filter === 'REJECTED' && 'active'}`} onClick={() => setFilter('REJECTED')}>Rejected</button>
            </div>
        </div>
        
        {/* We use the reusable table and tell it to show the admin view */}
        <LeaveTable leaves={filteredLeaves} isAdminView={true} />
      </div>
    </div>
  );
}