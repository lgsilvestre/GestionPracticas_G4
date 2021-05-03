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
        <div>          
            <h4 className="text-center">Resolucion</h4>
            
            <Button className="btn btn-primary mr-1" onClick={()=> handleChangeState(2)}>
                Pendiente
            </Button>
            <Button className="btn btn-primary mr-1" onClick={()=> handleChangeState(1)}>
                Rechazada
            </Button>
            <Button className="btn btn-primary" onClick={()=> handleChangeState(0)}>
                Aceptada
            </Button>

            
            <div className="text-center">
                <div> 
                    <h5 > La solicitud de practica se encuentra en el estado: </h5>  
                    {
                        estadoSolicitud===0 &&
                        (<div className="card mb-3">
                            <div className="p-5">
                                <IconContext.Provider value={{size:"5em"}} >
                                    <FcApproval/>
                                </IconContext.Provider>
                                <h4>Aceptado</h4>
                                <hr/>               
                                <p>¡Tu solicitud de practica se encuentra aprobada! Ya puedes seguir con el siguiente paso
                                para subir los documentos requeridos por tu escuela. </p> 
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
                                <p >¡Tu solicitud de practica se encuentra rechazada! Puedes solicitar la informacion de tu resolucion 
                                enviando un correo electronico a practicas@utal.cl </p>
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
                                <p> Tu solicitud de practica esta a la espera de la resolucion de escuela. </p>
                            </div>    
                        </div>    )
                    }

                </div>
            </div>
            {/* <div className="d-flex">
                <ul className="list-gruop mx-auto justify-content-md-center">
                    <p>Tu solicitud se encuentra en el estado:</p>
                    <IconContext.Provider value={{size:"5em"}} >
                            <FcCheckmark/>
                    </IconContext.Provider>                   
                    <h4>Aceptado</h4>
                    
                </ul>
            </div>           */}
            <form onSubmit={handleSubmit}>
                <div style={{ paddingBottom: 30 }}>
                    <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px' , marginRight:'10px'}}>
                        <i className="fa fa-chevron-left" />
                            &nbsp; Back
                    </Button>
                    <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                        Next &nbsp;
                        <i className="fa fa-chevron-right" />
                    </Button>
                </div>
            </form>
          
        </div>
    )
}
