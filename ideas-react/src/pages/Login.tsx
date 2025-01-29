import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  TextField,
  Button,
  Container,
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { auth } from '../config/firebase.ts';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  // Handle Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }

    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login with Redirect
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider); // Redirects user to Google
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      setLoading(false);
    }
  };

  // Process login after Google Redirect
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        setLoading(true);
        await getRedirectResult(auth);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    void handleRedirect();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Log In"}
            </Button>
          </Box>
        </form>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<Google />}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
