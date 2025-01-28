import './App.css'
import { Box, Container, Link, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'secondary.main',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
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