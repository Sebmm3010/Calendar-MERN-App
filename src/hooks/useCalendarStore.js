import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { stringToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {

            // Crear el evento en la base de datos
            const { data } = await calendarApi.post('/events', calendarEvent);


            dispatch(onAddNewEvent({ id: data.evento.id, user, ...calendarEvent }));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {
        try {

            const { data }= await calendarApi.get('/events');

            const events= stringToDate( data.eventos );
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        events,
        activeEvent,
        hasEvenSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}