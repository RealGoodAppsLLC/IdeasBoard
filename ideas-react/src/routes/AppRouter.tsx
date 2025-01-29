import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useAuth } from '../auth/UseAuth.tsx';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
