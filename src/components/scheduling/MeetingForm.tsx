import { useState } from "react";
import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { formatTime, formatDate } from "@/utils/date";
import { useToast } from "@/hooks/use-toast";

interface MeetingFormProps {
  selectedTime?: Date;
  onSubmit: (meeting: {
    title: string;
    description: string;
    startTime: Date;
  }) => void;
  onCancel: () => void;
}

export const MeetingForm = ({
  selectedTime,
  onSubmit,
  onCancel,
}: MeetingFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  if (!selectedTime) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting title",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title,
      description,
      startTime: selectedTime,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Schedule Meeting
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {formatDate(selectedTime)} at {formatTime(selectedTime)}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Meeting Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Schedule Meeting
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};