import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'
import { Cursando } from './EstadosWizard/Cursando'
import { Termino } from './EstadosWizard/Termino'
import { Card } from 'reactstrap';
import { FormPostulacion } from './EstadosWizard/FormPostulacion'
import { FormInscripcion } from './EstadosWizard/FormInscripcion'
import axios from 'axios'

const Practicas = () => {

    const steps = [
        {title: "Solicitar"},
        {title: "Inscripción"},
        {title: "Cursando"},
        {title: "Evaluación"} 
    ]
    
    const [page, setPage] = useState(1)
    
    const nextPage = (e) =>{       
        setPage(page+1)
    }
    const previousPageFuncion = ()=>{
        setPage(page-1)
    }
    return (
        <Card className="container mt-3 mb-3" >
            <Stepper 
                steps={steps}
                size={40}
                circleFontSize={18}
                activeStep={ page }
                activeColor={"#f69b2e"}
                completeColor = {"#f69b2e"}
            />
            <hr/>
            
            { page===0 && <FormPostulacion className="animate__animated animate__fadeIn animate__faster" handleSubmit={nextPage} /> }
            { page===1 && <FormInscripcion previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            { page===2 && <Cursando previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            { page===3 && <Termino previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
            
            
        </Card>
    )
}

export default Practicas
