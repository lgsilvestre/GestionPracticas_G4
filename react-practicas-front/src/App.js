import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import VistaAdmin from './components/VistaAdmin';
import VistaEstudiante from './components/VistaEstudiante';
import {Footer} from './components/Footer/Footer';
import Login from '../src/components/Login/Login';

function App() {
  return (

    <Router>  
      <div>    
        <Switch>

        <Route exact path="/">           
             <h1>Proyecto Gestion de Pacticas</h1>   
             <h3>para trabajar en vista estudiante : /estudiante</h3>   
             <h3>para trabajar en vista admin : /admin</h3>   
          </Route>

          <Route exact path="/estudiante">           
             <VistaEstudiante />         
          </Route>

          <Route exact path="/login">           
             <Login />         
          </Route>
          

          <Route exact path="/admin">
              <VistaAdmin />  
          </Route> 

          {/* Por defecto */}
          <Redirect to="/"/>
        
        </Switch>        
        </div>  
        <Footer/>
    </Router>
  );
}

export default App;
