import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTime, formatDate } from "@/utils/date";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const UpcomingMeetings = ({ meetings, onUpdateMeeting, onCancelMeeting }) => {
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
            <div className="mt-4 flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => onUpdateMeeting(meeting.id, meeting)}
              >
                Reschedule
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel Meeting</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Meeting</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this meeting? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Meeting</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onCancelMeeting(meeting.id)}
                    >
                      Yes, Cancel Meeting
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};