import { useDispatch, useSelector } from "react-redux"
import { onAddnewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/CalendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) )
  }

  const startSavingEvent = async( calendarEvent ) => {
    try {
      if( calendarEvent.id ) {
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUpdateEvent({ ...calendarEvent, user } ) );
        return;
      }
    
      const { data } = await calendarApi.post('/events', calendarEvent );
      dispatch( onAddnewEvent ({...calendarEvent, id: data.evento.id, user }) );

    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
      

  }

  const startDeletingEvent = async() => {

    try {
      await calendarApi.delete(`/events/${ activeEvent.id }` );
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar el evento', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      console.log( { data } );
      const events = convertEventsToDateEvents( data.eventos );
      console.log( events );
      dispatch( onLoadEvents( events ) );
    } catch (error) {
      console.log('Error de carga de eventos');
      console.log(error);
      
    }
  }

  return {
      //prop
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,

      //meth
      setActiveEvent,
      startDeletingEvent,
      startLoadingEvents,
      startSavingEvent,
  }
}
