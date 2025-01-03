import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Calendar } from "../components/scheduling/Calendar";
import { MeetingForm } from "../components/scheduling/MeetingForm";
import { UpcomingMeetings } from "../components/scheduling/UpcomingMeetings";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedTime, setSelectedTime] = useState();
  const [meetings, setMeetings] = useState([]);
  const { toast } = useToast();

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleScheduleMeeting = (meeting) => {
    const newMeeting = {
      id: Math.random().toString(36).substr(2, 9),
      ...meeting,
      duration: 30,
      participants: {
        freelancerId: "freelancer-1",
        clientId: "client-1",
      },
    };

    setMeetings([...meetings, newMeeting]);
    setSelectedTime(undefined);

    toast({
      title: "Success",
      description: "Meeting scheduled successfully!",
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Schedule a Meeting
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Calendar onTimeSelect={handleTimeSelect} />
        
        {selectedTime && (
          <MeetingForm
            selectedTime={selectedTime}
            onSubmit={handleScheduleMeeting}
            onCancel={() => setSelectedTime(undefined)}
          />
        )}

        <UpcomingMeetings meetings={meetings} />
      </Box>
    </Box>
  );
};

export default Index;