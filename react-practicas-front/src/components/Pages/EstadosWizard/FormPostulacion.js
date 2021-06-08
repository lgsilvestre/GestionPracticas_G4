import axios from 'axios';
import React, { useState } from 'react'
import {
    Button
  } from 'reactstrap';

export const FormPostulacion = ({handleSubmit, matricula="2016407004"}) => {
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
        console.log("Post practica con datos")
        console.log(datosDefecto)
        await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/solicitarPractica",{
            'estudiante': datosDefecto.estudiante,
            'nropractica':1,
            'estado': "Solicitar",
        })
        .then(response=>{
            console.log(response.data)
        })
    }
    const handleSolicitar = async() =>{
        console.log("solicitar")
       // await getEstudiante()
        await postPractica()
        handleSubmit()
    }
    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h4>Formulario de Postulacion</h4>
            <hr/>
            <form className="text-center container">
                <div style={{margin:"15%"}}>
                    <h5> Importante </h5>
                    <p>
                        Luego de solicitar tu practica (haciendo click en el boton de abajo), el encargado de practicas de tu escuela tiene <strong>x dias </strong> 
                        para responder a tu solicitud. Tendrás que esperar por la resolución.
                    </p>
                    <Button className="btn btn-primary" onClick={handleSolicitar}>
                        Solicitar Practica
                    </Button>
                </div>
                
            </form>            
        </div>        
    )
}
