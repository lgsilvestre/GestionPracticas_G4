import React from 'react'
import {
    Button, Col, Card, CardBody
  } from 'reactstrap';

export const FormPostulacion = ({handleSubmit}) => {

    return (
        <div className="container">
            <h4>Formularion de Postulaciuon</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
                <Col>
                    <Card>
                        <CardBody>
                            
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
