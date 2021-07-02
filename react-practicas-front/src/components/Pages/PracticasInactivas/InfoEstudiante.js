import {Button} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IoIosArrowBack } from "react-icons/io";
import WizardAdmin from './WizardAdmin/WizardAdmin';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    botonBack:{
        marginBottom:'10px', 
        backgroundColor:"grey",
        color:"white",
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
        '&:hover': {
        backgroundColor:'#f69b2e',
            color: '#fff'
        }
    }
    
}));
export const InfoEstudiante = ({handleChangeStateBack, etapaProp=1, nroMatricula, nroPractica,idAlumno}) => {
    // console.log("nro recibido en infoestudiante:",nroPractica)
    const classes = useStyles();  
    const [etapa, setEtapa] = useState(etapaProp)
    useEffect(() => {
        changeEtapaLabel()  
    }, [etapa])
    const changeEtapaLabel = () =>{
        switch (etapa) {
            case 0:
                setEtapa("Solicitar")
                break;
            case 1:
                setEtapa("Inscripción")
                break;
            case 2:
                setEtapa("Cursando")
                break;
            case 3:
                setEtapa("Evaluación")
                break;
            default:
                break;
        }
    }
    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
                <h4 style={{marginBottom:'15px', color: '#1b2d4f'}}>
                    Prácticas &gt; Alumno
                </h4>
                <Button className = {classes.botonBack} startIcon={<IoIosArrowBack/>} onClick={handleChangeStateBack}>
                    Volver a tabla 
                </Button>
              
                <WizardAdmin 
                  pageProp={etapa} 
                  classes={classes} 
                  nroMatricula={nroMatricula} 
                  nroPractica={nroPractica}
                  idAlumno={idAlumno}
                />
            </div>
        </div>
        
    )
}
