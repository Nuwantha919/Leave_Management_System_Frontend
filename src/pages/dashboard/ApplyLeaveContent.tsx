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
    <div className="card shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
      <div className="card-header">
        <h4 className="mb-0">Apply for Leave</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {errors.form && <div className="alert alert-danger small p-2">{errors.form}</div>}
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">From Date</label>
              <input 
                type="date" 
                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`} 
                id="startDate" 
                value={startDate}
                onChange={handleDateChange(setStartDate, 'startDate')}
              />
              {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label">To Date</label>
              <input 
                type="date" 
                className={`form-control ${errors.endDate ? 'is-invalid' : ''}`} 
                id="endDate" 
                value={endDate}
                onChange={handleDateChange(setEndDate, 'endDate')}
              />
              {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reason" className="form-label">Reason</label>
            <textarea 
              className={`form-control ${errors.reason ? 'is-invalid' : ''}`} 
              id="reason" 
              rows={4}
              value={reason}
              onChange={handleReasonChange}
            ></textarea>
            {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
          </div>

          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}