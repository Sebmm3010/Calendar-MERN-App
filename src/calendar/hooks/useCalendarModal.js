import { useEffect, useMemo, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { toast } from "react-toastify";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const useCalendarModal = (formData) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const { isDateModalOpen, closeDateModal }= useUiStore();

    const { activeEvent, startSavingEvent }= useCalendarStore()

    const [formSubmitted, setFormSubmitted] = useState(false)

    const [formValue, setFormValue] = useState(formData);

    const onInputChange = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }


    const onDateChange = (event, changing) => {
        setFormValue({
            ...formValue,
            [changing]: event
        });
    }

    const closeModal=()=>{
        closeDateModal();
    }

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValue.title.length > 0)
            ? ''
            : 'is-invalid'
    }, [formValue.title, formSubmitted]);

    useEffect(() => {
      if(activeEvent !== null) {
          setFormValue({ ...activeEvent });
      }
    }, [activeEvent]);
    

    const handleSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValue.end, formValue.start);

        if (isNaN(difference) || difference <= 0) {
            toast.error('Fechas invalidas', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (formValue.title.length <= 0) return;

        await startSavingEvent(formValue);
        closeDateModal();
        setFormSubmitted(false);
    }

    return{
        customStyles,
        isDateModalOpen,
        formValue,
        onInputChange,
        closeModal,
        onDateChange,
        titleClass,
        handleSubmit
    }
}