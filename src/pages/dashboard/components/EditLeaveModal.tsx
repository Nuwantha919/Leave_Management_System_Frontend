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
    <div className="modal show" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modern-card shadow-lg border-0">
          <div className="modal-header gradient-header border-0">
            <h5 className="modal-title d-flex align-items-center mb-0">
              <div className="icon-wrapper me-3" style={{ fontSize: '1rem' }}>
                <i className="bi bi-pencil-square"></i>
              </div>
              Edit Leave Request
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="editStartDate" className="form-label fw-semibold">
                  <i className="bi bi-calendar-event me-2"></i>From Date
                </label>
                <input
                  type="date"
                  className="form-control modern-input"
                  id="editStartDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editEndDate" className="form-label fw-semibold">
                  <i className="bi bi-calendar-check me-2"></i>To Date
                </label>
                <input
                  type="date"
                  className="form-control modern-input"
                  id="editEndDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editReason" className="form-label fw-semibold">
                  <i className="bi bi-pencil-square me-2"></i>Reason
                </label>
                <textarea
                  className="form-control modern-input"
                  id="editReason"
                  rows={3}
                  placeholder="Enter reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer border-0 px-0 pt-3">
                <button type="button" className="btn btn-secondary modern-btn" onClick={onHide}>
                  <i className="bi bi-x-circle me-2"></i>Close
                </button>
                <button type="submit" className="btn btn-primary modern-btn">
                  <i className="bi bi-check-circle me-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}