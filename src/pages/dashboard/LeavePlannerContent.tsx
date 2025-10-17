import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchMyLeavesThunk } from '../../store/leaves/leavesThunks';
import LeaveTable from './components/LeaveTable';
import Pagination from './components/Pagination';

export default function LeavePlannerContent() {
  const dispatch = useDispatch<AppDispatch>();

  const { leaves, status, error } = useSelector((state: RootState) => state.leaves);
  const { username: loggedInUsername } = useSelector((state: RootState) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    if (status !== 'succeeded') {
      dispatch(fetchMyLeavesThunk());
    }
  }, [status, dispatch]);

  const myLeaves = leaves.filter(leave => leave.employeeName === loggedInUsername);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = myLeaves.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(myLeaves.length / recordsPerPage);

  let content;

  if (status === 'loading') {
    content = <div className="text-center p-5">Loading your leave requests...</div>;
  } else if (status === 'succeeded') {
    if (myLeaves.length === 0) {
      content = <div className="text-center p-5">You have not applied for any leaves yet.</div>;
    } else {
      content = (
        <>
          <LeaveTable leaves={currentRecords} isAdminView={false} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      );
    }
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