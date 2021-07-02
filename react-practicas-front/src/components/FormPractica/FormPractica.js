import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
//import { useForm } from 'react-hook-form';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IoDocumentOutline } from "react-icons/io5";
import Typography from '@material-ui/core/Typography';
import { Alert } from 'reactstrap';




function FormPractica({handleClose}) {

  const classes = useStyles();
  const [carrera, setcarrera]= useState("");
  const [nombre, setnombre]= useState("");
  const [empresa, setempresa]= useState("");
  const [plan, setplan]= useState("");
  const [document, setdocument]= useState("");
  const [carreraError, setcarreraError]= useState("");    
  const [nombreError, setnombreError]= useState("");
  const [empresaError, setempresaError]= useState("");
  const [planError, setplanError]= useState("");
  const [documentError, setdocumentError]= useState("");


  const onSubmit = (e)=>{
    e.preventDefault();
    const isValid = formValidation();
    if(isValid){
      setcarrera("");
      setnombre("");
      setempresa("");
      setplan("");
      setcarreraError("");
      setnombreError("");
      setempresaError("");
      setplanError("");
      setdocumentError("");
      console.log("se ha validado, puede ser posteado")
    }
    else{
      console.log("no es valido")
    }
  }

  function nombreValidation(){
    const nombreErrorVal=[];
    let isValid = true;

    if(nombre.length === '0' ){
      nombreErrorVal.nombreRequiered ="Debes ingresar el nombre de tu practica.";
      isValid = false;
      setnombreError(nombreErrorVal);
      return isValid;
    }
    else {
      if (nombre.length < '8'){
        nombreErrorVal.nombreCorto ="El nombre de la practica es muy corto, min 8 caracteres.";
        isValid = false; 
        console.log("empresa < 8")
        setnombreError(nombreErrorVal);
        return isValid;
      }
      else if (nombre.length > '20'){
        nombreErrorVal.nombreLargo ="nombre muy largo";
        isValid = false;
        setnombreError(nombreErrorVal);
        return isValid;
      }
      else{
        console.log("el largo esta bien")
        nombreErrorVal.nombreCorrecto = "el nombre cumple los requisitos"
        setnombreError(nombreErrorVal);
        return isValid;
      }      
    }
  }

  function carreraValidation(){
    const carreraErrorVal=[];
    let isValid = true;

    if(carrera === '' ){
      console.log(" lenght es igual a 0 ")
      carreraErrorVal.nombreRequiered ="Debes ingresar la carrera";
      isValid = false;
      console.log("debes ingreasr tu practica")
      setcarreraError(carreraErrorVal);
      return isValid;
    }
    else{
        console.log("seleccionaste una carrera")
        carreraErrorVal.nombreCorrecto = "";
        setcarreraError(carreraErrorVal);
        return isValid;
    }      
  }
  function empresaValidation(){
    const empresaErrorVal=[];
    let isValid = true;

    if(empresa.length === '0' ){
      console.log(" lenght es igual a 0 ")
      empresaErrorVal.nombreRequiered ="Debes ingresar el nombre de la empresa.";
      isValid = false;
      setempresaError(empresaErrorVal);
      return isValid;
    }
    else {
      if (empresa.length < '4'){
        empresaErrorVal.nombreCorto ="El nombre de la empresa es muy corto, min 4 caracteres.";
        isValid = false; 
        setempresaError(empresaErrorVal);
        return isValid;
      }
      else if (empresa.length > '20'){
        empresaErrorVal.nombreLargo ="El nombre de la empresa es muy largo";
        isValid = false;
        setempresaError(empresaErrorVal);
        return isValid;
      }
      else{
        console.log("el largo esta bien")
        empresaErrorVal.correcto = "Cumple los requisitos"
        setempresaError(empresaErrorVal);
        return isValid;
      }      
    }
  }

  function planValidation(){
    const planErrorVal=[];
    let isValid = true;

    if(plan.length === '0' ){
      console.log(" lenght es igual a 0 ")
      planErrorVal.nombreRequiered ="Debes ingresar la descripcion de la empresa.";
      isValid = false;
      setplanError(planErrorVal);
      return isValid;
    }
    else {
      if (plan.length < '8'){
        planErrorVal.nombreCorto ="La descripcion es muy corta, min 8 caracteres.";
        isValid = false; 
        setplanError(planErrorVal);
        return isValid;
      }
      else if (plan.length > '20'){
        planErrorVal.nombreLargo ="descrpcion muy larga";
        isValid = false;
        setplanError(planErrorVal);
        return isValid;
      }
      else{
        console.log("")
        planErrorVal.correcto = "Cumple los requisitos"
        setplanError(planErrorVal);
        return isValid;
      }      
    }
  }

  const documentValidation = (e) => {
    const documentErrorVal=[];
    let isValid = true;
    console.log(document)

    if (document.length !== '0' ){

        documentErrorVal.noValido = ""
        setdocumentError(documentErrorVal);
        isValid = true;
        return isValid;

    }
    else {
        
        documentErrorVal.noValido = "Archivo invalido, seleccione un archivo formato PDF"
        setdocumentError(documentErrorVal);
        isValid = false;
        return isValid;
    }
    
  }
  //funcion para obteber el formato de un archivo 

  const formValidation = () => {

    const carrVal = carreraValidation();
    const nomVal = nombreValidation();
    const empVal = empresaValidation();
    const planVal = planValidation();
    const docVal = documentValidation();
    
    let isValid = true;
    
    if(nomVal === true && carrVal === true && empVal === true && planVal === true && docVal === true){
      console.log("esta en form validation, el nombre es valido")
    }
    else {
      console.log("esta en form validation, hay un error")
      isValid= false;
    }
    
    return isValid;
  }

  return (
    
    <form onSubmit={onSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12} >
        <FormControl variant="outlined" fullWidth required className={classes.formControl}>
          <InputLabel id="select-outlined-label">Carrera</InputLabel>
          <Select
            required
            labelId="select-outlined-label"
            id="select-outlined"
            name= "carrera"
            value={carrera}
            onChange={(e)=>{setcarrera(e.target.value)}}
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
        {Object.keys(carreraError).map((key)=>{
              return <div style={{color:"red"}}>{carreraError[key] }</div>  
            })}
        </Grid>
        <Grid item xs={6} >
          <TextField variant="outlined" name= "nombre" label="Nombre Practica" value={nombre} onChange ={(e)=>{setnombre(e.target.value)}} fullWidth  />
          {Object.keys(nombreError).map((key)=>{
              return <div style={{color:"red"}}>{nombreError[key] }</div>  
            })}
          
        </Grid>
        <Grid item xs={6} >
        <TextField  variant="outlined" name= "empresa" label="Empresa" value={empresa} onChange ={(e)=>{setempresa(e.target.value)}}   fullWidth   />
        {Object.keys(empresaError).map((key)=>{
            return <div style={{color:"red"}}>{empresaError[key] }</div>   
          })}
        </Grid>            
        <Grid item xs={12} >
        <TextField variant="outlined" name= "descripcion" label="Descripcion" value={plan} onChange ={(e)=>{setplan(e.target.value)}}   fullWidth   multiline />
        {Object.keys(planError).map((key)=>{
            return <div style={{color:"red"}}>{planError[key] }</div>   
          })}
        </Grid>   
        <Typography variant="subtitle1" gutterBottom>
        * Subir documentacion necesaria
       </Typography>
        <Grid item xs={12} >
        <input
          className={classes.input}
          required = "true"
          id="contained-button-file"
          multiple
          accept=".pdf"
          type="file"
          value={document}
          onChange={(e)=>{setdocument(e.target.value)}}
        />
        {Object.keys(documentError).map((key)=>{
              return <div style={{color:"red"}}>{documentError[key] }</div>   
            })}
         
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" endIcon={<IoDocumentOutline/>}>
          Documento 
        </Button>
      </label>
        </Grid>

      </Grid>

      <br />
      
      <Button className={classes.boton} onClick={onSubmit} type = "submit" color="primary">
                Agregar
      </Button>
    </form>

  );
}
export default FormPractica;