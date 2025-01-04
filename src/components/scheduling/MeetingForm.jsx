import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatTime, formatDate } from "@/utils/date";
import { useToast } from "@/hooks/use-toast";

export const MeetingForm = ({ selectedTime, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  if (!selectedTime) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting title",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title,
      description,
      startTime: selectedTime,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Schedule Meeting</h3>
      <p className="text-sm text-gray-500 mb-4">
        {formatDate(selectedTime)} at {formatTime(selectedTime)}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meeting Title</label>
          <Input
            placeholder="Enter meeting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            placeholder="Enter meeting description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Schedule Meeting</Button>
        </div>
      </form>
    </Card>
  );
};