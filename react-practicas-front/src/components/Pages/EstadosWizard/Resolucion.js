import React, { useState } from 'react'
import {FcApproval,FcCancel, FcClock} from 'react-icons/fc'
import { IconContext } from 'react-icons/lib';
import {
        Button,
    } from 'reactstrap';
export const Resolucion = ({previousPage, handleSubmit}) => {

    const [estadoSolicitud, setEstadoSolicitud] = useState(2)
    const handleChangeState=(estado)=>{
        setEstadoSolicitud(estado)
    }
    return (
        <div className="animate__animated animate__fadeIn animate__faster">          
            <div className="text-center">
                <div> 
                    <h5 > Esta etapa de tu práctica se encuentra en el estado: </h5>  
                    {
                        estadoSolicitud===0 &&
                        (<div className="card mb-3">
                            <div className="p-5">
                                <IconContext.Provider value={{size:"5em"}} >
                                    <FcApproval/>
                                </IconContext.Provider>
                                <h4>Aceptado</h4>
                                <hr/>               
                                <p>¡Esta etapa se encuentra aprobada! Ya puedes seguir con el siguiente paso </p> 
                            </div>                                                
                        </div>)
                    }
                    {
                        estadoSolicitud===1 &&
                            (
                        <div className="card mb-3" >
                            <div className="p-5">
                                <IconContext.Provider value={{size:"5em"}} >
                                    <FcCancel/>
                                </IconContext.Provider>
                                <h4>Rechazada</h4>
                                <hr/>
                                <p >¡Esta etapa se encuentra rechazada! Puedes ver mas información de tu resolución 
                                en el correo enviado </p>
                            </div>    
                        </div>)
                    }
                    {
                        estadoSolicitud===2 &&
                            (
                        <div className="card mb-3" >
                            <div className="p-5">
                                <IconContext.Provider value={{size:"5em"}} >
                                  <FcClock/>
                                </IconContext.Provider>
                                <h4>Pendiente</h4>
                                <hr/>
                                <p> Esta etapa se encuentra esta a la espera de una resolución por parte del encargado de escuela.
                                Te notificaremos mediamte correo electrónico cuando haya alguna respuesta.</p>
                            </div>    
                        </div>    )
                    }

                </div>
            </div>                
        </div>
    )
}
