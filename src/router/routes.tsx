
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  { 
    path: '/login', 
    element: <Login /> 
  },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />
  // },
  {
    // Protect the dashboard and all future main app routes
    element: <ProtectedRoute />, 
    children: [
      {
        path: '/dashboard', // The main authenticated route
        element: <Dashboard />,
      },
      {
        path: '/', // Redirect root path to dashboard if authenticated
        element: <Dashboard />,
      },
      // You will add more protected routes here later, e.g., /leaves, /apply
    ]
  },
  { 
    path: '*', 
    element: <ProtectedRoute>
              {/* Optional: Add a 404 page here */}
              <Dashboard /> 
            </ProtectedRoute>, // Ensure unknown paths also go through auth check
  }, 
]);