import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ofertas from './Pages/Ofertas';
import Postulaciones from './Pages/Postulaciones';
import Estudiante from './Pages/Estudiante';
import Practicas from './Pages/Practicas';
import SideBar from './SideBar/SideBar'

const VistaAdmin = () => {
    return (
        <div>
             <Router>
                <SideBar />
                <Switch>
                    <Route path='/practicas' exact component={Practicas} />
                    <Route path='/estudiantes' component={Estudiante} />
                    <Route path='/postulaciones' component={Postulaciones} />
                    <Route path='/ofertas' component={Ofertas} />
                </Switch>
            </Router>
        </div>
    )
}

export default VistaAdmin
