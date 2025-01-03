import { useState } from "react";
import { Calendar } from "@/components/scheduling/Calendar";
import { MeetingForm } from "@/components/scheduling/MeetingForm";
import { UpcomingMeetings } from "@/components/scheduling/UpcomingMeetings";
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Schedule a Meeting</h1>
      
      <div className="space-y-8">
        <Calendar onTimeSelect={handleTimeSelect} />
        
        {selectedTime && (
          <MeetingForm
            selectedTime={selectedTime}
            onSubmit={handleScheduleMeeting}
            onCancel={() => setSelectedTime(undefined)}
          />
        )}

        <UpcomingMeetings meetings={meetings} />
      </div>
    </div>
  );
};

export default Index;