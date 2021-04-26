import React from 'react'
import {
    Button
  } from 'reactstrap';

export const FormPostulacion = ({handleSubmit}) => {

    return (
        <div>
            <h4>Formularion de Postulaciuon</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div style={{ paddingBottom: 30 }}>
                    <Button color="primary" className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
                        Next
                    </Button>
                </div>
            </form>
            
        </div>
    )
}
