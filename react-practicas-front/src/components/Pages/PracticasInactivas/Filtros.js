import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import {AiOutlineSearch} from "react-icons/ai";
import AlertaSimple from '../../ui/Alertas/AlertaSimple';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm';

export const Filtros = ({clasesEstilo, data, setRows}) => {
    const carreras = [
      {
        nombre:'Ingeniería Civil en Obras Civiles',
        value:"icov"
      },
      {
        nombre:'Ingeniería Civil en Computación',
        value:"icc"
      },
      {
        nombre:'Ingeniería Civil en Mecánica',
        value:"icmec"  
      },
      {
        nombre:'Ingeniería Civil en Mecatrónica',
        value:"icm"  
      },
      {
        nombre:'Ingeniería Civil Eléctrica',
        value:"ice"  
      },
      {
        nombre:'Ingeniería Civil Industrial',
        value:"ici"
      }
    ]
    const anios = [
      '2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
      '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021',
    ]
    //variables de estado para cada filtro
    const [estadoFilter, setEstadoFilter] = useState('');
    const handleChangeEstadoFilter = (event) => {
      setEstadoFilter(event.target.value);
      
    };
    const [etapaFilter, setEtapaFilter] = useState('');
    const handleChangeEtapaFilter = (event) => {
      setEtapaFilter(event.target.value);
      handleChangeEstadoEnabled()
    };
    const [estadoEnabled, setEstadoEnabled] = useState(true)
    const handleChangeEstadoEnabled = () =>{
      setEstadoEnabled(!estadoEnabled)
    }
    const [carreraFilter, setCarreraFilter] = useState('');
    const handleChangeCarreraFilter = (event) => {
      setCarreraFilter(event.target.value);
    };
    const [anioFilter, setAnioFilter] = useState('');
    const handleChangeAnioFilter = (event) => {
      setAnioFilter(event.target.value);
    };
    //variables para el campo de busqueda
    const [filtros, setFiltros] = useState({})
    const handleSendFilters = () =>{
      setFiltros(
      {
        etapaFilter,
        estadoFilter,
        carreraFilter,
        anioFilter
      })
      handleClickOpen()
      petitionGetPracticaAlumnoFiltrada()
      //Comunicacion con la base de datos
      //axiosPostFilters(filtros)
    } 
    
    const axiosPostFilters = (filtros) => {
      const url = " "
      axios.post( url , filtros )
      .then(response => {
        console.log("respuesta: ", response.data);
        setRows(response.data)
      })
      .catch(error => {
          console.log("error conexion: ", error);
      });
    }
    const [formValues, handleInputChange] = useForm({
      searchText:""
    })
    const {searchText} = formValues;
    const handleSearch = (e) =>{
      e.preventDefault()
      console.log(searchText)
      if(searchText.length>0){
        const filteredRrows = data.filter(row=>row.matricula===searchText)
        setRows(filteredRrows)
      }
      else{
        setRows(data)
      }  
    }  
    //estados para la alerta 
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const petitionGetPracticaAlumnoFiltrada = async () =>{
      let jsonfiltros = JSON.stringify(filtros)
      console.log(jsonfiltros)
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/servePracticaAlumnoFiltrada",{
        filtros: jsonfiltros,
      },
    )
      .then(response=>{
        console.log(response.data)
        // // console.log(response.data)
        // const resultado = response.data;
        // // console.log("antes:",rows)
        // const lista = []
        // for(var i=0; i<resultado.length; i++){
        //   const fila = createData(resultado[i].nombre , resultado[i].matricula , resultado[i].nbe_carrera,resultado[i].anho_ingreso,resultado[i].etapa,
        //     resultado[i].estado, resultado[i].fecha_termino,"button")
        //   // console.log(fila)
        //   lista.push(fila)
        // }  
        // // console.log(lista)
        // setRows(lista)
        // setOriginalData(lista)
        
      })
    }

    return (
        <div>
            {
              open && AlertaSimple("filtros", JSON.stringify(filtros), handleClose)
            }
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
                  <MenuItem value={'solicitud'}>Solicitud</MenuItem>
                  <MenuItem value={'inscripcion'}>Inscripción</MenuItem>
                  <MenuItem value={'cursando'}>Cursando</MenuItem>
                  <MenuItem value={'evaluacion'}>Evaluación</MenuItem>
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
                  <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                  <MenuItem value={'aprobado'}>Aprobado</MenuItem>
                  <MenuItem value={'rechazado'}>Rechazado</MenuItem>              
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
              <Button  className={clasesEstilo.botonFiltro} variant="contained" onClick={handleSendFilters}>
                Filtrar
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
                <TextField name="searchText" type="text" id="search" label="Buscar Matrícula" onChange={handleInputChange}  />
              </form>       
            </Grid>                 
          </Grid>
        </div>
    )
}
