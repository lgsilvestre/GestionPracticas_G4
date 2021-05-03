import React, { useState } from 'react'
import Stepper from 'react-stepper-horizontal'
import { Cursando } from './EstadosPractica/Cursando'
import { Resolucion } from './EstadosPractica/Resolucion'
import { Termino } from './EstadosPractica/Termino'
import { Card } from 'reactstrap';
import {FormPostulacion} from './EstadosPractica/FormPostulacion'
import { FormInscripcion } from './EstadosPractica/FormInscripcion'
const Practicas = () => {

    const steps = [
        {title: "Solicitar"},
        {title: "Resolucion"},
        {title: "Inscripcion"},
        {title: "Cursando"},
        {title: "Terminada"} 
    ]
    
    const [page, setPage] = useState(0)
    const nextPage = (e) =>{       
        setPage(page+1)
    }
    const previousPageFuncion = ()=>{
        setPage(page-1)
    }
    return (
        <Card className="container mt-3 mb-3">
            <Stepper 
                steps={steps}
                size={40}
                circleFontSize={18}
                activeStep={ page }
            />
            <hr/>
            { page===0 && <FormPostulacion handleSubmit={nextPage} /> }
            { page===1 && <Resolucion previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            { page===2 && <FormInscripcion previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            { page===3 && <Cursando previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            { page===4 && <Termino previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
        </Card>
    )
}

export default Practicas
