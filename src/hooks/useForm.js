import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm ={}, formValidations = {}) => {

    //creacion del State
    const [FormState, setFormState] = useState(initialForm);
    //creacion del State
    const [FormValidation, setFormValidation] = useState({});

    //useEffect, cada ves que el formState cambie disparara la funcion dada
    useEffect(() => {
      createValidators();
    }, [FormState]);

    //useEffect, cada ves que el initialForm cambie disparara el setFormState
    useEffect(() => {
      setFormState( initialForm );
    }, [initialForm])
    
    //funcion para verificar si el campo es valido, useMemo: memorizara hasta que algun elemento de la dependencia cambie
    const isFormValid = useMemo(() => {
      // loop for, para el recorrido de las validaciones del formulario
      for( const formValue of Object.keys( FormValidation )){
        // en caso de que la validacion sea negativa retornara false
        if( FormValidation [formValue] !== null) return false;
      }
      // en caso de que pase de forma correcta retornara true
      return true;
    }, [FormValidation])

    //funcion para el cambio de los valores del arreglo del UseState
    const onInputChange = ({target})=> {
        //destructuracion de los elementos del target
        const { name , value } = target;
        //actualizacion del UseState
        setFormState({
            ...FormState,
            [name] : value
        });
    };

    //funcion para el reseteo del formulario
    const onResetForm = () =>{
        setFormState(initialForm);
    }

    //funcion para la creacion de las validaciones del formulario
    const createValidators = () => {
      const formCheckValues = {};
      for(const formField of Object.keys( formValidations )){
        const [ fn, errorMessage] = formValidations[formField];
        formCheckValues[`${formField}Valid`]  = fn( FormState[formField] ) ? null: errorMessage ;
      }
      setFormValidation( formCheckValues );
    }

  return {
    ...FormState,
    FormState,
    onInputChange,
    onResetForm,
    ...FormValidation,
    isFormValid
  }
}