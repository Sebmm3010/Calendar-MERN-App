import { useMemo, useState } from 'react';

import { addHours, differenceInSeconds, setHours, setMinutes, subDays } from 'date-fns';
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
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

    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //     },
    // };

    // const [open, setOpen] = useState(true);

    // const [formSubmitted, setFormSubmitted] = useState(false)

    // const [formValue, setFormValue] = useState({
    //     title: '',
    //     notes: '',
    //     start: new Date(),
    //     end: addHours(new Date(), 2)
    // });


    // // const [startDate, setStartDate] = useState(new Date());

    // const onInputChange = ({ target }) => {
    //     setFormValue({
    //         ...formValue,
    //         [target.name]: target.value
    //     })
    // }

    // const onCloseModal = () => {
    //     setOpen(false);
    // }

    // const onDateChange = (event, changing) => {
    //     setFormValue({
    //         ...formValue,
    //         [changing]: event
    //     })
    // }


    // const titleClass = useMemo(() => {
    //     if (!formSubmitted) return '';

    //     return (formValue.title.length > 0)
    //         ? 'is-valid'
    //         : 'is-invalid'
    // }, [formValue.title, formSubmitted]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setFormSubmitted(true);
    //     const difference = differenceInSeconds(formValue.end, formValue.start);

    //     if (isNaN(difference) || difference <= 0) {
    //         toast.error('Fechas invalidas', {
    //             position: "top-center",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         });
    //         return;
    //     }
    //     if (formValue.title.length <= 0) return;
    //     console.log(formValue);
    // }

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
                        minTime={setHours(setMinutes(new Date(), 0), new Date().getHours())}
                        maxTime={setHours(setMinutes(new Date(), 59), 23)}
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
                        minTime={setHours(setMinutes(new Date(), 0), new Date().getHours())}
                        maxTime={setHours(setMinutes(new Date(), 59), 23)}
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
