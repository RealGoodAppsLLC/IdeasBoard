import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAuth } from "../auth/UseAuth.tsx";
import { Idea } from "../types/ideas.models.ts"; // Get user info

const IdeasPage = () => {
  const { user, fetchAuthed } = useAuth(); // Get logged-in user
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        console.log(`${import.meta.env.VITE_IDEAS_BOARD_API_BASE}/ideas`);
        const response = await fetchAuthed(`${import.meta.env.VITE_IDEAS_BOARD_API_BASE}/ideas`);
        if (!response.ok) throw new Error("Failed to fetch ideas");

        const data: Idea[] = await response.json();
        setIdeas(data);
      } catch (err) {
        setError("Failed to fetch ideas.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [fetchAuthed]);

  const handleLike = async (idea: Idea) => {
    if (!user) {
      setError("You must be logged in to like ideas.");
      return;
    }

    try {
      const response = await fetchAuthed(`${import.meta.env.VITE_IDEAS_BOARD_API_BASE}/ideas/${idea.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to like idea");

      setIdeas((prevIdeas) =>
        prevIdeas.map((_idea) =>
          _idea.id === idea.id
            ? { ...idea, likes: idea.likes + 1 }
            : idea
        )
      );
    } catch (err) {
      setError("Failed to like idea. Please try again.");
    }
  };

  const handleCreateIdea = async () => {
    if (!user) {
      setError("You must be logged in to create an idea.");
      return;
    }

    if (!newTitle.trim() || !newDescription.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetchAuthed(`${import.meta.env.VITE_IDEAS_BOARD_API_BASE}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      if (!response.ok) throw new Error("Failed to create idea");

      const newIdea: Idea = await response.json();
      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]); // Add new idea at the top

      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      setError("Failed to create idea. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", padding: 2 }}>
      <Container maxWidth="md">
        {/* New Idea Box */}
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create a New Idea
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={2}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCreateIdea}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Paper>

        {/* Ideas List */}
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Ideas
        </Typography>

        {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
        {ideas.map((idea) => (
          <Paper
            key={idea.id}
            elevation={3}
            sx={{ padding: 2, marginBottom: 2, display: "flex", alignItems: "center" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{idea.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(idea.timestampCreated).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {idea.description}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {idea.likes} likes
              </Typography>
            </Box>
            <IconButton
              color="primary"
              onClick={() => handleLike(idea)}
            >
              <ThumbUpIcon />
            </IconButton>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default IdeasPage;
