import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import { CambiarPassword } from '../Pages/CambiarPassword';
import { Info } from '../Pages/Info';
import VistaAdmin from './VistaAdmin';
import VistaEstudiante from './VistaEstudiante';

export const AppRouter = () => {

    return (
        <Router>  
            <div>    
                <Switch>   
                    <Route path="/estudiante"  component = {VistaEstudiante} />                                          
                    <Route path="/login" component = {Login}/>           
                    <Route path="/admin" component={VistaAdmin}/>
                    <Route path="/changePass" component={CambiarPassword}/>
                    <Route exact path="/" component={Info}/>                           
                </Switch>     
            </div>  

        </Router>
    )
}
