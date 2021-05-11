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
import {AiFillEdit, AiOutlineSearch,AiOutlineEye} from "react-icons/ai"
import { InfoEstudiante } from './InfoEstudiante';
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
    { id: 'anio', label: 'Año', minWidth: "25%" },
    { id: 'etapa',label: 'Etapa', minWidth: "25%"},
    { id: 'estado',label: 'Estado', minWidth: "25%"},
    { id: 'fechaEnd',label: 'Fecha de Termino',minWidth: "25%"},
    { id: 'action',label: 'Accion',minWidth: "25%"},
  ];
  //Funcion que crea los datos en un objeto para cada alumno o fila
  function createData(nombre, matricula, carrera, anio, etapa, estado, fechaEnd, action) {
    return { nombre, matricula, carrera, anio, estado, etapa, fechaEnd, action };
  }
  //Datos locales para mostrar temporalmente en la tabla
  const data = [
    // ("Nombre", carrera, año, estado, fecha termino)
    createData('Diego Perez', '1', 'Ingenieria civil en computación', "2021","Solicitud", "Pendiente", "","button"),
    createData('Camila Lopez','2', 'Ingenieria civil industrial', "2021","Inscripción", "Aprobada", "31/04/21","button"),
    createData('Fernando Fuenzalida','3', 'Ingenieria civil mecatronica', "2021", "Cursando","", "31/04/21","button"),
    createData('Rodrigo Abarca','4', 'Ingenieria civil en computacion', "2021", "Evaluación","Pendiente", "","button"),
    createData('Pia Gomez','5', 'Ingenieria civil en Obras Civiles', "2021","Inscripción", "Pendiente", "24/06/21","button"),
    createData('Eliot Anderson','6', 'Ingenieria civil en computacion', "2021","Inscripción", "Pendiente", "16/04/21","button"),
    createData('Pedro Fuentes','7', 'Ingenieria civil industrial', "2021","Inscripción", "Pendiente", "17/04/21","button"),
    createData('Simon Lopez','8', 'Ingenieria civil mecatronica', "2021","Inscripción", "Pendiente", "25/07/21","button"),
    createData('Marcelo Muñoz','9', 'Ingenieria civil en computacion', "2021","Inscripción", "Pendiente", "14/09/21","button"),
    createData('Humberto Suazo','10', 'Ingenieria civil de Minas ', "2021","Inscripción", "Pendiente", "09/05/21","button"),
    createData('Eduardo Carrasco','11', 'Ingenieria civil Electrica', "2021","Inscripción", "Pendiente", "05/05/21","button"),
    createData('Rocio Villalobos','12', 'Ingenieria civil industrial', "2021","Inscripción", "Pendiente", "31/04/21","button"),
    createData('Henry Agusto','13', 'Ingenieria civil en computacion', "2021","Inscripción", "Pendiente", "15/07/21","button"),
    createData('Carlos Penaloza','14', 'Ingenieria civil Mecanica', "2021", "Inscripción","Pendiente", "19/08/21","button"),
    createData('Felipe Ramirez','15', 'Ingenieria civil en Obras Civiles', "2021","Inscripción", "Pendiente", "21/07/21","button")
  ]
  const [rows, setRows] = useState(data)
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
  // Funcion que envia la informacion de los campos de filtro 
  // hacia Back y obtener la lista nueva de estudiantes.
  

  
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} estudiante = {estudiante}/>
  }
  else{
    return (  
      <Fragment>
          <h2>
            Admin Inicio &gt; Estado practicas
          </h2>
          {/* Filtros de Busqueda */}
          <Filtros clasesEstilo={clasesEstilo} data = {data} setRows = {setRows}          
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
                        {
                          columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value ==="button" ? 
                                <IconButton aria-label="delete" size="medium" onClick={handleChangeState}>
                                  <AiOutlineEye fontSize="inherit" />
                                </IconButton>
                                : value}
                              </TableCell>
                            );
                          })
                        }
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
          {/* Alerta con info de los filtros elegidos */}
          
      </Fragment>
 
    )
    
  }
}