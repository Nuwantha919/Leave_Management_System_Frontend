import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/store';
import { fetchMyLeavesThunk } from '../../store/leaves/leavesThunks';
import LeaveTable from './components/LeaveTable';

export default function LeavePlannerContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, status, error } = useSelector((state: RootState) => state.leaves);

  // Fetch data from the API when the component loads
  useEffect(() => {
    // Only fetch if the data is not already loaded or loading
    if (status === 'idle') {
      dispatch(fetchMyLeavesThunk());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="text-center p-5">Loading your leave requests...</div>;
  } else if (status === 'succeeded') {
    content = <LeaveTable leaves={leaves} isAdminView={false} />;
  } else if (status === 'failed') {
    content = <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">My Leave Planner & History</h4>
        <Link to="/dashboard/apply" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Apply for Leave
        </Link>
      </div>
      <div className="card-body">
        {content}
      </div>
    </div>
  );
}