import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState } from '../../store/store';
import { createLeaveThunk } from '../../store/leaves/leavesThunks';
import { toast } from 'react-toastify';

// Defines the structure for field-specific errors
interface FormErrors {
  startDate?: string;
  endDate?: string;
  reason?: string;
  form?: string; // For general/API errors
}

export default function ApplyLeaveContent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.leaves);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const today = new Date();
    // Normalize date to midnight for accurate comparison
    today.setHours(0, 0, 0, 0); 
    
    // 1. Required fields validation
    if (!startDate) newErrors.startDate = 'From Date is required.';
    if (!endDate) newErrors.endDate = 'To Date is required.';
    if (!reason) newErrors.reason = 'Reason is required.';

    // 2. Past Date Validation
    if (startDate && new Date(startDate) < today) {
      newErrors.startDate = 'From Date cannot be in the past.';
    }
    if (endDate && new Date(endDate) < today) {
      newErrors.endDate = 'To Date cannot be in the past.';
    }
    
    // 3. Date Range Validation (Run only if dates are present and not already marked as past dates)
    if (startDate && endDate && !newErrors.startDate && !newErrors.endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        newErrors.form = 'The "From Date" cannot be after the "To Date".';
        toast.warn(newErrors.form);
      }
    }
    
    setErrors(newErrors);

    // Stop submission if validation failed
    if (Object.keys(newErrors).length > 0) {
      if (!newErrors.form) toast.error('Please fix the errors in the form.');
      return;
    }

    // Clear previous errors and dispatch action
    setErrors({}); 

    dispatch(createLeaveThunk({ startDate, endDate, reason }))
      .unwrap()
      .then(() => {
        toast.success('Leave request submitted successfully!');
        navigate('/dashboard/planner');
      })
      .catch((err) => {
        const apiError = err || 'An unknown error occurred.';
        toast.error(apiError);
        setErrors({ form: apiError }); 
      });
  };

  // Helper for date input change
  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof FormErrors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setErrors(prev => ({ ...prev, [field]: undefined, form: undefined }));
  };

  // Helper for reason textarea change
  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    setErrors(prev => ({ ...prev, reason: undefined, form: undefined }));
  };

  return (
    <div className="card shadow-sm modern-card" style={{ maxWidth: '700px', margin: 'auto' }}>
      <div className="card-header gradient-header">
        <div className="d-flex align-items-center">
          <div className="icon-wrapper me-3">
            <i className="bi bi-calendar-plus"></i>
          </div>
          <h4 className="mb-0">Apply for Leave</h4>
        </div>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {errors.form && (
            <div className="alert alert-danger d-flex align-items-center mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {errors.form}
            </div>
          )}
          
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label fw-semibold">
                <i className="bi bi-calendar-event me-2"></i>From Date
              </label>
              <input 
                type="date" 
                className={`form-control form-control-lg modern-input ${errors.startDate ? 'is-invalid' : ''}`} 
                id="startDate" 
                value={startDate}
                onChange={handleDateChange(setStartDate, 'startDate')}
              />
              {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label fw-semibold">
                <i className="bi bi-calendar-check me-2"></i>To Date
              </label>
              <input 
                type="date" 
                className={`form-control form-control-lg modern-input ${errors.endDate ? 'is-invalid' : ''}`} 
                id="endDate" 
                value={endDate}
                onChange={handleDateChange(setEndDate, 'endDate')}
              />
              {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="form-label fw-semibold">
              <i className="bi bi-pencil-square me-2"></i>Reason
            </label>
            <textarea 
              className={`form-control modern-input ${errors.reason ? 'is-invalid' : ''}`} 
              id="reason" 
              rows={4}
              placeholder="Enter reason for leave..."
              value={reason}
              onChange={handleReasonChange}
            ></textarea>
            {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button 
              type="button" 
              className="btn btn-secondary modern-btn" 
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-x-circle me-2"></i>Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary modern-btn" 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}