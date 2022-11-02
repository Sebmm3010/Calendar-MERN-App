import { useState } from 'react';
import './LoginPage.css';

export const LoginPage = () => {


  const [showHide, setShowHide] = useState(false);

  const showHidePassword = () => {
    setShowHide(!showHide);
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type={showHide ? "text" : "password"}
                className="form-control"
                placeholder="Contraseña"
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

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="d-grid gap-2">
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