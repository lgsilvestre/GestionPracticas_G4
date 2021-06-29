import React, { useState } from 'react'
import { FcBusiness } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import {
    Button,FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input, Card
    } from 'reactstrap';
import { 
  IconButton,  
  ListItem,  
  ListItemIcon,  
  ListItemSecondaryAction, } from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';

export const Cursando = ({previousPage, handleSubmit}) => {

  const [fechas, setFechas] = useState({
    fechaInicio:"0000-00-00",
    fechaTermino:"0000-00-00"
  })
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleTime = ()=>{
      toggle()
  }
  return (
      <div className="animate__animated animate__fadeIn animate__faster">
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
          <div className="text-center">      
              <div className="card mb-3">
                  <div className="p-5">
                      <IconContext.Provider value={{size:"5em"}} >
                          <FcBusiness/>
                      </IconContext.Provider> 
                      <h4>Cursando</h4>
                      <hr/>  
                      <p> Estas cursando tu práctica. ¡Buena suerte y da lo mejor de ti! </p>  
                      <div className="container">
                          <div className="col">
                              <p><strong>Fecha inicio: </strong> {fechas.fechaInicio} </p>
                          </div>
                          <div className="col">
                              <p><strong>Fecha termino: </strong> {fechas.fechaTermino} </p>
                          </div>
                      </div>
                      <Button className="btn btn-primary" onClick={handleTime}>
                          Extender tiempo
                      </Button>
                      <hr/>
                      <p>Puedes descargar la plantilla del informe de práctica. Te recomendamos que a medida 
                      que realizas tu práctica vayas completando tu informe para que no te pierdas de nada.</p>
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-auto">
                            <Card style={{width:"70vh"}}>
                              <ListItem>
                                <div className="col-sm-auto">              
                                  <ListItemIcon style={{color:'#f69b2e'}}>
                                    <VscFilePdf style={{width:"30px",height:"30px"}}/>
                                  </ListItemIcon>
                                </div>
                                <div className="col-sm">                           
                                  Plantilla de informe de práctica                                                           
                                </div>
                                <div className="col-sm-auto" style={{minWidth:"200px"}}>
                                  <ListItemSecondaryAction>                         
                                    <IconButton  style={{color:'#f69b2e'}}>
                                      <MdFileDownload />
                                    </IconButton>                                                                                                       
                                  </ListItemSecondaryAction>                                                                
                                </div>                       
                              </ListItem>
                            </Card>          

                          </div>
                        </div>
                      </div>
                  </div>                                                            
              </div>
          </div>          
      </div>
  )
}
