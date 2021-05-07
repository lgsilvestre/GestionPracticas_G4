import React from 'react';
import FormLogin from './components/FormLogin';
import './Styles/Login.css';
import logo from './images/fondo_izquierdo.png';
import SignInSide from './components/SignInSide';



class Login extends React.Component {
  render() {
    return (
      <SignInSide/>     
    );
  }
}

export default Login;
