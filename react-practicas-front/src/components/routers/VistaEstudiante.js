import React from 'react'
import { NavBar } from '../ui/NavBar/NavBar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch,    
    } from "react-router-dom";
import Practicas from '../Pages/Practicas';
import PerfilEstudiante from '../Pages/PerfilEstudiante';
import Postulaciones from '../Pages/Postulaciones';
import Ofertas from '../Pages/Ofertas';
import Landing from '../Landing/Landing';
import { Footer } from '../ui/Footer/Footer';
import Login from '../Login/Login';

const VistaEstudiante = () => {

    return (     
        <div>
            
                {/* Componente de ba    rra de navegacion */}
                <NavBar/>
                {/* Componente para gestionar las rutas de url hacia los componentes */}
                <Switch>
                    <Route  path='/estudiante/practicas' component={Practicas} />
                    <Route  path='/estudiante/perfil' component={PerfilEstudiante} /> 
                    <Route  path='/estudiante/postulaciones' component={Postulaciones} />
                    <Route  path='/estudiante/ofertas' component={Ofertas} /> 
                    <Route  path='/estudiante/landing' component={Landing} />
                </Switch>  
                <Footer/> 
            

        </div>     
    )
}

export default VistaEstudiante
