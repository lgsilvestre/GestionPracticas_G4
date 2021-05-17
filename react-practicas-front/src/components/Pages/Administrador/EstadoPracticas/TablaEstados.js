import React, { Fragment, useEffect, useState } from 'react';
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
import {AiFillEdit, AiOutlineSearch,AiOutlineEye} from "react-icons/ai";
import { InfoEstudiante } from './InfoEstudiante';
import './TablaEstadosStyles.css';
import AlertaSimple from '../../../ui/Alertas/AlertaSimple';
import axios from 'axios';
import { useForm } from '../../../../hooks/useForm';
import { Filtros } from './Filtros';

//Estilos
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

export const TablaEstados = ({history}) =>  {

  const clasesEstilo = useStyles();
  // Columnas para la tabla de estados
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
      label: 'Fecha de Término',
      minWidth: "25%",
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'Acción',
      minWidth: "25%",
      align: 'right',
    },
  ];
  //Funcion que crea los datos en un objeto para cada alumno o fila
  function createData(nombre, matricula, carrera, anio, etapa, estado, fechaEnd, action) {
    return { nombre, matricula, carrera, anio, estado, etapa, fechaEnd, action };
  }
  //Datos locales para mostrar temporalmente en la tabla
  const data = [
    // ("Nombre", carrera, año, estado, fecha termino)
    createData('Diego Perez', 'Ingeniería civil en computación', "2021", "Pendiente", "21/07/21","button"),
    createData('Camila Lopez', 'Ingeniería civil industrial', "2021", "Pendiente", "31/04/21","button"),
    createData('Fernando Fuenzalida', 'Ingeniería civil mecatronica', "2021", "Pendiente", "31/04/21","button"),
    createData('Rodrigo Abarca', 'Ingeniería civil en computacion', "2021", "Pendiente", "08/05/21","button"),
    createData('Pia Gomez', 'Ingeniería civil en Obras Civiles', "2021", "Pendiente", "24/06/21","button"),
    createData('Eliot Anderson', 'Ingeniería civil en computacion', "2021", "Pendiente", "16/04/21","button"),
    createData('Pedro Fuentes', 'Ingeniería civil industrial', "2021", "Pendiente", "17/04/21","button"),
    createData('Simon Lopez', 'Ingeniería civil mecatronica', "2021", "Pendiente", "25/07/21","button"),
    createData('Marcelo Muñoz', 'Ingeniería civil en computacion', "2021", "Pendiente", "14/09/21","button"),
    createData('Humberto Suazo', 'Ingeniería civil de Minas ', "2021", "Pendiente", "09/05/21","button"),
    createData('Eduardo Carrasco', 'Ingeniería civil Electrica', "2021", "Pendiente", "05/05/21","button"),
    createData('Rocio Villalobos', 'Ingeniería civil industrial', "2021", "Pendiente", "31/04/21","button"),
    createData('Henry Agusto', 'Ingeniería civil en computacion', "2021", "Pendiente", "15/07/21","button"),
    createData('Carlos Penaloza', 'Ingeniería civil Mecanica', "2021", "Pendiente", "19/08/21","button"),
    createData('Felipe Ramirez', 'Ingeniería civil en Obras Civiles', "2021", "Pendiente", "21/07/21")
  ];
  /*
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: "50%",
    },
  });*/
  //const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(data);
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
  // Funcion que envia la informacion de los campos de filtro 
  // hacia Back y obtener la lista nueva de estudiantes.
  

  
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} estudiante = {estudiante}/>
  }
  else{
    return (  
      <Fragment>
        <div style={{marginTop:'20px', marginBottom:'30px'}}>
          <h4 style={{marginBottom:'20px'}}>
            Admin &gt; Estado practicas
          </h4>
          <Filtros clasesEstilo={clasesEstilo} data={data} setRows={setRows}          
          />
          <hr/>
          {/* Tabla de Practicas */}
          <Paper className={clasesEstilo.root}>
      
            <TableContainer className={clasesEstilo.container}>
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
                              <IconButton style={{color:'#f69b2e'}} aria-label="delete" size="medium" onClick={handleChangeState}>
                                <AiFillEdit fontSize="inherit"/>
                              </IconButton>
                              : value}
                            </TableCell>
                          );
                        })},
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage ="Filas por página"
            />
          </Paper>
        </div> 
      </Fragment>
 
    )
    
  }
}