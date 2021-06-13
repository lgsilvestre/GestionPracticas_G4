import React, { Fragment, useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup} from 'reactstrap';
import { MdFileDownload } from 'react-icons/md'
import { Resolucion } from './Resolucion';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm' 

export const FormInscripcion = ({previousPage, handleSubmit}) => {

    const cookies = new Cookies()
    const id_alumno = cookies.get('id')

    const [practica , setDatosPractica ]=useState({
        nombreEmpresa: "",
        nombreSupervisor: "",
        fechaInicio: "",
        fechaTermino: "",
    })

    const [formValues, handleInputChange] = useForm({
        nombreEmpresa: "",
        nombreSupervisor: "",
        fechaInicio: "",
        fechaTermino: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDatosPractica ( prevState=> ({
          ...prevState,
          [name]: value
        }))
        console.log(practica);
    }

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
    const postInscripcion = () =>{
      console.log(formValues)
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

    const FormInscripcion = () =>{
      return (
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
            
        
            
                <h4>Datos de Practica</h4>
                <hr/>
                {/* Input para nombre de empresa */}
                <div>
                    <Label sm={2} for = "nombreEmpresaId"> Nombre empresa </Label>
                    <Col sm={10} >
                        {/* <Input type="text" name="empresa" id="nombreEmpresaId" onChange={handleInputChange}/> */}
                        <TextField variant="outlined" name="empresa" id="nombreEmpresaId" type="text" onChange={handleInputChange}/>
                    </Col>        
                </div>
                {/* Input para nombre de supervisor */}
                <div>
                    <Label sm={2} for = "nombreSupervisor"> Nombre supervisor </Label>
                    <Col sm={10} >
                        <Input type="text" name="supervisor" id="nombreSupervisor" onChange={handleInputChange}/>
                    </Col>        
                </div>
                {/* Input para fecha de inicio */}
                <div>
                    <Label sm={2} for = "fechaInicio"> Fecha inicio practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaStart" id="fechaInicio" onChange={handleInputChange}/>
                    </Col>        
                </div>
                {/* Input para fecha de termino */}
                <div>
                    <Label sm={2} for = "fechaTermino"> Fecha fin practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaEnd" id="fechaTermino" onChange={handleInputChange}/>
                    </Col>        
                </div>

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
                  <Button className="btn btn-primary" onClick={postInscripcion}>
                      Inscribir Practica
                  </Button>
                </div>
                    {/* <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px' , marginRight:'10px'}}>
                        <i className="fa fa-chevron-left" />
                            &nbsp; Back
                    </Button>
                    <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                        Next &nbsp;
                        <i className="fa fa-chevron-right" />
                    </Button> */}
            
        </div>
      )
    }
    return (
        <div className="animate__animated animate__fadeIn animate__faster">
          {mostrarResolucion 
          ? <Resolucion 
            previousPage={previousPage} 
            handleSubmit={handleSubmit}/> 
          : <FormInscripcion/> }
        </div>
    )
}
