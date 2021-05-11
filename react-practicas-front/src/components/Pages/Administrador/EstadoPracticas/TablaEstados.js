import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@material-ui/core';
import {AiFillEdit, AiOutlineSearch} from "react-icons/ai"
import { InfoEstudiante } from './InfoEstudiante';
import AlertaSimple from '../../../ui/Alertas/AlertaSimple';
import axios from 'axios';

export const TablaEstados = ({history}) =>  {
  
  const columns = [
    { id: 'nombre', label: 'Estudiante', minWidth: "25%" },
    { id: 'matricula', label: 'Nro Matricula', minWidth: "25%" },
    { id: 'carrera', label: 'Carrera', minWidth: "25%" },
    {
      id: 'anio',
      label: 'Año',
      minWidth: "25%",
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'estado',
      label: 'Estado',
      minWidth: "25%",
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'fechaEnd',
      label: 'Fecha de Termino',
      minWidth: "25%",
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'Accion',
      minWidth: "25%",
      align: 'right',
    },
  ];
  
  function createData(nombre, matricula, carrera, anio, estado, fechaEnd, action) {
    return { nombre, matricula, carrera, anio, estado, fechaEnd,action };
  }
  const [rows, setRows] = useState(
    [
      // ("Nombre", carrera, año, estado, fecha termino)
      createData('Diego Perez', '2016407543', 'Ingenieria civil en computación', "2021", "Pendiente", "21/07/21","button"),
      createData('Camila Lopez','2016407543', 'Ingenieria civil industrial', "2021", "Pendiente", "31/04/21","button"),
      createData('Fernando Fuenzalida','2016407543', 'Ingenieria civil mecatronica', "2021", "Pendiente", "31/04/21","button"),
      createData('Rodrigo Abarca','2016407543', 'Ingenieria civil en computacion', "2021", "Pendiente", "08/05/21","button"),
      createData('Pia Gomez','2016407543', 'Ingenieria civil en Obras Civiles', "2021", "Pendiente", "24/06/21","button"),
      createData('Eliot Anderson','2016407543', 'Ingenieria civil en computacion', "2021", "Pendiente", "16/04/21","button"),
      createData('Pedro Fuentes','2016407543', 'Ingenieria civil industrial', "2021", "Pendiente", "17/04/21","button"),
      createData('Simon Lopez','2016407543', 'Ingenieria civil mecatronica', "2021", "Pendiente", "25/07/21","button"),
      createData('Marcelo Muñoz','2016407543', 'Ingenieria civil en computacion', "2021", "Pendiente", "14/09/21","button"),
      createData('Humberto Suazo','2016407543', 'Ingenieria civil de Minas ', "2021", "Pendiente", "09/05/21","button"),
      createData('Eduardo Carrasco','2016407543', 'Ingenieria civil Electrica', "2021", "Pendiente", "05/05/21","button"),
      createData('Rocio Villalobos','2016407543', 'Ingenieria civil industrial', "2021", "Pendiente", "31/04/21","button"),
      createData('Henry Agusto','2016407543', 'Ingenieria civil en computacion', "2021", "Pendiente", "15/07/21","button"),
      createData('Carlos Penaloza','2016407543', 'Ingenieria civil Mecanica', "2021", "Pendiente", "19/08/21","button"),
      createData('Felipe Ramirez','2016407543', 'Ingenieria civil en Obras Civiles', "2021", "Pendiente", "21/07/21")
    ]
  )
  
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
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: "50%",
    },
    logosearch :{
      width:"25px", 
      height:"25px"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));


  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeState, setChangeState] = useState(false)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [estudiante, setEstudiante] = useState("")
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeState = (idAlumno) => {
    setChangeState(!changeState)
    setEstudiante(idAlumno)
  }
  const handleChangeStateBack = () =>{
    setChangeState(!changeState)
  }

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
  // Funcion que envia la informacion de los campos de filtro 
  // hacia Back y obtener la lista nueva de estudiantes.
  const [filtros, setFiltros] = useState({})
  const handleSendFilters = () =>{
    setFiltros(
    {
      etapaFilter,
      estadoFilter,
      carreraFilter,
      anioFilter
    })
    console.log(filtros)
    handleClickOpen()
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
        console.log("login error: ", error);
    });
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} estudiante = {estudiante}/>
  }
  else{
    return (  
      <Fragment>
          <h2>
            Admin Inicio &gt; Estado practicas
          </h2>
          {/* Campo de Busqueda */}
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AiOutlineSearch className={classes.logosearch} />
            </Grid>
            <Grid item>
              <TextField id="search" label="Busqueda"  />
            </Grid>
          </Grid>
          {/* Filtros de Busqueda */}
          <Grid container spacing={1} alignItems="flex-end">
            {/* Filtro Busqueda por Etapa */}
            <Grid item>
              <FormControl className={classes.formControl}>
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
              <FormControl className={classes.formControl} disabled = {estadoEnabled}>
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
              <FormControl className={classes.formControl} >
                <InputLabel id="carreraSelectLabel">Carrera</InputLabel>
                <Select
                  labelId="carreraSelectLabel"
                  id="carreraSelect"
                  value={carreraFilter}
                  onChange={handleChangeCarreraFilter}
                >     
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem>   
                  {
                    carreras.map((carrera)=> (
                      <MenuItem value={carrera.value}>{carrera.nombre}</MenuItem>
                    ))
                  }                
                </Select>
              </FormControl>
            </Grid>
            {/* Filtro de Busqueda por Año */}
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="anioSelectLabel">Año</InputLabel>
                <Select
                  labelId="anioSelectLabel"
                  id="anioSelect"
                  value={anioFilter}
                  onChange={handleChangeAnioFilter}
                >
                  <MenuItem value=""> <em> Ninguno </em> </MenuItem>
                  {
                    anios.map((anio)=> (
                      <MenuItem value={anio}>{anio}</MenuItem>
                    ))
                  }     
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSendFilters}>
                Filtrar
              </Button>
            </Grid>
          </Grid>

          {/* Tabla de Practicas */}
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value ==="button" ? 
                              <IconButton aria-label="delete" size="medium" onClick={handleChangeState}>
                                <AiFillEdit fontSize="inherit" />
                              </IconButton>
                              : value}
                            </TableCell>
                          );
                        }
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          {
            open && AlertaSimple("filtros", JSON.stringify(filtros), handleClose)
          }
      </Fragment>
 
    )
    
  }
}