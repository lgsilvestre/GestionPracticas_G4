import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import {AiOutlineSearch} from "react-icons/ai";
import AlertaSimple from '../../../ui/Alertas/AlertaSimple';
import axios from 'axios';
import { useForm } from '../../../../hooks/useForm';

export const Filtros = ({clasesEstilo, data, setRows}) => {
    /*
    data: Las filas creadas anteriormente, contiene todos los datos
    setRows: Funcion para la informacion de la tabla con un Json.
    */
    const carreras = [
      {
        nombre:'Ing. Obras Civiles',
        value:"INGENIERIA CIVIL EN OBRAS CIVILES"
      },
      {
        nombre:'Ing. Computación',
        value:"INGENIERIA CIVIL EN COMPUTACIÓN"
      },
      {
        nombre:'Ing. Mecánica',
        value:"INGENIERIA CIVIL EN MECÁNICA"  
      },
      {
        nombre:'Ing. Mecatrónica',
        value:"INGENIERIA CIVIL EN MECATRONICA"  
      },
      {
        nombre:'Ing. Eléctrica',
        value:"INGENIERIA CIVIL ELECTRICA"  
      },
      {
        nombre:'Ing. Industrial',
        value:"INGENIERIA CIVIL INDUSTRIAL"
      }
    ]
    const anios = [
      '2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
      '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021',
    ]
    const estadosSolicitud=['Pendiente', 'Aprobada', 'Rechazada']
    const estadosInscripcion=['Por inscribir', 'Aprobada','Rechazada']
    const estadosCursando=['Cursando']
    const estadosEvaluacion=['Pendiente','Evaluada','Rechazada']
    
    //variables de estado para cada filtro
    const [estadoFilter, setEstadoFilter] = useState('');
    const handleChangeEstadoFilter = (event) => {
      setEstadoFilter(event.target.value);
      
    };
    const [etapaFilter, setEtapaFilter] = useState('');
    const [estadosEtapa, setestadosEtapa] = useState([])
    const handleChangeEtapaFilter = (event) => {
      setEtapaFilter(event.target.value);
      handleChangeEstadoEnabled(event.target.value)
    };
    const [estadoEnabled, setEstadoEnabled] = useState(true)
    const handleChangeEstadoEnabled = (estado) =>{
      if(estado==="Solicitud"){
        setestadosEtapa(estadosSolicitud)
      }
      if(estado==="Inscripción"){
        setestadosEtapa(estadosInscripcion)
      }
      if(estado==="Cursando"){
        setestadosEtapa(estadosCursando)
      }
      if(estado==="Evaluación"){
        setestadosEtapa(estadosEvaluacion)
      }
      setEstadoEnabled(false)
    }
    const [carreraFilter, setCarreraFilter] = useState('');
    const handleChangeCarreraFilter = (event) => {
      setCarreraFilter(event.target.value);
    };
    const [anioFilter, setAnioFilter] = useState('');
    const handleChangeAnioFilter = (event) => {
      setAnioFilter(event.target.value);
    };
    
    const [formValues, handleInputChange,reset] = useForm({
      searchText:""
    })
    const {searchText} = formValues;
    const handleSearch = (e) =>{
      e.preventDefault()
      console.log(searchText)
      if(searchText.length>0){
        const filteredRows = data.filter(row=>row.matricula===searchText)
        setRows(filteredRows)
      }
      else{
        setRows(data)
      }  
    }  
    
    /**
     * Funcion que filtra de acuerdo a un arreglo de filtros elegidos por el usuario
     */
    const filtrarFilas = () => {
      var filtrosElegidos = [] //arreglo de Filtros elegidos
      var filteredRows = data //datos a filtrar
      //Agregamos los filtos elegidos a al arreglo de filtrosElegidos
      if(etapaFilter.length>0){
        filtrosElegidos.push({label:"etapa",filtro:etapaFilter})
      }
      if(estadoFilter.length>0){
        filtrosElegidos.push({label:"estado",filtro:estadoFilter})
      }
      if(anioFilter.length>0){
        filtrosElegidos.push({label:"anio",filtro:anioFilter})
      }
      if(carreraFilter.length>0){
        filtrosElegidos.push({label:"carrera",filtro:carreraFilter})
      }
      //Recorremos la lista de filtros elegidos para seleccionar los datos que nos importan y guardarlos
      console.log("iniciando seleccion con: ",filtrosElegidos)
      for (let i = 0; i < filtrosElegidos.length; i++) {
        const elemento = filtrosElegidos[i];
        if(elemento.label==="etapa"){
          filteredRows=filteredRows.filter(row=>row.etapa===elemento.filtro)
        }
        if(elemento.label==="estado"){
          filteredRows=filteredRows.filter(row=>row.estado===elemento.filtro)
        }
        if(elemento.label==="anio"){
          filteredRows=filteredRows.filter(row=>row.anio===elemento.filtro)
        }
        if(elemento.label==="carrera"){
          filteredRows=filteredRows.filter(row=>row.carrera===elemento.filtro)
        }
        
      }
      setRows(filteredRows)
      // console.log("Elementos filtrados:", filteredRows)
    }
    const limpiarFiltros = () => {
      //Seteamos todos los filtros en blanco
      setEtapaFilter('')
      setEstadoFilter('')
      setCarreraFilter('')
      setAnioFilter('')
      reset() //Limpiamos el campo de busqueda de matricula
      //reiniciamos los datos a los originales
      setRows(data)
    }
    
    return (
        <div>          
            <Grid container spacing={1} alignItems="flex-end">
            {/* Filtro Busqueda por Etapa */}
            <Grid item>
              <FormControl className={clasesEstilo.formControl}>
                <InputLabel id="etapaSelectLabel">Etapa</InputLabel>
                <Select
                  labelId="etapaSelectLabel"
                  id="etapaSelect"
                  value={etapaFilter}
                  onChange={handleChangeEtapaFilter}
                >
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem>             
                  <MenuItem value={'Solicitud'}>Solicitud</MenuItem>
                  <MenuItem value={'Inscripción'}>Inscripción</MenuItem>
                  <MenuItem value={'Cursando'}>Cursando</MenuItem>
                  <MenuItem value={'Evaluación'}>Evaluación</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Filtro Busqueda por Estado */}
            <Grid item>
              <FormControl className={clasesEstilo.formControl} disabled = {estadoEnabled}>
                <InputLabel id="estadoSelectLabel">Estado</InputLabel>
                <Select
                  labelId="estadoSelectLabel"
                  id="estadoSelect"
                  value={estadoFilter}
                  onChange={handleChangeEstadoFilter}
                >     
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem> 
                  {
                    estadosEtapa.map((estado, index)=> (
                        <MenuItem key ={index} value={estado}>{estado}</MenuItem>
                      ))
                  }       
                  {/* <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                  <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
                  <MenuItem value={'Rechazado'}>Rechazado</MenuItem>               */}
                </Select>
              </FormControl>
            </Grid>
            {/* Filtro de Busqueda por Carrera */}
            <Grid item>
              <FormControl className={clasesEstilo.formControl} >
                <InputLabel id="carreraSelectLabel">Carrera</InputLabel>
                <Select
                  labelId="carreraSelectLabel"
                  id="carreraSelect"
                  value={carreraFilter}
                  onChange={handleChangeCarreraFilter}
                >     
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem>   
                  {
                    carreras.map((carrera, index)=> (
                      <MenuItem key ={index} value={carrera.value}>{carrera.nombre}</MenuItem>
                    ))
                  }                
                </Select>
              </FormControl>
            </Grid>
            {/* Filtro de Busqueda por Año */}
            <Grid item>
              <FormControl className={clasesEstilo.formControl}>
                <InputLabel id="anioSelectLabel">Año</InputLabel>
                <Select
                  labelId="anioSelectLabel"
                  id="anioSelect"
                  value={anioFilter}
                  onChange={handleChangeAnioFilter}
                >
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem>
                  {
                    anios.map((anio, index)=> (
                      <MenuItem key={index} value={anio}>{anio}</MenuItem>
                    ))
                  }     
                </Select>
              </FormControl>
            </Grid>
            {/* Boton para Enviar informacion de filtro */}
            <Grid item>
              <Button  className={clasesEstilo.botonFiltro} variant="contained" onClick={filtrarFilas}>
                Filtrar
              </Button>
            </Grid>
            <Grid item>
              <Button  className={clasesEstilo.botonFiltro} variant="contained" onClick={limpiarFiltros}>
                Limpiar
              </Button>
            </Grid>
            {/* Separador */}
            <Grid item sm/>           
            {/* Icono Lupa */}
            <Grid item>
              <AiOutlineSearch className={clasesEstilo.logosearch} />
            </Grid>
             {/*Campo de busqueda  */}
            <Grid item>
              <form onSubmit={handleSearch} noValidate autoComplete="off">
                <TextField value={searchText} name="searchText" type="text" id="search" label="Buscar Matrícula" onChange={handleInputChange}  />
              </form>       
            </Grid>                 
          </Grid>
        </div>
    )
}
