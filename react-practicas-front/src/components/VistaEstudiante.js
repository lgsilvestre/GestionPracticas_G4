import React from 'react'
import { NavBar } from './NavBar/NavBar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,    
    } from "react-router-dom";
import Practicas from './Pages/Practicas';
import Estudiante from './Pages/Estudiante';
import Postulaciones from './Pages/Postulaciones';
import Ofertas from './Pages/Ofertas';
import Landing from './Landing/Landing';

const VistaEstudiante = () => {
    return (
        <Router>
            <div>
                {/* Componente de barra de navegacion */}
                <NavBar/>
                {/* Componente para gestionar las rutas de url hacia los componentes */}
                <Switch>
                    <Route path='/practicas' exact component={Practicas} />
                    <Route path='/estudiante' component={Estudiante} />
                    <Route path='/postulaciones' component={Postulaciones} />
                    <Route path='/ofertas' component={Ofertas} /> 
                    <Route path='/landing' component={Landing} /> 
                    <Redirect to="/"/>
                </Switch>              
            </div>

        </Router>
    )
}

export default VistaEstudiante
