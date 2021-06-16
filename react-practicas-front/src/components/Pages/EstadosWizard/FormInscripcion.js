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
    const [archivos, setArchivos] = useState([])
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
      console.log("Info a enviar:",formValues)
      enviarDatosInscripcion()
      setMostrarResolucion(!mostrarResolucion)
    }
    const enviarDatosInscripcion = () => {
      axios.post(
        "http://localhost/GestionPracticas_G4/ci-practicas-back/public/inscribirInfo",
        {
          id_alumno:id_alumno,
          empresa:formValues.empresa,
          supervisor:formValues.supervisor,
          fch_inicio:formValues.fechaStart,
          fch_termino:formValues.fechaEnd
        },
      )
      .then(response=>{
        console.log("RESPUESTA ENVIAR DATOS INSC: ",response)
        if(response.data===true){
          console.log("ES TRUE")
          // setMostrarResolucion(!mostrarResolucion)
        }
      })
      .catch(error =>{
        console.log("Error enviando datos inscripcion: ", error)
      })
    }

    const getDocs = () => {
        let id_alumno = cookies.get('id')
        let numeropractica = 1
        axios.post(
            "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getInstDocuAlumno",
            {
              id_alumno: id_alumno,
              numero: numeropractica,
            },
          )
            .then(response => {
              console.log("RESPUESTA INSTANCIAS DOCUMENTOS:  ",response.data)
              setArchivos(response.data)
            })
            .catch(error => {
              console.log("login error: ", error);
        });
    }

    useEffect(() => {
      getDocs()
    }, [])
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
              {mostrarComentario && (
                <div>
                  <h4>Comentarios</h4>
                  <Comentario />
                </div>
              )}
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
                      <div key={index} className="container" style={{marginBottom:"10px"}}>
                        <div className="row">
                            <div className="col">
                              <Label for={`file${index}`}>{file.nombre}</Label>      
                            </div>
                            <div className="col-auto">
                              <Button onClick={handleDownload} color="info">
                                  <MdFileDownload/>
                              </Button> 
                            </div>
                            <div className ="col">
                              {file.requerido === "1" &&                        
                                  <Input type="file" name={`namefile${index}`} id={`file${index}`} />
                              }
                            </div>
                        </div>
                        <div className="row">
                          {file.comentario !== "" &&
                          (
                            <div className="col" style={{marginTop:"10px"}}>
                              <Comentario mensaje={file.comentario}/>                  
                            </div>
                          )
                          }
                          
                        </div>                            
                      </div>
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
