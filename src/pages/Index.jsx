import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Calendar } from "../components/scheduling/Calendar";
import { MeetingForm } from "../components/scheduling/MeetingForm";
import { UpcomingMeetings } from "../components/scheduling/UpcomingMeetings";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

const Index = () => {
  const [selectedTime, setSelectedTime] = useState();
  const { toast } = useToast();

  // Fetch meetings
  const { data: meetings = [], refetch: refetchMeetings } = useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      // This would be replaced with actual API call
      console.log("Fetching meetings...");
      return [];
    },
  });

  // Schedule meeting mutation
  const scheduleMutation = useMutation({
    mutationFn: async (meetingData) => {
      console.log("Scheduling meeting:", meetingData);
      // This would be replaced with actual API call
      return { id: Date.now(), ...meetingData };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Meeting scheduled successfully!",
      });
      refetchMeetings();
      setSelectedTime(undefined);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
      console.error("Schedule meeting error:", error);
    },
  });

  // Update meeting mutation
  const updateMutation = useMutation({
    mutationFn: async (meetingData) => {
      console.log("Updating meeting:", meetingData);
      // This would be replaced with actual API call
      return meetingData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Meeting updated successfully!",
      });
      refetchMeetings();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update meeting. Please try again.",
        variant: "destructive",
      });
      console.error("Update meeting error:", error);
    },
  });

  // Cancel meeting mutation
  const cancelMutation = useMutation({
    mutationFn: async (meetingId) => {
      console.log("Canceling meeting:", meetingId);
      // This would be replaced with actual API call
      return meetingId;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Meeting cancelled successfully!",
      });
      refetchMeetings();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to cancel meeting. Please try again.",
        variant: "destructive",
      });
      console.error("Cancel meeting error:", error);
    },
  });

  const handleScheduleMeeting = (meetingData) => {
    scheduleMutation.mutate({
      ...meetingData,
      participants: {
        freelancerId: "freelancer-1", // This would come from auth context
        clientId: "client-1", // This would come from auth context
      },
    });
  };

  const handleUpdateMeeting = (meetingId, updates) => {
    updateMutation.mutate({ id: meetingId, ...updates });
  };

  const handleCancelMeeting = (meetingId) => {
    cancelMutation.mutate(meetingId);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Schedule a Meeting
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Calendar 
          onTimeSelect={setSelectedTime}
          meetings={meetings}
        />
        
        {selectedTime && (
          <MeetingForm
            selectedTime={selectedTime}
            onSubmit={handleScheduleMeeting}
            onCancel={() => setSelectedTime(undefined)}
          />
        )}

        <UpcomingMeetings 
          meetings={meetings}
          onUpdateMeeting={handleUpdateMeeting}
          onCancelMeeting={handleCancelMeeting}
        />
      </Box>
    </Box>
  );
};

export default Index;