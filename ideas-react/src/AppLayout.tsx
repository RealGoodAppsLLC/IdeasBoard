import React from "react";
import { Link, useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from './auth/UseAuth.tsx';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          {/* Left-aligned Icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Centered Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Ideas Board
            </Link>
          </Typography>

          {/* Right-aligned Auth Buttons */}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Page Content: No vertical centering */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
