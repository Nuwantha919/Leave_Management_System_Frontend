// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

/**
 * A wrapper component that checks for user authentication status.
 * Renders the children (Dashboard in this case) if authenticated,
 * otherwise redirects to the login page.
 */
interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Check the global authentication state
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // You might want to show a loading spinner if auth status is still resolving (e.g., checking localStorage)
  // For now, let's assume the check is fast/done in initial state:
  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // User is not logged in, redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child route content.
  return children ? <>{children}</> : <Outlet />;
}