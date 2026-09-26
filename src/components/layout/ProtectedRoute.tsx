import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, userProfile, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-400">
        <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // If route requires admin, check authoritative isAdmin
    if (allowedRoles.includes('admin') && isAdmin) {
      return <>{children}</>;
    }

    // If user has not loaded or role not matched, deny access securely
    if (!userProfile || !allowedRoles.includes(userProfile.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
