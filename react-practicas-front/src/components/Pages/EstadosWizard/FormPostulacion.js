import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Button
  } from 'reactstrap';
import Cookies from 'universal-cookie'
import { Comentario } from './Comentario';
import { Resolucion } from './Resolucion';

export const FormPostulacion = ({handleSubmit, previousPage,nroPractica, denegada}) => {
    const cookies = new Cookies()
    const [mostrarResolucion, setMostrarResolucion] = useState(false)
    const [mostrarComentario, setmostrarComentario] = useState(false)
    const [retroalimentacion, setRetroalimentacion] = useState("")
    const [estado, setEstado] = useState("")

    const getSolicitud = async() => {   
      // console.log("Get solicitud ",nroPractica)
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getSolicitud",{
          'id_alumno': cookies.get('id'),
          'nropractica': nroPractica
        })
        .then(response=>{
          console.log("Estado solicitud:",response.data)
          if(response.data[0].estado==="Rechazada"){
            setEstado("")
            setMostrarResolucion(false)
            setmostrarComentario(true)
            solicitarRetroalimentacion()
          }
          if(response.data[0].estado==="Pendiente"){
            setEstado("Pendiente")
            setMostrarResolucion(true)
          }
          else{
            // console.log("No existe solicitud aun")
          }
        }).catch(error=>{
          console.log("ERROR GET ESTADO SOLICITUD", error)
        })
    }
    const solicitarRetroalimentacion  = () => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getRetroalimentacion",{
        id_alumno:cookies.get('id'),
        'nropractica': nroPractica
      }).then(response=>{
        console.log(response.data)
        if(response.data !== 0){
          setRetroalimentacion(response.data[0].retroalimentacion)
        }
      }).catch(error=>{
        console.log("ERROR RETROALIMENTACION ",error)
      })
    }
    
    const postPractica = async() =>{
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/ingresarPractica",{
          'id_alumno': cookies.get('id'),
          'nropractica': nroPractica
      })
      .then(response=>{
          if (response.data == true){
              // console.log("INGRESADA")
              setEstado("Pendiente")
              setMostrarResolucion(true)  
              postPracticaCorreo()
          }
      })
    } 
    
    const postPracticaCorreo = () =>{
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/ingresarPracticaCorreo",{
          'id_alumno': cookies.get('id')
      })
    } 

    useEffect(() => {
      getSolicitud()
    }, [])
    return (
        <div>
          {mostrarResolucion 
          ? <Resolucion 
            previousPage={previousPage} 
            handleSubmit={handleSubmit}
            nroPractica = {nroPractica}
            estado={estado}
            /> 
          : 
          (
            <div>          
                {mostrarComentario && 
                (
                  <div>             
                    <Alert severity="error" style={{marginBottom:"1vh"}}>
                      ¡Han rechazado tu solicitud! A continuación podrás ver la retroalimentación y también podras solicitar una nueva práctica, 
                      pero ten en cuenta los requisitos.
                    </Alert>    
                    <Comentario mensaje={retroalimentacion} />
                  </div>
                )}
                {
                  denegada && (
                    <div>             
                    <Alert severity="error" style={{marginBottom:"1vh"}}>
                      ¡Esta práctica ha sido denegada! No hay nada que puedas hacer, salvo comenzar el proceso nuevamente, comunicate con tu
                      encargado de prácticas para mas información. La retroalimentación se muestra a continuación:
                    </Alert>    
                    <Comentario mensaje={retroalimentacion} />
                  </div>
                  )
                }
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
