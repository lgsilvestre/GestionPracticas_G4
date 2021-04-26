import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ofertas from '../Pages/Ofertas';
import Postulaciones from '../Pages/Postulaciones';
import Estudiante from '../Pages/PerfilEstudiante';
import Practicas from '../Pages/Practicas';
import SideBar from '../ui/SideBar/SideBar'
import { Footer } from '../ui/Footer/Footer';

const VistaAdmin = () => {
    return (
        <div>
            <Router>
                <SideBar />
                <Switch>
                    <Route exact path="/admin">           
                        <h1>Admin Inicio</h1>    
                    </Route>
                    <Route path='/practicas' component={Practicas} />
                    <Route path='/estudiantes' component={Estudiante} />
                    <Route path='/postulaciones' component={Postulaciones} />
                    <Route path='/ofertas' component={Ofertas} />
                </Switch>
                <Footer/>    
            </Router>
        </div>
    )
}

export default VistaAdmin
