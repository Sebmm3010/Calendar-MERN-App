import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
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
        try {
            if (calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // Crear el evento en la base de datos
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ id: data.evento.id, user, ...calendarEvent }));
        } catch (error) {
            console.log(error);
            toast.error(`Error al guardar: ${error.response.data?.msg}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');

            const events = stringToDate(data.eventos);
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