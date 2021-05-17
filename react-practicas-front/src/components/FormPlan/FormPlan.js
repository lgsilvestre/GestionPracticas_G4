import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function FormPractica({handleClose}) {
  const classes = useStyles();
  const methods = useForm();
  const [plan, setPlan] = useState({}); 


  const handleChange = (e) => {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
   
  };


  return (

        <form onSubmit = {methods.handleSubmit((data) => test({ ...data, plan}))} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Carrera</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                name= "carrera"
                value={plan.carrera}
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
            <TextField  variant="outlined" name= "codigo" label="Codigo" value={plan.nombre}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "fecha" label="Fecha" value={plan.empresa}  onChange={handleChange} fullWidth  required />
            </Grid>             
             
            
          </Grid>
          
          
          
          <br />
         
        </form>



    
  );
}   