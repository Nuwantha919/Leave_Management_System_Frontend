import { useState } from 'react'; // Import useState
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { type AppDispatch } from '../../../store/store';
import { 
  updateLeaveStatusThunk, 
  deleteLeaveThunk,
  editLeaveThunk // Import the new thunk
} from '../../../store/leaves/leavesThunks';
import EditLeaveModal from './EditLeaveModal'; // Import the modal component

export type Leave = {
  id: number;
  employeeName: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

interface LeaveTableProps {
  leaves: Leave[];
  isAdminView: boolean;
}

export default function LeaveTable({ leaves, isAdminView }: LeaveTableProps) {
  const dispatch = useDispatch<AppDispatch>();

  // State to manage the modal's visibility and selected leave
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  const handleApprove = async (id: number) => {
    try {
      await dispatch(updateLeaveStatusThunk({ id, status: 'APPROVED' })).unwrap();
      toast.success('Leave request approved successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch {
      toast.error('Failed to approve leave request. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await dispatch(updateLeaveStatusThunk({ id, status: 'REJECTED' })).unwrap();
      toast.info('Leave request rejected.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch {
      toast.error('Failed to reject leave request. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  
  // This function now opens the modal with the selected leave's data
  const handleEditClick = (leave: Leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };
  
  const handleCancel = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      try {
        await dispatch(deleteLeaveThunk(id)).unwrap();
        toast.success('Leave request cancelled successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch {
        toast.error('Failed to cancel leave request. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  // This function is called from the modal to dispatch the update action
  const handleSaveChanges = async (updatedData: { startDate: string; endDate: string; reason: string }) => {
    if (selectedLeave) {
      try {
        await dispatch(editLeaveThunk({ id: selectedLeave.id, updatedData })).unwrap();
        toast.success('Leave request updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsModalOpen(false); // Close the modal on save
        setSelectedLeave(null);
      } catch {
        toast.error('Failed to update leave request. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const getStatusBadge = (status: Leave['status']) => {
    switch (status) {
      case 'APPROVED': return 'badge bg-success';
      case 'PENDING': return 'badge bg-warning text-dark';
      case 'REJECTED': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    // Wrap the JSX in a React Fragment to include the modal
    <>
      <div className="table-responsive">
        <table className="table table-hover align-middle modern-table">
          <thead>
            <tr>
              {isAdminView && <th scope="col">Employee Name</th>}
              <th scope="col">Dates</th>
              <th scope="col">Reason</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdminView ? 5 : 4} className="text-center p-5">
                  <div className="text-muted">
                    <i className="bi bi-inbox display-1 d-block mb-3 opacity-25"></i>
                    <p className="mb-0">No leave requests found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id} className="table-row-hover">
                  {isAdminView && <td className="fw-medium">{leave.employeeName}</td>}
                  <td>
                    <i className="bi bi-calendar-range me-2 text-muted"></i>
                    {leave.startDate} to {leave.endDate}
                  </td>
                  <td className="text-muted">{leave.reason}</td>
                  <td><span className={getStatusBadge(leave.status)}>{leave.status}</span></td>
                  <td className="text-end">
                    {isAdminView ? (
                      leave.status === 'PENDING' && (
                        <>
                          <button className="btn btn-sm btn-success modern-btn me-2" onClick={() => handleApprove(leave.id)}>
                            <i className="bi bi-check-lg me-1"></i> Approve
                          </button>
                          <button className="btn btn-sm btn-danger modern-btn" onClick={() => handleReject(leave.id)}>
                            <i className="bi bi-x-lg me-1"></i> Reject
                          </button>
                        </>
                      )
                    ) : (
                      leave.status === 'PENDING' && (
                        <>
                          {/* The Edit button now opens the modal */}
                          <button 
                            className="btn btn-sm btn-outline-primary modern-btn me-2" 
                            onClick={() => handleEditClick(leave)}
                          >
                            <i className="bi bi-pencil-square me-1"></i> Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger modern-btn" onClick={() => handleCancel(leave.id)}>
                            <i className="bi bi-trash me-1"></i> Cancel
                          </button>
                        </>
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Render the modal component */}
      <EditLeaveModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        leave={selectedLeave}
        onSaveChanges={handleSaveChanges}
      />
    </>
  );
}