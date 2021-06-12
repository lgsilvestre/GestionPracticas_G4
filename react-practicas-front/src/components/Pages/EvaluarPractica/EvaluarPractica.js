import React from 'react'
import {Grid, Typography, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { motion } from "framer-motion"
import useStyles from './styles';
import evaluacion from '../../routers/assets/evaluacion.svg';
import { Footer } from '../../ui/Footer/Footer';

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

    return (
        <div className={classes.global}>
         
            <div className={classes.encabezado}>
            <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <h1 className={classes.titulo} >EVALUACION ESTUDIANTE</h1></motion.div>
            <motion.div   className={classes.icono} animate={{ scale: 4 }}   transition={{ duration: 0.5 }} > <img  heigth ={20} src={evaluacion} alt='evaluacion'/></motion.div>                
            </div>
            <div  className={classes.empresa}>
            <Typography align="center" variant="h6" gutterBottom> !Hola {empresa} ! </Typography>
            </div>
            <Typography align="center" variant="h6" gutterBottom> Solicitamos tu nota de evaluacion al practicante: {estudiante} </Typography>
            <div  className={classes.nota}>            
            <TextField  variant="outlined" name= "nota" label="Nota" value={nota}  onChange={handleChange}  InputProps={classes.nota} className={classes.inputComponent}  required />
            </div>
            <div  className={classes.buton}>
            <Button  className={classes.boton} color="primary" >Calificar</Button>
            </div>
           
        </div>
    )
}

export default EvaluarPractica
