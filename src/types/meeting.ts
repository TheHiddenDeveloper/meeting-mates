export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  duration: number; // in minutes
  participants: {
    freelancerId: string;
    clientId: string;
  };
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}