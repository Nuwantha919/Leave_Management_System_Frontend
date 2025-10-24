import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchAllLeavesPaginatedThunk } from '../../store/leaves/leavesThunks';
import LeaveTable from './components/LeaveTable';
import Pagination from './components/Pagination';

export default function ReviewAllLeaves() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, status, error, totalPages } = useSelector((state: RootState) => state.leaves);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [page, setPage] = useState(1); // UI uses 1-indexed pages
  const recordsPerPage = 10;

  // Fetch data whenever filters or page changes
  useEffect(() => {
    dispatch(fetchAllLeavesPaginatedThunk({
      page: page - 1, // Backend uses 0-indexed pages
      size: recordsPerPage,
      employeeName: nameFilter || undefined,
      status: statusFilter !== 'ALL' ? statusFilter : undefined
    }));
  }, [dispatch, page, statusFilter, nameFilter]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, nameFilter]);

  let content;

  if (status === 'loading') {
    content = <div className="text-center p-5">Loading all leave requests...</div>;
  } else if (status === 'succeeded') {
    content = <LeaveTable leaves={leaves} isAdminView={true} />;
  } else if (status === 'failed') {
    content = <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card shadow-sm modern-card">
      <div className="card-header gradient-header">
        <div className="d-flex align-items-center">
          <div className="icon-wrapper me-3">
            <i className="bi bi-clipboard-check"></i>
          </div>
          <h4 className="mb-0">Review All Employee Leaves</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div className="input-group modern-input-group" style={{ maxWidth: '350px' }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Filter by employee name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="btn-group shadow-sm" role="group">
            <button 
              className={`btn ${statusFilter === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`} 
              onClick={() => setStatusFilter('ALL')}
            >
              All
            </button>
            <button 
              className={`btn ${statusFilter === 'PENDING' ? 'btn-warning' : 'btn-outline-warning'}`} 
              onClick={() => setStatusFilter('PENDING')}
            >
              Pending
            </button>
            <button 
              className={`btn ${statusFilter === 'APPROVED' ? 'btn-success' : 'btn-outline-success'}`} 
              onClick={() => setStatusFilter('APPROVED')}
            >
              Approved
            </button>
            <button 
              className={`btn ${statusFilter === 'REJECTED' ? 'btn-danger' : 'btn-outline-danger'}`} 
              onClick={() => setStatusFilter('REJECTED')}
            >
              Rejected
            </button>
          </div>
        </div>
        
        {content}

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}