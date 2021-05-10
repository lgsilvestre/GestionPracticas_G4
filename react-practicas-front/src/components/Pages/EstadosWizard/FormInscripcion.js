import React, { Fragment, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup} from 'reactstrap';
import {MdFileDownload} from 'react-icons/md'
export const FormInscripcion = ({previousPage, handleSubmit}) => {

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
            <Form onSubmit={handleSubmit}>
            
                <h4>Datos de Practica</h4>
                <hr/>
                {/* Input para nombre de empresa */}
                <FormGroup row >
                    <Label sm={2} for = "nombreEmpresaId"> Nombre empresa </Label>
                    <Col sm={10} >
                        <Input type="text" name="empresa" id="nombreEmpresaId"/>
                    </Col>        
                </FormGroup>
                {/* Input para nombre de supervisor */}
                <FormGroup row >
                    <Label sm={2} for = "nombreSupervisor"> Nombre supervisor </Label>
                    <Col sm={10} >
                        <Input type="text" name="supervisor" id="nombreSupervisor"/>
                    </Col>        
                </FormGroup>
                {/* Input para fecha de inicio */}
                <FormGroup row >
                    <Label sm={2} for = "fechaInicio"> Fecha inicio practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaStart" id="fechaInicio"/>
                    </Col>        
                </FormGroup>
                {/* Input para fecha de termino */}
                <FormGroup row >
                    <Label sm={2} for = "fechaTermino"> Fecha fin practica</Label>
                    <Col sm={10} >
                        <Input type="date" name="fechaEnd" id="fechaTermino"/>
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

               
                    <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px' , marginRight:'10px'}}>
                        <i className="fa fa-chevron-left" />
                            &nbsp; Back
                    </Button>
                    <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                        Next &nbsp;
                        <i className="fa fa-chevron-right" />
                    </Button>
                
            </Form>
        </div>
    )
}
