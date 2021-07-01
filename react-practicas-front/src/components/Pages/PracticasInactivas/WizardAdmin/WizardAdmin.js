import React, { useState } from 'react'
import Stepper from 'react-stepper-horizontal'
import { Card } from 'reactstrap';
import { CursandoAdmin } from './Estados/CursandoAdmin';
import { InscripcionAdmin } from './Estados/InscripcionAdmin';
import { SolicitarAdmin } from './Estados/SolicitarAdmin';
import { EvaluacionAdmin } from './Estados/EvaluacionAdmin';


const WizardAdmin = ({pageProp=0, nroMatricula, nroPractica, idAlumno}) => {
    
    const steps = [
        {title: "Solicitar"},
        {title: "Inscripción"},
        {title: "Cursando"},
        {title: "Evaluación"} 
    ]
    
    const [page, setPage] = useState(pageProp)
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
            
            { page===0 && <SolicitarAdmin 
              previousPage={previousPageFuncion} 
              nextPage = {nextPage}
              handleSubmit={nextPage} 
              nroMatricula={nroMatricula}  
              nroPractica={nroPractica}  
              idAlumno={idAlumno}
              /> }
            { page===1 && <InscripcionAdmin 
              nextPage = {nextPage}
              previousPage={previousPageFuncion} 
              handleSubmit={nextPage} 
              nroMatricula={nroMatricula} 
              nroPractica={nroPractica} 
              idAlumno={idAlumno}
              /> }
            { page===2 && <CursandoAdmin 
              previousPage={previousPageFuncion} 
              nextPage = {nextPage}
              handleSubmit={nextPage} 
              nroMatricula={nroMatricula}
              nroPractica={nroPractica} 
              idAlumno={idAlumno}
              /> }
            { page===3 && <EvaluacionAdmin 
              previousPage={previousPageFuncion} 
              handleSubmit={nextPage} 
              nroMatricula={nroMatricula}
              nroPractica={nroPractica} 
              idAlumno={idAlumno}
              /> }
            
            
        </Card>
    )
}

export default WizardAdmin