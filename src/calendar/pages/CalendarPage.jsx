import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from "../components/Navbar";

import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';


const events = [{
  title: 'Cupleaños',
  notes: 'Comprar pudin',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Sebastian'
  }
}];


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week");

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#5865f2',
      borderRadius: '10px',
      opacity: 0.8,
      color: '#fff'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  }

  const onSelect = (event) => {
    console.log({ click: event });
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )', padding: '20px' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>

    </>
  )
}
