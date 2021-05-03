import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Tooltip } from 'reactstrap';

export const FormInscripcion = ({previousPage, handleSubmit}) => {


    const [tooltipOpen, setTooltipOpen] = useState(false);
    
    const toggleTooltip =() =>{
        setTooltipOpen(!tooltipOpen)
    }

    return (
        <div>
            
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
                <FormGroup>
                    <Label for="exampleFile">Carta de presentación</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                       
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Curriculo Plan</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                       
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Consentimiento Informado</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Protocolo Covid</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                       
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">Modulos de desempeño integrado de competencia</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">

                    </FormText>
                </FormGroup>


                <div style={{ paddingBottom: 30 }}>
                    <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px' , marginRight:'10px'}}>
                        <i className="fa fa-chevron-left" />
                            &nbsp; Back
                    </Button>
                    <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                        Next &nbsp;
                        <i className="fa fa-chevron-right" />
                    </Button>
                </div>
            </Form>
        </div>
    )
}
