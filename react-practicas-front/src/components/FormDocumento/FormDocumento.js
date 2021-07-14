import React,{useState} from 'react';
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

  const [nombre, setnombre]= useState("");
  const [tipo, settipo]= useState("");
 
  const [document, setdocument]= useState("");
     
  const [nombreError, setnombreError]= useState("");
  const [tipoError, settipoError]= useState("");
  const [documentError, setdocumentError]= useState("");


  const onSubmit = (e)=>{
    e.preventDefault();
    const isValid = formValidation();
    if(isValid){
      //setcarrera("");
      setnombre("");
      
      setnombreError("");
      
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

  const handleChange = (event) => {
    setCurrency(event.target.value);

  };

  const formValidation = () => {

    const nomVal = nombreValidation();
    
    const docVal = documentValidation();
    
    let isValid = false;
    
    if(nomVal === true && docVal === true){
      console.log("esta en form validation, el nombre es valido")
      
    }
    else {
      console.log("esta en form validation, hay un error")
      isValid= false;
    }
    
    return isValid;
  }


  return (
    
    
        <form onSubmit = {methods.handleSubmit((data) => test({ ...data}))} >
          <Grid container spacing={2}>
           
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "nombre" label="Nombre Documento"  onChange={(e)=>{setnombre(e.target.value)}} onSubmit={onSubmit} value={nombre} fullWidth  required />
              {Object.keys(nombreError).map((key)=>{
                return <div style={{color:"red"}}>{nombreError[key] }</div>  
            })}
            </Grid>  
            <Grid item xs={12} >
              <TextField  variant="outlined" name= "tipo" label="Tipo"   onChange={handleChange} fullWidth  required />
            </Grid>
              {Object.keys(tipoError).map((key)=>{
                return <div style={{color:"red"}}>{tipoError[key] }</div>   
              })}
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
                <Button variant="contained" color="primary" component="span" startIcon={<IoDocumentText />}>
                  Subir Documento
                </Button>
              </label>           
            </Grid>
            
          </Grid>      
          <br />
          <Button className={classes.boton} onClick={onSubmit} type = "submit" color="primary">
                validar
          </Button>   
        </form>



    
  );
}