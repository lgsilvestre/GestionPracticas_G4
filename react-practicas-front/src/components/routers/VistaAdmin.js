import React from 'react'
import {Switch, Route } from 'react-router-dom';
import SideBar from '../ui/SideBar/SideBar'
import { Footer } from '../ui/Footer/Footer';
import Estudiante from '../Pages/Estudiante';
import Postulaciones from '../Pages/Postulaciones';
import Ofertas from '../Pages/Ofertas';
import Administrador from '../Pages/Administrador';
import { EstadoPracticas } from '../Pages/EstadoPracticas';
import { Estadisticas } from '../Pages/Estadisticas';

const VistaAdmin = () => {
    return (
        <div>         
            <SideBar />
            <Switch>      
                <Route path = '/admin/practicas' component={EstadoPracticas} />
                <Route path = '/admin/administradores' component={Administrador} />
                <Route path = '/admin/estudiantes' component={Estudiante} />
                <Route path = '/admin/postulaciones' component={Postulaciones} />
                <Route path = '/admin/ofertas' component={Ofertas} />
                <Route path = '/admin/estadisticas' component={Estadisticas} />
                <Route path="/admin">           
                    <h1>Admin Inicio</h1>    
                </Route>
            </Switch>
            <Footer/>               
        </div>
    )
}

export default VistaAdmin
