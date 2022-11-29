import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabDelete = () => {

    const { startDeletingEvent, hasEvenSelected } = useCalendarStore();
    const { isDateModalOpen }=useUiStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{ display: (hasEvenSelected && !isDateModalOpen) ? '' : 'none' }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
