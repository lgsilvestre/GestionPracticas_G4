import React, { Fragment, useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup} from 'reactstrap';
import { MdFileDownload } from 'react-icons/md'
import { Resolucion } from './Resolucion';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm' 
import { Comentario } from './Comentario';

export const FormInscripcion = ({previousPage, handleSubmit}) => {

    const cookies = new Cookies()
    const id_alumno = cookies.get('id')

    const [formValues, handleInputChange] = useForm({
      empresa: "",
      supervisor: "",
      fechaStart: "",
      fechaEnd: "",
    })

    const archivos =[
    {
        nombre:"Carta de presentación"
    },{
        nombre:"Curriculo Plan"
    },{
        nombre: "Consentimiento Informado"
    },{
        nombre:"Protocolo Covid"
    },{
        nombre: "Modulos de desempeño integrado"
    }]
  
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [mostrarResolucion, setMostrarResolucion] = useState(false)
    const [mostrarComentario, setmostrarComentario] = useState(false)
    
    const toggleTooltip =() =>{
        setTooltipOpen(!tooltipOpen)
    }
    const [modal, setModal] = useState(false)
    const [nameDownloaded, setnameDownloaded] = useState("")
    const toggle = () =>{
        setModal(!modal)
    }
    const changeNameDownloaded = (name)=>{
        setnameDownloaded(name)
    }
    const handleDownload = ( namefile ) => {
        toggle()
        changeNameDownloaded(namefile)
        console.log("descargando " ,namefile)    
    }
    
    //AXIOS POST INSCRIPCION A BASE DE DATOS
    const postInscripcion = (event) =>{
      event.preventDefault()
      console.log("Ejecutando postInscripcion:",formValues)
      setMostrarResolucion(!mostrarResolucion)
    }
  
    const inscribir = () => {
        let id_alumno = cookies.get('id')
        let numeropractica = 1
        axios.post(
          "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEstadoPracticaAlumno",
          {
            id_alumno: id_alumno,
            numero: numeropractica,
          },
        )
          .then(response => {

            console.log(response.data)

          })
          .catch(error => {
            console.log("login error: ", error);
          });
    }

    
    return (
        <div className="animate__animated animate__fadeIn animate__faster">
          {mostrarResolucion 
          ? <Resolucion 
            previousPage={previousPage} 
            handleSubmit={handleSubmit}/> 
          : 
          <div>
            <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Descarga de archivo</ModalHeader>
                  <ModalBody>
                      Descargando archivo
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={toggle}>Aceptar</Button>
                  </ModalFooter>
              </Modal>               
              <Form onSubmit={postInscripcion}>
                {mostrarComentario && <Comentario />}
                <h4>Datos de Practica</h4>
                <hr/>
                {/* Input para nombre de empresa */}
                <FormGroup row >
                    <Label sm={2} for = "empresa"> Nombre empresa </Label>
                    <Col sm={10} >
                        <Input type="text" name="empresa" onChange={handleInputChange}/>
                    </Col>        
                </FormGroup>
                {/* Input para nombre de supervisor */}
                <FormGroup row >
                    <Label sm={2} for = "supervisor"> Nombre supervisor </Label>
                    <Col sm={10} >
                        <Input type="text" name="supervisor" onChange={handleInputChange} />
                    </Col>        
                </FormGroup>
                {/* Input para fecha de inicio */}
                <FormGroup row >
                    <Label sm={2} for = "fechaStart"> Fecha inicio practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaStart" onChange={handleInputChange}/>
                    </Col>        
                </FormGroup>
                {/* Input para fecha de termino */}
                <FormGroup row >
                    <Label sm={2} for = "fechaEnd"> Fecha fin practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaEnd" onChange={handleInputChange}/>
                    </Col>        
                </FormGroup>

                <h4>Documentos <span style={{textDecoration: "underline", color:"blue"}} href="#" id="infoDocs">i</span></h4>
                <Tooltip placement="right" isOpen={tooltipOpen} target="infoDocs" toggle={toggleTooltip}>
                    Primero debes descargar tus documentos, editarlos y luego subirlos con tu información.
                </Tooltip>
                <hr/>
                {/* Por cada archivo presente en el arreglo archivos, crea el formulario para descargarlo y subirlo */}
                {                  
                    archivos.map( (file,index) => (
                        <FormGroup key={index} row>
                            <Label sm={3} for={`file${index}`}>{file.nombre}</Label>      
                            <Button onClick={handleDownload} color="info">
                                <MdFileDownload/>
                            </Button> 
                            <Col xs={6}>
                                <Input type="file" name={`namefile${index}`} id={`file${index}`} />
                            </Col>
                            <FormText color="muted">                          
                            </FormText>
                        </FormGroup>
                    ))
                }
                
                <hr/>
                <div className=" text-center" style={{marginBottom:20}}>
                <Button className="btn btn-primary" type="submit">
                    Inscribir Practica
                </Button>
              </div>
                  
            </Form>
          </div>
        }
        </div>
    )
}
