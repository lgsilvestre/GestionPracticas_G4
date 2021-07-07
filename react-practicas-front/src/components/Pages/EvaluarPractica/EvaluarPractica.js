import React from 'react'
import { Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { motion } from "framer-motion"
import useStyles from './styles';
import evaluacion from '../../routers/assets/evaluacion.svg';
import Boton from './Boton/Boton'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import sha256 from 'crypto-js/sha256';

const EvaluarPractica = (estudiante, empresa) => {
    var CryptoJS = require("crypto-js");  

    const classes = useStyles();
    const [nota, setNota] = React.useState("");
    let variablesRuta = window.location.pathname;
     console.log( variablesRuta);
   /*
    var aux = variablesRuta.substring(9);
    var bytes  = CryptoJS.AES.decrypt(aux, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decripted: ', originalText);
    */
    const variables = variablesRuta.split("/");
    estudiante = variables[2];
    empresa =variables[3];
    const idPractica = variables[4];
  
    const handleChange = (e) => {
      console.log(e.target.value);
      setNota(e.target.value);
       
      };
      function peticionPost () {
        console.log("ESTA ES LA PETIO POST ------------------------------------------------------");
        let calificacion = nota;
        let id = idPractica;
     
        axios.post(
          "http://localhost/GestionPracticas_G4/ci-practicas-back/public/setNotaSupervisor",
          {
            'idPractica': id,
            'nota': calificacion,
          },
        )
          .then(response => {
           
            console.log("respuesta ------------------------------------------------: ", response.data);
  
          })
          .catch(error => {
            console.log("login error: ", error);
          });
      }
      function handleValidation() {
        let calificacion = nota;
        console.log("Entro a la validacion reql -----------------------------------------------");
        peticionPost();
        /*
        let calificacionValida = false; 
      
        if (calificacion !== "") {
          let regex = new RegExp("/^\d*\.?\d*$/");
          if (regex.test(calificacion)) {
            calificacionValida = true;
          }
        }    
     
        console.log(calificacionValida);
        if (calificacionValida === true){
          peticionPost();
        } else {
          console.log("Error validación");
        }
        */
      }

    return (
        <div className={classes.global}>
         
            <div className={classes.encabezado}>
            <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <h1 className={classes.titulo} >EVALUACION ESTUDIANTE</h1></motion.div>
            <motion.div   className={classes.icono} animate={{ scale: 3.5 }}   transition={{ duration: 0.5 }} > <img  heigth ={20} src={evaluacion} alt='evaluacion'/></motion.div>                
            </div>
            <div  className={classes.empresa}>
            <Typography align="center" variant="h5" gutterBottom> !Hola {empresa} ! ayudanos con nuestra evaluacion de practicas profesionales de la Universidad de Talca</Typography>
            </div>
            <Typography align="center" variant="h6" gutterBottom> Solicitamos tu nota de evaluacion al practicante: {estudiante} </Typography>
            <Typography align="center" variant="body2" gutterBottom>*La calificacion debe ser con un decimal  <br/>
            Ejemplo: 6.4 </Typography>
            <div  className={classes.nota}>            
            <TextField  variant="outlined" name= "nota" label="Nota"  value={nota} onChange={(e)=>handleChange(e)}    required />
            </div>
            <div  className={classes.buton}>
            <Button onClick={handleValidation}></Button>
            </div>
           
        </div>
    )
}

export default EvaluarPractica
