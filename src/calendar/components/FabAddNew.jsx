import { addHours } from "date-fns";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {

    const { openDateModal }= useUiStore();
    const { user }=useAuthStore();
    const { setActiveEvent }= useCalendarStore();

    const handleOpenModal=()=>{
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user
        });

        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handleOpenModal}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
