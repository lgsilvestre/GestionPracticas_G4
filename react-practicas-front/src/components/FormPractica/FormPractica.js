import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IoDocumentOutline } from "react-icons/io5";
import Typography from '@material-ui/core/Typography';



export default function FormPractica({handleClose}) {
  const classes = useStyles();
  const methods = useForm();
  const [practica, setPractica] = useState({}); 


  const handleChange = (e) => {
    setPractica({
      ...practica,
      [e.target.name]: e.target.value,
    });
   
  };


  return (

        <form onSubmit = {methods.handleSubmit((data) => test({ ...data, practica}))} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Carrera</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                name= "carrera"
                value={practica.carrera}
                onChange={handleChange}
                label="Carrera"
              >
                
                <MenuItem value={'Ingenieria Civil en Computacion'}>Ingenieria Civil en Computacion</MenuItem>
                <MenuItem value={'Ingenieria Civil en Obras Civiles'}>Ingenieria Civil en Obras Civiles</MenuItem>
                <MenuItem value={'Ingenieria Civil en Mecanica'}>Ingenieria Civil en Mecanica</MenuItem>
                <MenuItem value={'Ingenieria Civil en Mecatronica'}>Ingenieria Civil en Mecatronica</MenuItem>
                <MenuItem value={'Ingenieria Civil Electrica'}>Ingenieria Civil Electrica</MenuItem>
                <MenuItem value={'Ingenieria Civil Industrial'}>Ingenieria Civil Industrial</MenuItem>
              </Select>
             </FormControl>
              
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "nombre" label="Nombre Practica" value={practica.nombre}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "empresa" label="Empresa" value={practica.empresa}  onChange={handleChange} fullWidth  required />
            </Grid>            
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "descripcion" label="Descripcion" value={practica.plan}  onChange={handleChange} fullWidth   multiline required />
            </Grid>   
            <Typography variant="subtitle1" gutterBottom>
            * Subir documentacion necesaria
           </Typography>
            <Grid item xs={12} >
            <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
             
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" endIcon={<IoDocumentOutline/>}>
              Documento 
            </Button>
          </label>
            </Grid>
           


              
      
            
          </Grid>
          
          
          
          <br />
         
        </form>



    
  );
}   