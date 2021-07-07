import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import { CambiarPassword } from '../Pages/CambiarPassword';
import { Info } from '../Pages/Info';
import EvaluarPractica from '../Pages/EvaluarPractica/EvaluarPractica';
import VistaAdmin from './VistaAdmin';
import VistaEstudiante from './VistaEstudiante';
import VistaSupervisor from './VistaSupervisor';
import  {TablaEstados} from '../Pages/Administrador/EstadoPracticas/TablaEstados';
import './AppRouterStyle.css'
export const AppRouter = () => {

    return (
        <Router className="Back">                 
            <Switch>   
                <Route path="/estudiante"  component = {VistaEstudiante} />                                          
                <Route path="/login" component = {Login}/>           
                <Route path="/admin" component={VistaAdmin}/>
                <Route path="/supervisor" component={VistaSupervisor}/>
                <Route path="/changePass" component={CambiarPassword}/>
                <Route path="/table" component={TablaEstados}/>
                <Route path="/evaluar/:variable" component={EvaluarPractica}/>

                <Route exact path="/" component={Info}/>                           
            </Switch>     
        </Router>
    )
}
