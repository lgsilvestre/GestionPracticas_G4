import React from 'react';
import { useHistory } from "react-router-dom";
import { AppRouter } from './components/routers/AppRouter';

function App() {
  let history = useHistory();
  return (
    <div>
      <AppRouter/>
    </div>

    //Se movio a AppRouter 
  
    // <Router>  
    //   <div>    
    //     <Switch>

    //     <Route exact path="/">           
    //          <h1>Proyecto Gestion de Pacticas</h1>   
    //          <h3>para trabajar en vista estudiante : /estudiante</h3>   
    //          <h3>para trabajar en vista admin : /admin</h3>   
    //       </Route>

    //       <Route exact path="/estudiante">           
    //          <VistaEstudiante />         
    //       </Route>

    //       <Route exact path="/login">           
    //          <Login />         
    //       </Route>
          
    //       <Route exact path="/admin">
    //           <VistaAdmin />  
    //       </Route> 

    //       {/* Por defecto */}
    //       <Redirect to="/"/>
        
    //     </Switch>     
    //     <Footer/>   
    //     </div>  
        
    // </Router>
  );
}

export default App;
