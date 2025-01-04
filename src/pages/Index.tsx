import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { Calendar } from "@/components/scheduling/Calendar";
import { MeetingForm } from "@/components/scheduling/MeetingForm";
import { UpcomingMeetings } from "@/components/scheduling/UpcomingMeetings";
import { Meeting } from "@/types/meeting";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const handleScheduleMeeting = (meeting: {
    title: string;
    description: string;
    startTime: Date;
  }) => {
    const newMeeting: Meeting = {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
    </Container>
  );
};

export default Index;