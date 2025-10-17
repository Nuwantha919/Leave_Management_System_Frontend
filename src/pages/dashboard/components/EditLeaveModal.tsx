import React, { useState, useEffect } from 'react';
import { type Leave } from './LeaveTable'; // Assuming Leave type is exported from LeaveTable

interface EditLeaveModalProps {
  show: boolean;
  onHide: () => void;
  leave: Leave | null;
  onSaveChanges: (updatedData: { startDate: string; endDate: string; reason: string }) => void;
}

export default function EditLeaveModal({ show, onHide, leave, onSaveChanges }: EditLeaveModalProps) {
  // Local state for the form fields
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // This effect pre-fills the form whenever a new 'leave' is passed in
  useEffect(() => {
    if (leave) {
      setStartDate(leave.startDate);
      setEndDate(leave.endDate);
      setReason(leave.reason);
      setError(''); // Clear any previous errors
    }
  }, [leave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!startDate || !endDate || !reason) {
      setError('All fields are required.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('The "From Date" cannot be after the "To Date".');
      return;
    }
    setError('');

    // Call the save handler passed from the parent component
    onSaveChanges({ startDate, endDate, reason });
  };

  if (!show || !leave) {
    return null; // Don't render anything if the modal is hidden or there's no leave data
  }

  return (
    <div className="modal show" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Leave Request</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <div className="mb-3">
                <label htmlFor="editStartDate" className="form-label">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="editStartDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editEndDate" className="form-label">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="editEndDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editReason" className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  id="editReason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}