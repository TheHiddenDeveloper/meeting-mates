import { Card } from "@/components/ui/card";
import { Meeting } from "@/types/meeting";
import { formatTime, formatDate } from "@/utils/date";

interface UpcomingMeetingsProps {
  meetings: Meeting[];
}

export const UpcomingMeetings = ({ meetings }: UpcomingMeetingsProps) => {
  if (meetings.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No upcoming meetings</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium">{meeting.title}</h4>
            <p className="text-sm text-gray-500">
              {formatDate(meeting.startTime)} at {formatTime(meeting.startTime)}
            </p>
            {meeting.description && (
              <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};