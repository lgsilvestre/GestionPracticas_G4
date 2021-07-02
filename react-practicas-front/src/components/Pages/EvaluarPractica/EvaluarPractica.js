import React from 'react'
import { Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { motion } from "framer-motion"
import useStyles from './styles';
import evaluacion from '../../routers/assets/evaluacion.svg';
import Boton from './Boton/Boton'
import axios from 'axios';

const EvaluarPractica = (estudiante, empresa) => {
    const classes = useStyles();
    const [nota, setNota] = React.useState();
    estudiante ='Juan Perez';
    empresa = 'Frutiloops';

    const handleChange = (e) => {
        setNota({
          ...nota,
          [e.target.name]: e.target.value,
        });
       
      };
      function peticionPost () {

        let calificacion = nota;
      
    
        axios.post(
          "",
          {
            nota: calificacion,
         
          },
        )
          .then(response => {
           
            console.log("respuesta: ", response.data);
  
          })
          .catch(error => {
            console.log("login error: ", error);
          });
      }
      function handleValidation() {
        let calificacion = nota;
      
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
            <TextField  variant="outlined" name= "nota" label="Nota"  value={nota}  onChange={handleChange}    required />
            </div>
            <div  className={classes.buton}>
            <Boton onClick={handleValidation}></Boton>
            </div>
           
        </div>
    )
}

export default EvaluarPractica
