import React from 'react'
import logo from'../images/logo.png';
class FormLogin extends React.Component{
    render(){

        return(
            <div>
                <div className="container">
                    <img src={logo} alt=""/>
                    <h8>Bienvenido</h8>
                    <h5>Ingresa con los datos de tu cuenta</h5> 

                    <form>  
                        <div className="form-group">
                            <label>Correo</label>
                            <input className="form-control" type="email" name="correo"></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input className="form-control" type="password" name="contraseña"></input>
                        </div>
                        
                        <button type="button" class="btn btn-success">Entrar</button>
                    </form>  
                </div> 
            </div>
        )
    }
}


export default FormLogin;