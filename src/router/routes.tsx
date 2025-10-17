// src/router/routes.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

// Import all the components that will be rendered inside the dashboard
import DashboardContent from '../pages/dashboard/DashboardContent';
import LeavePlannerContent from '../pages/dashboard/LeavePlannerContent';
import ApplyLeaveContent from '../pages/dashboard/ApplyLeaveContent';
import ReviewAllLeaves from '../pages/dashboard/ReviewAllLeaves';
import AdminManageContent from '../pages/dashboard/AdminManageContent';

export const router = createBrowserRouter([
  { 
    path: '/login', 
    element: <Login /> 
  },
  {
    path: '/',
    element: <ProtectedRoute />, 
    children: [
      {
        path: 'dashboard', 
        element: <Dashboard />,
        // These are the nested routes that will render inside the Dashboard's <Outlet />
        children: [
          { 
            index: true, // This makes DashboardContent the default for "/dashboard"
            element: <DashboardContent /> 
          },
          { 
            path: 'planner', 
            element: <LeavePlannerContent /> 
          },
          { 
            path: 'apply', 
            element: <ApplyLeaveContent /> 
          },
          { 
            path: 'review-all', 
            element: <ReviewAllLeaves /> 
          },
          { 
            path: 'manage-users', 
            element: <AdminManageContent /> 
          },
        ]
      },
      // Automatically redirect from the root path '/' to '/dashboard'
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      }
    ]
  },
  // A catch-all route to redirect any unknown path back to the dashboard
  { 
    path: '*', 
    element: <Navigate to="/dashboard" replace />,
  }, 
]);