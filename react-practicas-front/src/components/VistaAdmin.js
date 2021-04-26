import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ofertas from './Pages/Ofertas';
import Postulaciones from './Pages/Postulaciones';
import Estudiante from './Pages/Estudiante';
import Administrador from './Pages/Administrador'
import Practicas from './Pages/Practicas';
import SideBar from './SideBar/SideBar'

const VistaAdmin = () => {
    return (
        <div>
            <Router>
             <SideBar />
             <div>
                <Switch>
                    <Route exact path="/index">           
                        <h1>Admin Inicio</h1>    
                    </Route>
                    <Route path='/practicas' exact component={Practicas} />                    
                    <Route  path='/estudiantes'>
                        <Estudiante />
                    </Route>
                    <Route  path='/administradores'>
                        <Administrador />
                    </Route>
                    <Route path='/postulaciones' component={Postulaciones} />
                    <Route path='/ofertas' component={Ofertas} />
                </Switch>
                </div>
            </Router>
        </div>
    )
}

export default VistaAdmin
