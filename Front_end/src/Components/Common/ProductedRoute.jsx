import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export default function ProductedRoute({ children, role }) {
  const { user } = useSelector(state => state.auth);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
