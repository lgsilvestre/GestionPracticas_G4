import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FcBusiness } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import {
    Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input
    } from 'reactstrap';

export const CursandoAdmin = ({nextPage, nroMatricula,nroPractica, idAlumno}) => {
  console.log("props: ",nroMatricula, nroPractica, idAlumno)
    const [modal, setModal] = useState(false);
    const [fechas, setFechas] = useState({})
    const toggle = () => setModal(!modal);
    const handleTime = ()=>{
        toggle()
    }
    
    const actualizarEstadoPractica = () => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/pasarEstadoEvaluar",{
        id_alumno:idAlumno
      })
      .then(response=>{
        //1 exito 0 fracaso
        console.log("Respuesta Actualizar: " , response.data)
        nextPage()
      })
      .catch(error => {
        console.log("Error: ", error)
      });
    }
    
    const handleAvanzar = () => {
      
      actualizarEstadoPractica()
    }
    const getFechas = () => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getFechas",{
        id_alumno:idAlumno
      }).then(response=>{
        console.log("GetFechas:",response.data[0])
        setFechas(response.data[0])
      }).catch(error=>{
        console.log("Error con getFechas", error)
      })
    }
    useEffect(() => {
      getFechas()
    }, [])
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Extender tiempo de practica</ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <Label for = "nuevaFecha"> Ingresa una nueva fecha</Label>
                        <Input type="date" name="nuevaFechaName" id="nuevaFecha"/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            <h4>Cursando Practica</h4>
            <hr/>
            <div className="text-center">      
                <div className="card mb-3">
                    <div className="p-5">
                        <IconContext.Provider value={{size:"5em"}} >
                            <FcBusiness/>
                        </IconContext.Provider> 
                        <h4>Cursando</h4>
                        <hr/>  
                        <p> Este alumno esta cursando su practica. </p>  
                        <div className="container">
                            <div className="col">
                                <p><strong>Fecha inicio: </strong> {fechas.fecha_inicio} </p>
                            </div>
                            <div className="col">
                                <p><strong>Fecha termino: </strong> {fechas.fecha_termino} </p>
                            </div>
                        </div>
                        <div className="col" style={{marginBottom:"10px"}}>
                          <Button className="btn btn-primary" onClick={handleTime}>
                              Extender tiempo
                          </Button>          
                        </div>
                        <div className="col" style={{marginBottom:"10px"}}>
                          <Button className="btn btn-primary" onClick={handleAvanzar}>
                              Evaluar práctica
                          </Button>          
                        </div>
                    </div>                                                            
                </div>
            </div>
        </div>
    )
}
