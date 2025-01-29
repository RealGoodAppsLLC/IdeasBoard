import { Box, Container, Typography } from '@mui/material';

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
          Material UI Vite.js example in TypeScript
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}