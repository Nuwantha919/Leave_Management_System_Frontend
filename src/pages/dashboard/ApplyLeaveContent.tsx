import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState } from '../../store/store';
import { createLeaveThunk } from '../../store/leaves/leavesThunks';

export default function ApplyLeaveContent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.leaves);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !reason) {
      setFormError('All fields are required.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setFormError('The "From Date" cannot be after the "To Date".');
      return;
    }
    setFormError('');

    dispatch(createLeaveThunk({ startDate, endDate, reason }))
      .unwrap()
      .then(() => {
        alert('Leave request submitted successfully!');
        navigate('/dashboard/planner'); // Redirect on success
      })
      .catch((err) => {
        // The error from the thunk is handled by the slice, but we can show it in the form too
        setFormError(err || 'An unknown error occurred.');
      });
  };

  return (
    <div className="card shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-header">
        <h4 className="mb-0">Apply for Leave</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {formError && <div className="alert alert-danger">{formError}</div>}
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">From Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="startDate" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label">To Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="endDate" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reason" className="form-label">Reason</label>
            <textarea 
              className="form-control" 
              id="reason" 
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2" 
              onClick={() => navigate(-1)} // Go back to the previous page
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}