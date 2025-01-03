import { useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeSlot } from "./TimeSlot";
import { getTimeSlots, formatDate } from "@/utils/date";

interface CalendarProps {
  onTimeSelect: (time: Date) => void;
}

export const Calendar = ({ onTimeSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const timeSlots = getTimeSlots(selectedDate);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            />
          </LocalizationProvider>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {formatDate(selectedDate)}
          </Typography>
          <Grid container spacing={1}>
            {timeSlots.map((time) => (
              <Grid item xs={6} sm={4} md={3} key={time.toISOString()}>
                <TimeSlot
                  time={time}
                  onClick={onTimeSelect}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};