import React from 'react';
import FormLogin from './components/FormLogin';
import './Styles/Login.css';
import logo from './images/fondo_izquierdo.png';


class Login extends React.Component {
  render() {
    return (
      <div className="row">
          <img className="parte_izquierda" src={logo} alt="" />
          <div className="parte_derecha">
            <FormLogin/>
          </div>      
      </div>      
    );
  }
}

export default Login;
