import React from 'react'
import { NavBar } from '../ui/NavBar/NavBar'
import {
    Switch,
    Route
    } from "react-router-dom";
import Practicas from '../Pages/Practicas';
import PerfilEstudiante from '../Pages/PerfilEstudiante';
import Postulaciones from '../Pages/Postulaciones';
import Landing from '../Landing/Landing';
import { Footer } from '../ui/Footer/Footer';
import { CambiarPassword } from '../Pages/CambiarPassword';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './AppRouterStyle.css';
import { PracticasAcordeon } from '../Pages/PracticasAcordeon';

const sendValues = (event) => {
    event.preventDefault();
    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/UsersController/showDataU",
    )
      .then(response => {

        console.log("respuesta: ", response.data);

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }

const VistaEstudiante = ({userChangedPass=false}) => {

    return (     
        <div className="Back Scroll">
            <NavBar/>
            {/* {
                !userChangedPass ? <CambiarPassword/> : <Redirect to ="/estudiante"/>
            } */}
            <div style={{marginBottom:"96px"}}>
            <Switch>
                {/* <Route path='/estudiante/practicas' component={Practicas} /> */}
                <Route path='/estudiante/practicas' component={PracticasAcordeon} />
                <Route path='/estudiante/perfil' component={PerfilEstudiante} /> 
                <Route path='/estudiante/postulaciones' component={Postulaciones} />                   
                <Route path='/estudiante/landing' component={Landing} />
                <Route path="/estudiante/changePass" component={CambiarPassword}/>
            </Switch>  
            </div>  
            <Footer/> 
        </div>     
    )
}

export default VistaEstudiante
