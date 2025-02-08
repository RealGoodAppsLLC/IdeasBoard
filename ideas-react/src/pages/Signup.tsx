import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/UseAuth.tsx";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password);
      navigate("/ideas"); // Redirect after signup
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              fullWidth
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
