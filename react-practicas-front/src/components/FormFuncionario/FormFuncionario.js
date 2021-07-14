import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';

export default function FormFuncionario({administrador, setAdministrador,generarPassUser, showPassword,}) {
  const classes = useStyles();
  const methods = useForm();

  const [nombreError, setnombreError]= useState("");  

  const handleChange = (e) => {
    setAdministrador({
      ...administrador,
      [e.target.name]: e.target.value,
    });
   
  };

  function nombreValidation(){
    let nombre = administrador.nombre;
    const nombreErrorVal =[]; 
    let nuevoUserValidado = true;

    if (nombre !== "") {
      let regex = new RegExp("^[a-zA-Z]+$");
      if (regex.test(nombre)) {
        nuevoUserValidado = true
        nombreErrorVal.noValido = ""
        setnombreError(nombreErrorVal);
        return nuevoUserValidado;
      }
    }
    else if (nombre.length === '0'){
      nombreErrorVal.noValido = "No ha ingresado el nombre"
      setnombreError(nombreErrorVal);
      nuevoUserValidado = false;
      return nuevoUserValidado;
    }
  }



  return (
        <form onSubmit = {methods.handleSubmit((data) => test({ ...data, administrador}))} >
          <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField variant="outlined" name="nombre" id="Nombre" value={administrador.nombre} label="Nombre" onChange={nombreValidation} fullWidth  required/>
                {Object.keys(nombreError).map((key)=>{
                    return <div style={{color:"red"}}>{nombreError[key] }</div>  
                    })}
              </Grid>
              <Grid item xs={12} >
                <TextField variant="outlined" name="apellido" id="apellido" value={administrador.apellido} label="Apellido" onChange={handleChange} fullWidth  required/>
              </Grid>              
              <Grid item xs={12} >
                <TextField variant="outlined" name="email" id="email" value={administrador.email}label="Mail" onChange={handleChange} fullWidth  required/>
              </Grid>
              <Grid item xs={12} >
              <FormControl fullWidth required className={classes.formControl} variant="outlined" >
              <InputLabel id="demo-simple-select-outlined-label">Carrera</InputLabel>
              <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                  onChange={handleChange} label="Carrera">
                  {administrador.carreras.map((carrera) => (
                    <MenuItem>{carrera}</MenuItem>  ))}                             
                </Select>
              </FormControl>
              </Grid>  
              <Grid item xs={12} >
              <TextField variant="outlined" name="tipo" id="tipo" value={administrador.tipo} label="Tipo" onChange={handleChange} fullWidth  required />
              </Grid>
              <Grid item xs={12} >
                <TextField  variant="outlined" name= "correo_ins" label="Correo" value={administrador.correo_ins}  onChange={handleChange} fullWidth  required />
              </Grid>   
        
              <Grid item xs={12} >
              <FormControl className={classes.inputMaterial} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Contraseña"
                        value={administrador.contrasena}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="change"
                              edge="end"
                              onClick={generarPassUser}
                            >
                            <CachedIcon/>
                            </IconButton>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                </FormControl>
              </Grid>         
          
      
          </Grid>          
          
          <br />
         
        </form>



    
  );
}