import React from 'react'
import {
        Button,
    } from 'reactstrap';
export const Termino = ({previousPage}) => {
    return (
        <div>
            <h4>Termino de Practica</h4>
            <hr/>
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
