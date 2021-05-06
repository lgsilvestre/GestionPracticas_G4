import React from 'react'
import {
    Button
  } from 'reactstrap';

export const FormPostulacion = ({handleSubmit}) => {
    
    return (
        <div>
            <h4>Formulario de Postulacion</h4>
            <hr/>
            <form className="text-center container" onSubmit={handleSubmit}>
                <div style={{margin:"15%"}}>
                    <h5> Importante </h5>
                    <p>
                        Al solicitar tu practica, el encargado de practicas de tu escuela tiene x dias para aceptar tu solicitud y 
                        entregarte la documentación. Tendrás que esperar por la resolucion.
                    </p>
                    <Button className="btn btn-primary" type="submit">
                        Solicitar Practica
                    </Button>
                </div>
                
            </form>            
        </div>        
    )
}
