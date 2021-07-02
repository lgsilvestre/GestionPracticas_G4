import { Alert } from 'reactstrap'
import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router'
import { useForm } from '../../hooks/useForm'

export const CambiarPassword = ({oldpass="1234"}) => {

    const [visible, setVisible] = useState(false)
    const onDismissAlert= () =>{setVisible(false)}
    const [changedPass, setChangedPass] = useState(false)
    const [oldPassError, setoldPassError]= useState("");    
    const [newPassError, setnewPassError]= useState("");
    const [newPassRepError, setnewPassRepError]= useState("");
    const [formValues, handleInputChange] = useForm({
        oldPass:"",
        newPass:"",
        newPassRepite:""
    })
    if(changedPass){
        console.log("redirigiendo")
        return <Redirect to="/estudiante"/>
    }

    const {newPass, newPassRepite} = formValues;  
    
    function oldPassValidation(){
        let oldPass = formValues.oldPass;
        const oldPassErrorVal=[];
        let nuevoUserValidado = true;
    
        if(oldPass === '' ){
          
          oldPassErrorVal.Requiered ="Debes ingresar tu contraseña anterior.";
          nuevoUserValidado = false;
          setoldPassError(oldPassErrorVal);
          return nuevoUserValidado;
        }
        else{
            oldPassErrorVal.nombreCorrecto = "";
            setoldPassError(oldPassErrorVal);
            return nuevoUserValidado;
        }      
      }
    
      function newPassValidation(){
        let newPass = formValues.newPass;
        const newPassErrorVal=[];
        let nuevoUserValidado = true;
    
        if(newPass === '' ){
          
          newPassErrorVal.Requiered ="Debes ingresar tu nueva contraseña.";
          nuevoUserValidado = false;
          setnewPassError(newPassErrorVal);
          return nuevoUserValidado;
        }
        
        else{

            newPassErrorVal.nombreCorrecto = "";
            setnewPassError(newPassErrorVal);
            return nuevoUserValidado;
        }      
      }
      function newPassRepValidation(){
        let newPassRep = formValues.newPassRepite;
        const newPassRepErrorVal=[];
        let nuevoUserValidado = true;
        if(newPassRep.Length === '0' ){
          nuevoUserValidado = false;
          newPassRepErrorVal.Requiered ="debes volver a ingresar tu nueva contraseña";
          setnewPassRepError(newPassRepErrorVal);
          return nuevoUserValidado;
        }
        else if(newPass!==newPassRepite){
            newPassRepErrorVal.noMatch ="Deben coincidir.";
            nuevoUserValidado = false;
            setnewPassRepError(newPassRepErrorVal);
            return nuevoUserValidado;
          }
          else if(newPass===newPassRepite){
            newPassRepErrorVal.nombreCorrecto = "";
            setnewPassRepError(newPassRepErrorVal);
            return nuevoUserValidado;
          }      
      }
    
    const handleChangePass = (e) =>{
        e.preventDefault()
        
        const oldVal = oldPassValidation();
        const newVal = newPassValidation();
        const newRepVal = newPassRepValidation();

        if( oldVal === true && newVal === true && newRepVal === true){
            console.log("todos los campos son validos")
            setnewPassError("");
            setoldPassError("");
            setnewPassRepError("");

            console.log(`contrasena nueva: ${newPass} ${newPassRepite}`)
            setChangedPass(true)
        }

        else{
            console.log("no es valido")
            setChangedPass(false)
        }
          
    }
   
    return (
        <Fragment>
            {/* <AlertDialog open={open} setOpen={setOpen} message="Las contraseñas no coinciden"/> */}
            <Alert isOpen={visible} toggle={onDismissAlert} color="danger">"Las contraseñas no coinciden. Por favor, ingrese dos contraseñas iguales"</Alert>
            <div className=" container align-self-center justify-content-center d-flex p-5 " style={{maxHeight:"100%", }} >
                <form onSubmit={handleChangePass}>
                    
                    <div className="form-group">
                        <label >Contraseña Actual</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="repiteNewPass" 
                            placeholder="old Password"
                            name="oldPass"                          
                            maxLength = "8"
                            onChange={handleInputChange}
                        />
                        {Object.keys(oldPassError).map((key)=>{
                            return <div style={{color:"red"}}>{oldPassError[key] }</div>  
                            })}

                    </div>
                    <div className="form-group">
                        <label >Contraseña nueva</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="newPass" 
                            placeholder="new Password"
                            name="newPass"
                            maxLength = "8"
                            onChange={handleInputChange}
                        />
                        {Object.keys(newPassError).map((key)=>{
                            return <div style={{color:"red"}}>{newPassError[key] }</div>  
                            })}
                    </div>
                    <div className="form-group">
                        <label >Repita contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="repiteNewPass" 
                            placeholder="new Password"
                            name="newPassRepite"                          
                            maxLength = "8"
                            onChange={handleInputChange}
                        />
                        {Object.keys(newPassRepError).map((key)=>{
                            return <div style={{color:"red"}}>{newPassRepError[key] }</div>  
                            })}
                    </div>
                    <button type="submit" className="btn btn-primary">Cambiar</button>
                </form>
            </div>
        </Fragment>
        
    )
}
