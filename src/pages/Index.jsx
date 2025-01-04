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
      const response = await fetch("/meetings");
      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }
      return response.json();
    },
  });

  // Schedule meeting mutation
  const scheduleMutation = useMutation({
    mutationFn: async (meetingData) => {
      const response = await fetch("/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to schedule meeting");
      }
      
      return response.json();
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
        description: error.message || "Failed to schedule meeting",
        variant: "destructive",
      });
    },
  });

  // Update meeting mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...meetingData }) => {
      const response = await fetch(`/meetings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update meeting");
      }
      
      return response.json();
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
        description: error.message || "Failed to update meeting",
        variant: "destructive",
      });
    },
  });

  // Cancel meeting mutation
  const cancelMutation = useMutation({
    mutationFn: async (meetingId) => {
      const response = await fetch(`/meetings/${meetingId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to cancel meeting");
      }
      
      return response.json();
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
        description: error.message || "Failed to cancel meeting",
        variant: "destructive",
      });
    },
  });

  const handleScheduleMeeting = (meetingData) => {
    scheduleMutation.mutate({
      ...meetingData,
      participants: ["freelancer-1", "client-1"], // This would come from auth context in a real app
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