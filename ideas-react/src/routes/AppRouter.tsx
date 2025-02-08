import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import { useAuth } from "../auth/UseAuth.tsx";
import { AppLayout } from '../AppLayout';
import Signup from "../pages/Signup.tsx";
import Ideas from '../pages/Ideas.tsx';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/ideas" replace /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ideas" element={<PrivateRoute><Ideas /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={user ? "/ideas" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
