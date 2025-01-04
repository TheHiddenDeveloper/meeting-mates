import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { Calendar } from "@/components/scheduling/Calendar";
import { MeetingForm } from "@/components/scheduling/MeetingForm";
import { UpcomingMeetings } from "@/components/scheduling/UpcomingMeetings";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";

const Index = () => {
  const [selectedTime, setSelectedTime] = useState();
  const { toast } = useToast();

  // Fetch meetings
  const { data: meetings = [], refetch: refetchMeetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const response = await fetch('/meetings');
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      return response.json();
    },
  });

  // Create meeting mutation
  const createMeetingMutation = useMutation({
    mutationFn: async (meetingData) => {
      const response = await fetch('/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });
      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }
      return response.json();
    },
    onSuccess: () => {
      refetchMeetings();
      toast({
        title: "Success",
        description: "Meeting scheduled successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleScheduleMeeting = (meeting) => {
    createMeetingMutation.mutate({
      title: meeting.title,
      date: meeting.startTime.toISOString().split('T')[0],
      time: meeting.startTime.toISOString().split('T')[1].substring(0, 5),
      duration: 30,
      participants: ["freelancer-1", "client-1"], // In a real app, this would come from auth context
    });
    setSelectedTime(undefined);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="mb-8 text-center font-bold">
        Schedule a Meeting
      </Typography>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Calendar 
            onTimeSelect={handleTimeSelect}
            meetings={meetings}
          />
          
          {selectedTime && (
            <MeetingForm
              selectedTime={selectedTime}
              onSubmit={handleScheduleMeeting}
              onCancel={() => setSelectedTime(undefined)}
            />
          )}
        </div>

        <div>
          <UpcomingMeetings 
            meetings={meetings}
            onUpdateMeeting={() => {}} // To be implemented in next iteration
            onCancelMeeting={() => {}} // To be implemented in next iteration
          />
        </div>
      </div>
    </Container>
  );
};

export default Index;