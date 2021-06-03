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
import { Button, IconButton, ThemeProvider } from '@material-ui/core';
import {AiFillEdit} from "react-icons/ai"
import { InfoEstudiante } from './InfoEstudiante';


export const TablaEstados = ({history}) =>  {
  
  const columns = [
    { id: 'nombre', label: 'Estudiante', minWidth: "25%" },
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
  
  function createData(nombre, carrera, anio, estado, fechaEnd, action) {
    return { nombre, carrera, anio, estado, fechaEnd,action };
  }
  
  const rows = [
    // ("Nombre", carrera, año, estado, fecha termino)
    createData('Diego Perez', 'Ingenieria civil en computación', "2021", "Pendiente", "21/07/21","button"),
    createData('Camila Lopez', 'Ingenieria civil industrial', "2021", "Pendiente", "31/04/21","button"),
    createData('Fernando Fuenzalida', 'Ingenieria civil mecatronica', "2021", "Pendiente", "31/04/21","button"),
    createData('Rodrigo Abarca', 'Ingenieria civil en computacion', "2021", "Pendiente", "08/05/21","button"),
    createData('Pia Gomez', 'Ingenieria civil en Obras Civiles', "2021", "Pendiente", "24/06/21","button"),
    createData('Eliot Anderson', 'Ingenieria civil en computacion', "2021", "Pendiente", "16/04/21","button"),
    createData('Pedro Fuentes', 'Ingenieria civil industrial', "2021", "Pendiente", "17/04/21","button"),
    createData('Simon Lopez', 'Ingenieria civil mecatronica', "2021", "Pendiente", "25/07/21","button"),
    createData('Marcelo Muñoz', 'Ingenieria civil en computacion', "2021", "Pendiente", "14/09/21","button"),
    createData('Humberto Suazo', 'Ingenieria civil de Minas ', "2021", "Pendiente", "09/05/21","button"),
    createData('Eduardo Carrasco', 'Ingenieria civil Electrica', "2021", "Pendiente", "05/05/21","button"),
    createData('Rocio Villalobos', 'Ingenieria civil industrial', "2021", "Pendiente", "31/04/21","button"),
    createData('Henry Agusto', 'Ingenieria civil en computacion', "2021", "Pendiente", "15/07/21","button"),
    createData('Carlos Penaloza', 'Ingenieria civil Mecanica', "2021", "Pendiente", "19/08/21","button"),
    createData('Felipe Ramirez', 'Ingenieria civil en Obras Civiles', "2021", "Pendiente", "21/07/21")
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
      
    },
    container: {
      maxHeight: "50%",
    }
  });
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
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} estudiante = {estudiante}/>
  }
  else{
    return (
      
      <Fragment>

          <h2>
            Admin Inicio &gt; Estado practicas
          </h2>
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
      </Fragment>
 
    )
    
  }
}