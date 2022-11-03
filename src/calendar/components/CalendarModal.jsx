import { addHours, setHours, setMinutes, subDays } from 'date-fns';
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCalendarModal } from '../hooks/useCalendarModal';




registerLocale('es', es)


const formData = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
}

export const CalendarModal = () => {

    const { 
        customStyles,
        open,
        formValue,
        onInputChange,
        onCloseModal,
        onDateChange,
        titleClass,
        handleSubmit } = useCalendarModal(formData);

    Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={open}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        locale="es"
                        selected={formValue.start}
                        minDate={subDays(new Date(), 0)}
                        showTimeSelect
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'start')}
                        dateFormat="Pp"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale="es"
                        minDate={formValue.start}
                        showTimeSelect
                        selected={formValue.end}
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'end')}
                        dateFormat="Pp"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValue.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
            <ToastContainer />
        </Modal>
    )
}
