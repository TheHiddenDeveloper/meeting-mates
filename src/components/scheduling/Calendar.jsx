import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { TimeSlot } from "./TimeSlot";
import { getTimeSlots, formatDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";

export const Calendar = ({ onTimeSelect, meetings = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch available slots for the selected date
  const { data: availableSlots = [], isLoading } = useQuery({
    queryKey: ["availableSlots", selectedDate],
    queryFn: async () => {
      const response = await fetch(`/users/1/available-slots`);
      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }
      const data = await response.json();
      return data.availableSlots;
    },
  });

  const timeSlots = getTimeSlots(selectedDate);

  // Check if a time slot is available
  const isTimeSlotAvailable = (time) => {
    console.log('Checking availability for:', time);
    
    // Check if the slot exists in available slots
    const isAvailable = availableSlots.some(slot => 
      new Date(slot).getTime() === time.getTime()
    );
    console.log('Slot available in user schedule:', isAvailable);

    // Check for conflicts with existing meetings
    const hasConflict = meetings.some(meeting => {
      const meetingTime = new Date(meeting.time);
      const conflict = meetingTime.getTime() === time.getTime();
      if (conflict) {
        console.log('Conflict found with meeting:', meeting.title);
      }
      return conflict;
    });
    console.log('Has conflicts:', hasConflict);

    return isAvailable && !hasConflict;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="p-4">
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border"
        />
      </Card>

      <Card className="p-4 flex-1">
        <h3 className="font-semibold mb-4">{formatDate(selectedDate)}</h3>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading available slots...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <TimeSlot
                key={time.toISOString()}
                time={time}
                isAvailable={isTimeSlotAvailable(time)}
                onClick={onTimeSelect}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};