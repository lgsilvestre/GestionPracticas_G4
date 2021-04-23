import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import Login from '../Login/Login';
import { Info } from '../Pages/Info';
import VistaAdmin from './VistaAdmin';
import VistaEstudiante from './VistaEstudiante';

export const AppRouter = () => {

    return (
        <Router>  
            <div>    
                <Switch>
                <Route exact path="/" component={Info}/>             
                <Route exact path="/estudiante" component={VistaEstudiante}/>                           
                <Route exact path="/login" component = {Login}/>           
                
                <Route exact path="/admin" component={VistaAdmin}/>

                {/* Por defecto */}
                <Redirect to="/"/>
                
                </Switch>     
            </div>  
        
        </Router>
    )
}
