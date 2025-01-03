import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/date";
import { Button } from "@/components/ui/button";

export const TimeSlot = ({ time, isAvailable = true, onClick }) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full p-2 text-sm",
        isAvailable
          ? "hover:bg-blue-50 hover:border-blue-200"
          : "opacity-50 cursor-not-allowed"
      )}
      onClick={() => isAvailable && onClick(time)}
      disabled={!isAvailable}
    >
      {formatTime(time)}
    </Button>
  );
};