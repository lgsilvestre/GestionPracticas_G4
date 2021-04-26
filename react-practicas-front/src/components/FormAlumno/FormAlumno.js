import React, {useState} from 'react';
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

export default function FormAlumno({handleClose}) {
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
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Carrera</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
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
            <TextField  variant="outlined" name= "anioIngreso" label="Año Ingreso" value={estudiante.anio_ingreso}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <FormControl variant="outlined" fullWidth required className={classes.formControl}>
              <InputLabel id="select-outlined-label">Via Ingreso</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
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
            <TextField  variant="outlined" name= "correo" label="Correo" value={estudiante.correo}  onChange={handleChange} fullWidth  required />
            </Grid>         
            <Grid item xs={12} >
            <FormControl component="fieldset">
            <FormLabel component="legend" color="primary">Sexo</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={estudiante.sexo} onChange={handleChange}>
              <FormControlLabel value="mujer" control={<Radio />} label="Mujer" />
              <FormControlLabel value="hombre" control={<Radio />} label="Hombre" />
              <FormControlLabel value="otro" control={<Radio />} label="Otro" />
            </RadioGroup>
          </FormControl>
            </Grid>
            <Grid item xs={12} >
            <TextField
              id="fechanac"
              label="Fecha Nacimiento"
              type="date"
              value={estudiante.sexo}
              defaultValue="2000-01-01"
              className={classes.textField}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid> 
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "sit_actual" label="Situacion Actual" value={estudiante.sit_actual}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "sit_actual_anio" label="Situacion Actual Anio" value={estudiante.sit_actual_anio}  onChange={handleChange} fullWidth  required />
            </Grid> 
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "comuna" label="Comuna Origen" value={estudiante.comuna}  onChange={handleChange} fullWidth  required />
            </Grid>
            <Grid item xs={6} >
            <TextField  variant="outlined" name= "porcentaje" label="Porcentaje" value={estudiante.porcentaje}  onChange={handleChange} fullWidth  required />
            </Grid> 
  
          </Grid>
          
          
          <br />
         
        </form>



    
  );
}