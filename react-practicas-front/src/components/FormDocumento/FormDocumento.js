import React from 'react';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import { IoDocumentText } from "react-icons/io5";
import 'date-fns';

export default function FormAlumno() {
  const currencies = [{ value: '0',label: 'No',}, {value: '1',label: 'Si', }, ];
  const classes = useStyles();
  const methods = useForm();
  const [currency, setCurrency] = React.useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    
    
        <form onSubmit = {methods.handleSubmit((data) => test({ ...data}))} >
          <Grid container spacing={2}>
           
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "nombre" label="Nombre Documento"  onChange={handleChange} fullWidth  required />
            </Grid>  
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "tipo" label="Tipo"   onChange={handleChange} fullWidth  required />
            </Grid>
      
            <Grid item xs={12} >
                  <TextField
                id="outlined-select-currency"
                select
                label="Requerido"
                value={currency}
                onChange={handleChange}
                helperText="Seleccione si es requerido en el proceso"
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" startIcon={<IoDocumentText />}>
                  Subir Documento
                </Button>
              </label>           
            </Grid>
            
          </Grid>      
          <br />   
        </form>



    
  );
}