import { Button } from "@mui/material";
import { formatTime } from "@/utils/date";

interface TimeSlotProps {
  time: Date;
  isAvailable?: boolean;
  onClick: (time: Date) => void;
}

export const TimeSlot = ({ time, isAvailable = true, onClick }: TimeSlotProps) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => isAvailable && onClick(time)}
      disabled={!isAvailable}
      sx={{
        opacity: isAvailable ? 1 : 0.5,
        '&:hover': {
          backgroundColor: isAvailable ? 'action.hover' : undefined,
        },
      }}
    >
      {formatTime(time)}
    </Button>
  );
};