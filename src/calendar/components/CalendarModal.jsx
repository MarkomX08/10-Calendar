import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es'; 
import { useCalendarStore, useUIStore } from '../../hooks';

registerLocale('es', es );

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
  
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // custom hook: cambio de estado del modal
    const {isDateModalOpen, closeDateModal } = useUIStore();
    // custom hook: usado para el manejo de los eventos
    const { activeEvent, startSavingEvent } = useCalendarStore();

    // useState: cambio de estado del submit
    const [FormSubmitted, setFormSubmitted] = useState( false );

    // useState: formato del evento
    const [FormValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
    });

    // useMemo: depende de los cambios dentro del form.values.title y del FormSubmitted
    const titleClass = useMemo(() => {
        // en caso de que el formsubmited sea falso retorna el msj
        if( !FormSubmitted ) return '';
        // en caso de que la longitud del titulo sea mayor de 0, no invalidara el campo
        return ( FormValues.title.length > 0 )
        ? ''
        : 'is-invalid'

    }, [FormValues.title, FormSubmitted]);

    useEffect(() => {
      if( activeEvent !== null) {
        setFormValues({ ...activeEvent });
      }
    }, [activeEvent])
    

    //funcion: destructura lo que haya en el formValues y le agrega la prop de target.name
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...FormValues,
            [target.name]: target.value
        })
    };

    //funcion: destructura lo que haya en el formValues y le agrega la prop del changing
    const onDateChanged = (event, changing ) => {
        setFormValues({
            ...FormValues,
            [changing]: event
        })
    };

    // funcion para de cierre del modal
    const onCloseModal= () => {
        closeDateModal();
    }

    //funcion de submit del evento
    const onSubmit = async( event ) => {
        event.preventDefault();
        // cambio de del estado setFormSubmitted
        setFormSubmitted(true);

        // variable que almacena la diferencia en segundo de las dos fechas dadas en los inputs
        const difference = differenceInSeconds( FormValues.end, FormValues.start );

        //en caso de que no haya diferencia o sea menor a cero mandara msj de alerta
        if ( isNaN( difference ) || difference <= 0 ){
            Swal.fire('fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        //si la longitud del titulo es menor o igual a cero retornara
        if( FormValues.title.length <= 0 ) return;

        //msj consola: visualizacion del FormValues
        console.log( FormValues );

        await startSavingEvent( FormValues );
        closeDateModal();
        setFormSubmitted(false);
    }

    return (

        <Modal
        isOpen = { isDateModalOpen } 
        onRequestClose = { onCloseModal }
        style = { customStyles }
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />

            {/* formulario evento */}
            <form className="container" onSubmit={ onSubmit }>

                
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    {/* input fecha inicio */}
                    <DatePicker
                        selected={ FormValues.start }
                        onChange={( event ) => onDateChanged(event, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    {/* input fecha final */}
                    <DatePicker
                        minDate={ FormValues.start }
                        selected={ FormValues.end }
                        onChange={( event ) => onDateChanged(event, 'end')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>

                    {/* input titulo evento */}
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value= { FormValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    {/* input descripción */}
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value= { FormValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                {/* btn submit */}
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
