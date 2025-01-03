import { format, addMinutes } from "date-fns";

export const formatTime = (date: Date): string => {
  return format(date, "h:mm a");
};

export const formatDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

export const getTimeSlots = (date: Date): Date[] => {
  const slots: Date[] = [];
  let currentTime = new Date(date.setHours(9, 0, 0, 0)); // Start at 9 AM
  const endTime = new Date(date.setHours(17, 0, 0, 0)); // End at 5 PM

  while (currentTime <= endTime) {
    slots.push(new Date(currentTime));
    currentTime = addMinutes(currentTime, 30); // 30-minute slots
  }

  return slots;
};