// src/pages/dashboard/ReviewAllLeaves.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchAllLeavesThunk } from '../../store/leaves/leavesThunks';
import LeaveTable, { type Leave } from './components/LeaveTable';

export default function ReviewAllLeaves() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, status, error } = useSelector((state: RootState) => state.leaves);
  
  // State for the status filter
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  // --- NEW: State for the name filter ---
  const [nameFilter, setNameFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllLeavesThunk());
  }, [dispatch]);

  // --- UPDATED: Chained filtering logic ---
  const filteredLeaves = leaves
    .filter((leave: Leave) => {
      // First, filter by status
      if (statusFilter === 'ALL') return true;
      return leave.status === statusFilter;
    })
    .filter((leave: Leave) => {
      // Then, filter the result by employee name (case-insensitive)
      if (nameFilter === '') return true;
      return leave.employeeName.toLowerCase().includes(nameFilter.toLowerCase());
    });

  let content;

  if (status === 'loading') {
    content = <div className="text-center p-5">Loading all leave requests...</div>;
  } else if (status === 'succeeded') {
    content = <LeaveTable leaves={filteredLeaves} isAdminView={true} />;
  } else if (status === 'failed') {
    content = <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="mb-0">Review All Employee Leaves</h4>
      </div>
      <div className="card-body">
        {/* Filter Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          
          {/* --- NEW: Search Input Field --- */}
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by employee name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="btn-group">
            <button className={`btn btn-outline-secondary ${statusFilter === 'ALL' && 'active'}`} onClick={() => setStatusFilter('ALL')}>All</button>
            <button className={`btn btn-outline-warning ${statusFilter === 'PENDING' && 'active'}`} onClick={() => setStatusFilter('PENDING')}>Pending</button>
            <button className={`btn btn-outline-success ${statusFilter === 'APPROVED' && 'active'}`} onClick={() => setStatusFilter('APPROVED')}>Approved</button>
            <button className={`btn btn-outline-danger ${statusFilter === 'REJECTED' && 'active'}`} onClick={() => setStatusFilter('REJECTED')}>Rejected</button>
          </div>
        </div>
        
        {content}
      </div>
    </div>
  );
}