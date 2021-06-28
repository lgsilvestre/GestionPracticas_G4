import axios from 'axios';
import React, { useState } from 'react'
import {
    Button
  } from 'reactstrap';
import Cookies from 'universal-cookie'
import { Comentario } from './Comentario';
import { Resolucion } from './Resolucion';

export const FormPostulacion = ({handleSubmit, previousPage}) => {
    const cookies = new Cookies()
    const [mostrarResolucion, setMostrarResolucion] = useState(false)
    const [mostrarComentario, setmostrarComentario] = useState(false)
    const datosDefecto = {
        estudiante:4,
        nombre: "Prueba de alumno",
        carrera: "Prueba de carrera",
        correo_inst: "prueba@prueba.cl",
        correo_per: "prueba@alumnos.utalca.cl",
        rut: "123456789",
        matricula: "2016407111"
    }

    const postPractica = async() =>{
        await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/ingresarPractica",{
            'id_alumno': cookies.get('id'),
            'nropractica': 1
        })
        .then(response=>{
            if (response.data == true){
                console.log("INGRESADA")
                setMostrarResolucion(true)
            }
        })
    }    
    
    return (
        <div>
          {mostrarResolucion 
          ? <Resolucion 
            previousPage={previousPage} 
            handleSubmit={handleSubmit}/> 
          : 
          (
            <div>          
                {mostrarComentario && 
                (
                  <div>
                    <h4>Cursando</h4>
                    <Comentario />
                  </div>
                )}
                <form className="text-center container">
                  <div style={{margin:"15%"}}>
                    <h5> Importante </h5>
                    <p>
                      Luego de solicitar tu practica (haciendo click en el boton de abajo), el encargado de practicas de tu escuela tiene <strong>7 dias </strong> 
                      para responder a tu solicitud. Tendrás que esperar por la resolución.
                    </p>
                    <Button className="btn btn-primary" onClick={postPractica}>
                        Solicitar Practica
                    </Button> 
                  </div>
                </form>       
            </div>
          ) }
        </div>        
    )
}
