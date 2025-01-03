import { useState } from "react";
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