import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { TimeSlot } from "./TimeSlot";
import { getTimeSlots, formatDate } from "@/utils/date";

export const Calendar = ({ onTimeSelect, meetings = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeSlots = getTimeSlots(selectedDate);

  // Check if a time slot is available (not conflicting with existing meetings)
  const isTimeSlotAvailable = (time) => {
    return !meetings.some(meeting => {
      const meetingTime = new Date(meeting.startTime);
      return (
        meetingTime.getDate() === time.getDate() &&
        meetingTime.getHours() === time.getHours() &&
        meetingTime.getMinutes() === time.getMinutes()
      );
    });
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
      </Card>
    </div>
  );
};