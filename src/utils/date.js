import { format, addMinutes, setHours, setMinutes } from "date-fns";

export const formatTime = (date) => {
  return format(new Date(date), "h:mm a");
};

export const formatDate = (date) => {
  return format(new Date(date), "MMMM d, yyyy");
};

export const getTimeSlots = (date) => {
  const slots = [];
  let currentTime = setHours(setMinutes(new Date(date), 0), 9); // Start at 9 AM
  const endTime = setHours(setMinutes(new Date(date), 0), 17); // End at 5 PM

  while (currentTime <= endTime) {
    slots.push(new Date(currentTime));
    currentTime = addMinutes(currentTime, 30); // 30-minute slots
  }

  return slots;
};