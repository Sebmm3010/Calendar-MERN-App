import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';


const loginFields = {
  loginEmail: '',
  loginPassword: ''
}
const registerFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {
  // State password
  const [showHide, setShowHide] = useState(false);
  const [showHideRegister, setShowHideRegister] = useState(false);

  // Auth store
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  // USe form fields
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFields);
  // Login submit
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  }
  // Registro submit
  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      toast.error('Las contraseñas deben ser iguales', {
        position: "top-right",
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
    console.log(startRegister({name:registerName, email:registerEmail, password:registerPassword}));
    
  }
  // Ocultar/ mostrar contraseña
  // login
  const showHidePassword = () => {
    setShowHide(!showHide);
  }

  // Registro
  const showHidePasswordRegister = () => {
    setShowHideRegister(!showHideRegister);
  }

  // Notificacion de error

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [errorMessage])




  return (
    /* LOGIN */
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type={showHide ? "text" : "password"}
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
              <input type="checkbox"
                className='mt-4'
                name="showHide"
                onChange={showHidePassword} />
              <label htmlFor="showHide">Mostrar Contraseña</label>
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>
        {/* REGISTRO */}
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type={showHideRegister ? 'text' : 'password'}
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type={showHideRegister ? 'text' : 'password'}
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <input type="checkbox"
              className='mt-4 mb-3'
              name="showHideRegister"
              onChange={showHidePasswordRegister} />
            <label htmlFor="showHideRegister" className='text-light'>Mostrar Contraseña</label>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}