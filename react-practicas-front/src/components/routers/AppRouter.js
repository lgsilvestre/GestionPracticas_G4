import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import { CambiarPassword } from '../Pages/CambiarPassword';
import { Info } from '../Pages/Info';
import VistaAdmin from './VistaAdmin';
import VistaEstudiante from './VistaEstudiante';
import  {TablaEstados} from '../Pages/Administrador/EstadoPracticas/TablaEstados';
export const AppRouter = () => {

    return (
        <Router>                 
            <Switch>   
                <Route path="/estudiante"  component = {VistaEstudiante} />                                          
                <Route path="/login" component = {Login}/>           
                <Route path="/admin" component={VistaAdmin}/>
                <Route path="/changePass" component={CambiarPassword}/>
                <Route path="/table" component={TablaEstados}/>
                <Route exact path="/" component={Info}/>                           
            </Switch>     
        </Router>
    )
}
