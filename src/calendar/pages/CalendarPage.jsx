import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew, FabDelete, Navbar } from '../components';


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week");
  const { events,setActiveEvent, startLoadingEvents }=useCalendarStore();
  const { openDateModal }= useUiStore();

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
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents()
  },[]);
  

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
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
