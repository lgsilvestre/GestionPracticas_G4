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
                        Luego de solicitar tu practica (haciendo click en el boton de abajo), el encargado de practicas de tu escuela tiene <strong>x dias </strong> 
                        para respodner a tu solicitud. Tendrás que esperar por la resolución.
                    </p>
                    <Button className="btn btn-primary" type="submit">
                        Solicitar Practica
                    </Button>
                </div>
                
            </form>            
        </div>        
    )
}
