import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { Cursando } from './EstadosWizard/Cursando';
import { Termino } from './EstadosWizard/Termino';
import { Card } from 'reactstrap';
import { FormPostulacion } from './EstadosWizard/FormPostulacion';
import { FormInscripcion } from './EstadosWizard/FormInscripcion';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { PracticaInvalida } from './PracticaInvalida';
import { PracticasTab } from '../ui/PracticasTab/PracticasTab';
const Practicas = () => {

    const cookies = new Cookies();
    const [nroPractica, setNroPractica] = useState(0)
    console.log("nroPractica: ",nroPractica)
    const steps = [
        {title: "Solicitar"},
        {title: "Inscripción"},
        {title: "Cursando"},
        {title: "Evaluación"} 
    ]
    
    useEffect(() => {       
      getEstado()
    }, [])

    const [page, setPage] = useState(3)

    const getEstado = () => {
        let id_alumno = cookies.get('id')
        let numeropractica = 1
        axios.post(
          "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEstadoPracticaAlumno",
          {
            id_alumno: id_alumno,
            numero: numeropractica,
          },
        )
          .then(response => {

            console.log(response.data)

            if (response.data=="0"){
                setPage(0)
            } 
            
            if (response.data[0].etapa=="Solicitud"){
                console.log(response.data[0].etapa)
                setPage(0)
            } 

            if (response.data[0].etapa=="Inscripción"){
                console.log(response.data[0].etapa)
                setPage(1)
            }

            if (response.data[0].etapa=="Cursando"){
                console.log(response.data[0].etapa)
                setPage(2)
            }

            if (response.data[0].etapa=="Evaluación"){
                console.log(response.data[0].etapa)
                setPage(3)
            }

          })
          .catch(error => {
            console.log("login error: ", error);
          });
    }
    
    const nextPage = () =>{       
        setPage(page+1)
    }
    const previousPageFuncion = ()=>{
        setPage(page-1)
    }
    return (
      <>
        <PracticasTab 
          nroPractica={nroPractica}
          setNroPractica={setNroPractica}
          />
        {
          nroPractica===0 ?(
            <Card className=" animate__animated animate__fadeIn animate__faster container mt-3 mb-3" >
                <Stepper 
                    steps={steps}
                    size={40}
                    circleFontSize={18}
                    activeStep={ page }
                    activeColor={"#0DC143"}
                    completeColor = {"#77C78F"}
                />
                <hr/>        
                { page===0 && <FormPostulacion handleSubmit={nextPage} /> }
                { page===1 && <FormInscripcion previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
                { page===2 && <Cursando previousPage={previousPageFuncion} handleSubmit={nextPage}/> }
                { page===3 && <Termino previousPage={previousPageFuncion} handleSubmit={nextPage}/> }          
            </Card>
          )
          : (
            <Card className="container mt-3 mb-3" >
              <PracticaInvalida/>
            </Card>
          )
        }
      </>
    )

}

export default Practicas
