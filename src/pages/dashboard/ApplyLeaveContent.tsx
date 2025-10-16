// src/pages/dashboard/ApplyLeaveContent.tsx
import React, { useState } from 'react';

export default function ApplyLeaveContent() {
  // State to hold the form data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the browser from reloading

    // Basic validation
    if (!fromDate || !toDate || !reason) {
      setError('All fields are required.');
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setError('The "From Date" cannot be after the "To Date".');
      return;
    }
    setError('');

    // For now, we'll just log the data to the console.
    // Later, you will dispatch a Redux action here.
    console.log({
      fromDate,
      toDate,
      reason,
    });

    alert('Leave request submitted successfully!');
    // Optionally, clear the form
    setFromDate('');
    setToDate('');
    setReason('');
  };

  return (
    <div className="card shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-header">
        <h4 className="mb-0">Apply for Leave</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="fromDate" className="form-label">From Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="fromDate" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="toDate" className="form-label">To Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="toDate" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
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
            <button type="button" className="btn btn-secondary me-2">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}