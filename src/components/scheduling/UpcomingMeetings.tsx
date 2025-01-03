import { Paper, Typography, Box, Divider } from "@mui/material";
import { Meeting } from "@/types/meeting";
import { formatTime, formatDate } from "@/utils/date";

interface UpcomingMeetingsProps {
  meetings: Meeting[];
}

export const UpcomingMeetings = ({ meetings }: UpcomingMeetingsProps) => {
  if (meetings.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography align="center" color="text.secondary">
          No upcoming meetings
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Meetings
      </Typography>
      <Box sx={{ mt: 2 }}>
        {meetings.map((meeting, index) => (
          <Box key={meeting.id}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Box sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' } }}>
              <Typography variant="subtitle1">
                {meeting.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(meeting.startTime)} at {formatTime(meeting.startTime)}
              </Typography>
              {meeting.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {meeting.description}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};