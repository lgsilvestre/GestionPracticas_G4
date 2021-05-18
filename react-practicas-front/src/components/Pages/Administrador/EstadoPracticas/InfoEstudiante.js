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
        background:'#f69b2e', 
        color:"white"
    }
    
}));
export const InfoEstudiante = ({handleChangeStateBack, etapaProp=1}) => {
    const classes = useStyles();  
    
    const [etapaLabel, setEtapaLabel] = useState("")
    const [etapa, setEtapa] = useState(etapaProp)
    useEffect(() => {
        changeEtapaLabel()  
    }, [etapa])
    const changeEtapaLabel = () =>{
        switch (etapa) {
            case 0:
                setEtapaLabel("Solicitar")
                break;
            case 1:
                setEtapaLabel("Inscripción")
                break;
            case 2:
                setEtapaLabel("Cursando")
                break;
            case 3:
                setEtapaLabel("Evaluación")
                break;
            default:
                break;
        }
    }
    return (
        <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
            <Button className = {classes.botonBack} startIcon={<IoIosArrowBack/>} onClick={handleChangeStateBack}>
                Atras
            </Button>
            <h4 style={{marginBottom:'10px'}}>
                Admin &gt; Estado practicas &gt; {etapaLabel}
            </h4>
            <WizardAdmin pageProp={etapa} classes={classes}/>
        </div>
    )
}
