import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchAllLeavesThunk } from '../../store/leaves/leavesThunks';
import LeaveTable, { type Leave } from './components/LeaveTable';
import Pagination from './components/Pagination';

export default function ReviewAllLeaves() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaves, status, error } = useSelector((state: RootState) => state.leaves);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllLeavesThunk());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, nameFilter]);

  const filteredLeaves = leaves
    .filter((leave: Leave) => {
      if (statusFilter === 'ALL') return true;
      return leave.status === statusFilter;
    })
    .filter((leave: Leave) => {
      if (nameFilter === '') return true;
      return leave.employeeName.toLowerCase().includes(nameFilter.toLowerCase());
    });

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLeaves.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredLeaves.length / recordsPerPage);

  let content;

  if (status === 'loading') {
    content = <div className="text-center p-5">Loading all leave requests...</div>;
  } else if (status === 'succeeded') {
    // Pass the paginated records to the table
    content = <LeaveTable leaves={currentRecords} isAdminView={true} />;
  } else if (status === 'failed') {
    content = <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="mb-0">Review All Employee Leaves</h4>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
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
          <div className="btn-group">
            <button className={`btn btn-outline-secondary ${statusFilter === 'ALL' && 'active'}`} onClick={() => setStatusFilter('ALL')}>All</button>
            <button className={`btn btn-outline-warning ${statusFilter === 'PENDING' && 'active'}`} onClick={() => setStatusFilter('PENDING')}>Pending</button>
            <button className={`btn btn-outline-success ${statusFilter === 'APPROVED' && 'active'}`} onClick={() => setStatusFilter('APPROVED')}>Approved</button>
            <button className={`btn btn-outline-danger ${statusFilter === 'REJECTED' && 'active'}`} onClick={() => setStatusFilter('REJECTED')}>Rejected</button>
          </div>
        </div>
        
        {content}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}