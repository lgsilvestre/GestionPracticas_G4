import React from 'react'
import { NavBar } from '../ui/NavBar/NavBar'
import {
    Switch,
    Route
    } from "react-router-dom";
import Practicas from '../Pages/Practicas';
import Postulaciones from '../Pages/Postulaciones';
import { Footer } from '../ui/Footer/Footer';
import { CambiarPassword } from '../Pages/CambiarPassword';
import './AppRouterStyle.css';
import { DashboardEstudiante } from '../Pages/DashboardEstudiante';



const VistaEstudiante = ({userChangedPass=false}) => {

    return (     
      <>
        <NavBar/>
        
        <div className="Back Scroll">
            {/* {
                !userChangedPass ? <CambiarPassword/> : <Redirect to ="/estudiante"/>
            } */}
            <div style={{marginBottom:"96px"}}>
            <Switch>
                <Route path='/estudiante/practicas' component={Practicas} />
                {/* <Route path='/estudiante/practicas' component={PracticasAcordeon} /> */}
                <Route path='/estudiante/postulaciones' component={Postulaciones} />                   
                {/* <Route path='/estudiante/landing' component={DashboardEstudiante} /> */}
                <Route path="/estudiante/changePass" component={CambiarPassword}/>
                <Route exact path='/estudiante' component={DashboardEstudiante} />
            </Switch>  
            </div>  
            <Footer/> 
        </div>     
      </>
      
    )
}

export default VistaEstudiante
