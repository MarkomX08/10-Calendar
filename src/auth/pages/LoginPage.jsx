import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
     loginEmail: '',
     loginPassword: ''
}

const registerFormFields = {
     registerName: '',
     registerEmail: '',
     registerPassword: '',
     registerPassword_repeat: '',
}


export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail , loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const { registerEmail , registerName, registerPassword, registerPassword_repeat, onInputChange: onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit  = ( event ) =>{
        event.preventDefault();
        startLogin( {email: loginEmail,password: loginPassword} );
    }

    const RegisterSubmit  = ( event ) =>{
        event.preventDefault();

        if( registerPassword !== registerPassword_repeat ) {
            Swal.fire('Error en registro', 'Las contraseñas no son identicas', 'error');
            return;
        }
        startRegister( {email: registerEmail , name: registerName, password: registerPassword } );
    }

    useEffect(() => {
        if( errorMessage !== undefined ) {
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
    }, [errorMessage]);
    
    return (

        <div className="container login-container">
            
            <div className="row">

                {/* login */}
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    
                    {/* formulario login*/}
                    <form onSubmit={ loginSubmit }>

                        {/* input de correo */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Correo"
                                name= "loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>

                        {/* input de contra */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>

                        {/* btn login */}
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>

                    </form>
                </div>

                {/* registro */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>

                    {/* formulario register */}
                    <form onSubmit={ RegisterSubmit }>

                        {/* input nombre */}
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name= "registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        
                        {/* input correo */}
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name= "registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            {/* input contra */}
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        {/* input repeat contra */}
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name= "registerPassword_repeat"
                                value={ registerPassword_repeat }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            {/* btn register */}
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}