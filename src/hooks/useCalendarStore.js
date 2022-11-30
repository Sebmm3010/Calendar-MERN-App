import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {

            // Crear el evento en la base de datos
            const { data } = await calendarApi.post('/events');


            dispatch(onAddNewEvent({ _id:new Date().getTime() , ...calendarEvent}));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        hasEvenSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}