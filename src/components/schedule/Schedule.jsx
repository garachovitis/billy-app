import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './schedule.css';

const Schedule = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">My Schedule</h1>
      <Calendar
        onChange={onChange}
        value={date}
        className="react-calendar"
      />
      <p className="selected-date">Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default Schedule;