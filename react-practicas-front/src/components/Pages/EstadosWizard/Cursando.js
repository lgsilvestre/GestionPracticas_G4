import React, { useState } from 'react'
import { FcBusiness } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import {
    Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input
    } from 'reactstrap';

export const Cursando = ({previousPage, handleSubmit}) => {

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
                        <p> Estas cursando tu practica. ¡Buena suerte y da lo mejor de ti! </p>  
                        <div className="container">
                            <div className="col">
                                <p><strong>Fecha inicio: </strong> 20 de abril </p>
                            </div>
                            <div className="col">
                                <p><strong>Fecha termino: </strong> 25 de Junio </p>
                            </div>
                        </div>
                        <Button className="btn btn-primary" onClick={handleTime}>
                            Extender tiempo
                        </Button>          
                    </div>                                                            
                </div>
            </div>          
        </div>
    )
}
