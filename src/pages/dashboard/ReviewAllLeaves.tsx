import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/store';
import { fetchAllLeavesThunk } from '../../store/leaves/leavesThunks';
import LeaveTable, { type Leave } from './components/LeaveTable';

export default function ReviewAllLeaves() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, status, error } = useSelector((state: RootState) => state.leaves);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    // We fetch all leaves every time this component is visited to ensure data is fresh
    dispatch(fetchAllLeavesThunk());
  }, [dispatch]);

  const filteredLeaves = leaves.filter((leave: Leave) => {
    if (filter === 'ALL') return true;
    return leave.status === filter;
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
        <div className="d-flex justify-content-end mb-3">
          <div className="btn-group">
            <button className={`btn btn-outline-secondary ${filter === 'ALL' && 'active'}`} onClick={() => setFilter('ALL')}>All</button>
            <button className={`btn btn-outline-warning ${filter === 'PENDING' && 'active'}`} onClick={() => setFilter('PENDING')}>Pending</button>
            <button className={`btn btn-outline-success ${filter === 'APPROVED' && 'active'}`} onClick={() => setFilter('APPROVED')}>Approved</button>
            <button className={`btn btn-outline-danger ${filter === 'REJECTED' && 'active'}`} onClick={() => setFilter('REJECTED')}>Rejected</button>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}