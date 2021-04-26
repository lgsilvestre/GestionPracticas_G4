import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

export default function FormAdministrador({handleClose}) {
  const classes = useStyles();

  const methods = useForm();
  const [estudiante, setEstudiante] = useState({});  

 

  const handleChange = (e) => {
    setEstudiante({
      ...estudiante,
      [e.target.name]: e.target.value,
    });
   
  };

  return (



        <form onSubmit = {methods.handleSubmit((data) => test({ ...data, estudiante}))} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "nombre" label="Nombre" value={estudiante.nombre}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "apellidos" label="Apellidos" value={estudiante.apellidos}  onChange={handleChange} fullWidth  required />
            </Grid>  
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "rut" label="RUT" value={estudiante.rut}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "carrera" label="Carrera" value={estudiante.carrera}  onChange={handleChange} fullWidth  required />
            </Grid>         
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "correo" label="Correo" value={estudiante.correo}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "contraseña " label="Contraseña " value={estudiante.contrasena}  onChange={handleChange} fullWidth  required />
            </Grid> 
          </Grid>

          <Button className={classes.boton} type="button">
            Registrar
          </Button>
          
          
          <br />
         
        </form>



    
  );
}