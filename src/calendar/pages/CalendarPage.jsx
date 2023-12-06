import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar} from "../"

import { getMessagesES, localizer } from '../../helpers';
import { useUIStore, useCalendarStore, useAuthStore } from '../../hooks';
import { useEffect } from 'react';


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUIStore();
  
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected) => {
    const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user.uid) ;

    console.log( isMyEvent);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black'
    }

    return {
      style
    }
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) =>{
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    
  }

  
  return (
    <>
      <NavBar />

      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px) ' }}
          messages={ getMessagesES() }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />
        <CalendarModal />
        <FabAddNew />
        <FabDelete />
      </div>
    </>
  )
}
