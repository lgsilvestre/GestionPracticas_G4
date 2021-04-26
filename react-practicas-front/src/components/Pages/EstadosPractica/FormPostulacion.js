import { FormGroup } from '@material-ui/core';
import React from 'react'
import {
    Button, Col, Card, CardBody
  } from 'reactstrap';

export const FormPostulacion = ({handleSubmit}) => {

    return (
        <div >
            <h4>Formulario de Postulacion</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
                <Col>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Col xs="12" lg="6">
                                
                                </Col>
                            </FormGroup>
                        </CardBody>
                        <div style={{ paddingBottom: 30 }}>
                            <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                                Next &nbsp;
                                <i className="fa fa-chevron-right" />
                            </Button>
                        </div>
                    </Card>
                </Col>

                
            </form>
            
        </div>
    )
}
