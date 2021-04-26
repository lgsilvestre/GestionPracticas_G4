import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router'
import { useForm } from '../../hooks/useForm'
import AlertDialog from '../ui/AlertDialog/AlertDialog'

export const CambiarPassword = ({oldpass="1234"}) => {

    const [open, setOpen] = useState(false)
    const [changedPass, setChangedPass] = useState(false)
    const [formValues, handleInputChange] = useForm({
        newPass:"",
        newPassRepite:""
    })
    if(changedPass){
        console.log("redirigiendo")
        return <Redirect to="/estudiante"/>
    }
    const {newPass, newPassRepite} = formValues;   
    const handleChangePass = (e) =>{
        e.preventDefault()
        
        if(newPass!==newPassRepite){
            setOpen(true)  
            console.log("no se realizo actulizacion")         
        }
        else{
            console.log(`contrasena nueva: ${newPass} ${newPassRepite}`)
            setChangedPass(true)
        }
        //Aca realizar el post hacia la base de datos   
    }
   
    return (
        <Fragment>
            <AlertDialog open={open} setOpen={setOpen} message="Las contraseñas no coinciden"/>
            <div className=" container align-self-center justify-content-center d-flex p-5 " style={{maxHeight:"100%", }} >
            
                <form onSubmit={handleChangePass}>
                    <div className="form-group" >                  
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
                    </div>
                    <button type="submit" className="btn btn-primary">Cambiar</button>
                </form>
            </div>
        </Fragment>
        
    )
}
