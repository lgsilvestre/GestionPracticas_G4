import React from 'react'
import logo from'../images/logo.png';
class FormLogin extends React.Component{
    
    render(){

        return(
            <div>
                <div className="container">
                    <img src={logo} alt=""/>
                    <h6>Bienvenido</h6>
                    <h5>Ingresa con los datos de tu cuenta</h5> 

                    <form>  
                        <div className="form-group">
                            <label>Correo</label>
                            <input 
                                className="form-control" 
                                type="email" 
                                name="correo"
                                maxLength = "50"                             
                                ></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input 
                                className="form-control" 
                                type="password" 
                                name="contraseña"
                                maxLength = "16"
                            >
                                    
                                </input>
                        </div>                    
                        <button type="button" className="btn btn-success">Entrar</button>
                    </form>  
                </div> 
            </div>
        )
    }
}


export default FormLogin;