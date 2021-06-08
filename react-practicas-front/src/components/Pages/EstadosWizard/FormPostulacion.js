import axios from 'axios';
import React, { useState } from 'react'
import {
    Button
  } from 'reactstrap';
import Cookies from 'universal-cookie'

export const FormPostulacion = ({handleSubmit, matricula="2016407004"}) => {
    const cookies = new Cookies()

    const datosDefecto = {
        estudiante:4,
        nombre: "Prueba de alumno",
        carrera: "Prueba de carrera",
        correo_inst: "prueba@prueba.cl",
        correo_per: "prueba@alumnos.utalca.cl",
        rut: "123456789",
        matricula: "2016407111"
    }
    const [dataEstudiante, setdataEstudiante] = useState({})

    const getEstudiante = async()=>{
        await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getAlumnoMatricula",{
            params:{
                matricula:matricula
            }
        })
        .then(response =>{
            const datosEstudiante = {
                nombre: response.data.nombre,
                carrera: response.data.nbe_carrera,
                correo_inst: response.data.correo_ins,
                correo_per: response.data.correo_per,
                rut: response.data.rut,
                matricula: response.data.matricula
            }
            setdataEstudiante(datosEstudiante)
            console.log(dataEstudiante)
        })
    }

    const postPractica = async() =>{
        await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/ingresarPractica",{
            'id_alumno': cookies.get('id'),
            'nropractica': 1
        })
        .then(response=>{
            if (response.data == true){
                console.log("INGRESADA")
                divMensaje.mensaje = solicitada
            }
        })
    }    

    const solicitar = (
        <div>
            <h5> Importante </h5>
            <p>
            Luego de solicitar tu practica (haciendo click en el boton de abajo), el encargado de practicas de tu escuela tiene <strong>7 dias </strong> 
            para responder a tu solicitud. Tendrás que esperar por la resolución.
            </p>
            <Button className="btn btn-primary" onClick={postPractica}>
            Solicitar Practica
            </Button>
        </div>
    )

    const solicitada = (
        <div>
            <h5> ¡Solicitud en revisión! </h5>
            <p>
            La solicitud de tu práctica está siendo revisada por el supervisor de prácticas de tu escuela. 
            </p>
        </div>
    )
    
    const divMensaje = {
        mensaje : solicitar
    }

    const handleSolicitar = async() =>{
        console.log("solicitar")
       // await getEstudiante()
        await postPractica()
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h4>Formulario de Postulacion</h4>
            <hr/>
            <form className="text-center container">
                <div style={{margin:"15%"}}>
                    {divMensaje.mensaje}
                    {/* <h5> Importante </h5>
                    <p>
                        Luego de solicitar tu practica (haciendo click en el boton de abajo), el encargado de practicas de tu escuela tiene <strong>7 dias </strong> 
                        para responder a tu solicitud. Tendrás que esperar por la resolución.
                    </p>
                    <Button className="btn btn-primary" onClick={postPractica}>
                        Solicitar Practica
                    </Button> */}
                </div>
                
            </form>            
        </div>        
    )
}
