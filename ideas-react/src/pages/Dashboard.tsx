import {
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth } from '../auth/UseAuth.tsx';
import { useCallback } from 'react';

const Dashboard = () => {
  const { user, fetchAuthed } = useAuth();

  const onClick = useCallback(async () => {
    if (!user) {
      return;
    }

    const response = await fetchAuthed("http://localhost:3000/ideas", {
      method: 'GET',
      headers: {

      }
    });

    console.log(response);
  }, [user, fetchAuthed]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Dashboard
        </Typography>
      </Paper>
      <Button variant="contained" color="primary" onClick={onClick} />
    </Container>
  );
};

export default Dashboard;
