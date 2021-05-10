import React from 'react'
import { FcGraduationCap } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import {
    Button, FormGroup, Label, Input, Form, Col, FormText
    } from 'reactstrap';
export const Termino = ({previousPage}) => {

    const archivos =[
        {
            nombre:"Informe de tesis"
        }]


    return (
        <div>
            <h4>Termino de Practica</h4>
            <hr/>
            <div >      
                <div className="card mb-3">
                    <div className="p-5">
                        <div className="text-center">
                            <IconContext.Provider value={{size:"5em"}} >
                                <FcGraduationCap/>
                            </IconContext.Provider> 
                            <h4>¡Felicidades!</h4>
                            <hr/>  
                            <p> Has terminado tu práctica. Esperamos que hayas aprendido y aplicado todo lo que sabes</p>        
                        </div> 
                        <div>
                            <Form>  
                                <h4>Documentos</h4>
                                <hr/>
                                <p>En esta seccion subiras todos los documentos exigidos por tu escuela para terminar tu tesis.</p>
                                
                                {                  
                                    archivos.map( (file,index) => (
                                        <FormGroup key={index} row>
                                            <Col sm={2}>
                                                <Label for={`file${index}`}>{file.nombre}</Label>       
                                            </Col>
                                            <Col sm={3}>
                                                <Input type="file" name={`namefile${index}`} id={`file${index}`} />
                                            </Col>
                                            <FormText color="muted">                          
                                            </FormText>
                                        </FormGroup>
                                    ))
                                }
                            </Form>     
                        </div>                               
                    </div>
                    
                </div>
            </div>
            
            <form >
                <div style={{ paddingBottom: 30 }}>
                    <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px' , marginRight:'10px'}}>
                        <i className="fa fa-chevron-left" />
                            &nbsp; Back
                    </Button>
                    
                </div>
            </form>
          
        </div>
    )
}
