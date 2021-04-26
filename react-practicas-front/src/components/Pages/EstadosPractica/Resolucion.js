import React from 'react'
import {
        Button,
    } from 'reactstrap';
export const Resolucion = ({previousPage, handleSubmit}) => {
    return (
        <div>
            <h4>Resolucion</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
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
            </form>
          
        </div>
    )
}
