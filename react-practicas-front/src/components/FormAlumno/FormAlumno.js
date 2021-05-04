import React from 'react';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function FormAlumno({estudiante, setEstudiante}) {
  const classes = useStyles();
  const methods = useForm();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEstudiante({
      ...estudiante,
      fecha_nac: date,
    });
  };
 

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
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Carrera</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                name= "carrera"
                value={estudiante.carrera}
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
            <TextField  variant="outlined" name= "matricula" label="Matricula" value={estudiante.matricula}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "plan" label="Plan" value={estudiante.plan}  onChange={handleChange} fullWidth  required />
            </Grid> 
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "anho_ingreso" label="Año Ingreso" value={estudiante.anho_ingreso}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Via Ingreso</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                name= "via_ingreso"
                value={estudiante.via_ingreso}
                onChange={handleChange}
                label="Via Ingreso"
              >
                
                <MenuItem value={'Via PSU'}>Via PSU</MenuItem>
                <MenuItem value={'Especial'}>Especial</MenuItem>
                <MenuItem value={'Cambio de Universidad'}>Cambio de Universidad</MenuItem>
               
              </Select>
             </FormControl>
            </Grid> 


            <Grid item xs={12} >
            <TextField  variant="outlined" name= "nombre" label="Nombre Completo" value={estudiante.nombre}  onChange={handleChange} fullWidth  required />
            </Grid>  
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "rut" label="RUT" value={estudiante.rut}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "correo_ins" label="Correo" value={estudiante.correo_ins}  onChange={handleChange} fullWidth  required />
            </Grid>   
            <Grid item xs={12} >
            <TextField  variant="outlined" name= "correo_pers" label="Correo" value={estudiante.correo_ins}  onChange={handleChange} fullWidth  required />
            </Grid>        
            <Grid item xs={12} >
            <FormControl component="fieldset">
            <FormLabel component="legend" color="primary">Sexo</FormLabel>
            <RadioGroup aria-label="gender" name="sexo" value={estudiante.sexo} onChange={handleChange}>
              <FormControlLabel value="mujer" control={<Radio />} label="Mujer" />
              <FormControlLabel value="hombre" control={<Radio />} label="Hombre" />
              <FormControlLabel value="otro" control={<Radio />} label="Otro" />
            </RadioGroup>
          </FormControl>
            </Grid>
            <Grid item xs={12} >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          
        />
               

            </MuiPickersUtilsProvider>
            </Grid> 
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "sit_actual" label="Situacion Actual" value={estudiante.sit_actual}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "sit_actual_anho" label="Situacion Actual Anio" value={estudiante.sit_actual_anho}  onChange={handleChange} fullWidth  required />
            </Grid> 
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "comuna_origen" label="Comuna Origen" value={estudiante.comuna_origen}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "sit_actual_periodo" label="Situacion Actual Periodo" value={estudiante.sit_actual_periodo}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "regular" label="Regular" value={estudiante.regular}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Region</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                name= "region"
                value={estudiante.region}
                onChange={handleChange}
                label="Region"
              >
                
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'6'}>6</MenuItem>
                <MenuItem value={'7'}>7</MenuItem>
                <MenuItem value={'8'}>8</MenuItem>
                <MenuItem value={'9'}>9</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
                <MenuItem value={'11'}>11</MenuItem>
                <MenuItem value={'12'}>12</MenuItem>
               
              </Select>
             </FormControl>
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "nivel" label="Nivel" value={estudiante.nivel}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "porc_avance" label="Porcentaje" value={estudiante.porc_avance}  onChange={handleChange} fullWidth  required />
            </Grid>         
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "ult_punt_prio" label="Ulti Punt Prio" value={estudiante.ult_punt_prio}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "al_dia" label="Al Dia" value={estudiante.al_dia}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "nivel_99_aprobado" label="Nivel 99 Aprobado" value={estudiante.nivel_99_aprobado}  onChange={handleChange} fullWidth  required />
            </Grid>
          </Grid>          
          
          <br />
         
        </form>



    
  );
}