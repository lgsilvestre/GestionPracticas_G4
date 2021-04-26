import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Dialog from '../Dialog/Dialog'

const useStyles = makeStyles((theme) =>({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 'none',
  },
  table: {
    width:'90vw',
    height:'75vh',
    margin: '0 auto',
    marginBottom: '40px',
    display: 'center',
    border: '2px solid rgba(0,111,110,1)',
  }
  
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0,111,110,1)',
    color: theme.palette.common.white,
    padding: '6px'
  },
  body: {
    fontSize: 12,
    padding: '6px'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

  },
}))(TableRow);

function createData(carrera, codigo, matricula,  rut, nombre, correo, sexo, fecha, plan, ingreso, via_ingreso, sit_actual, sit_actual_anio, sit_actual_periodo, periodo, comuna, region, porcentaje) {
  return {carrera, codigo, matricula, rut,nombre,  correo, sexo, fecha, plan, ingreso, via_ingreso, sit_actual, sit_actual_anio, sit_actual_periodo, periodo, comuna, region, porcentaje };
}

const rows = [
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),
  createData('Ingenieria civil en Computacion', '3407','2000407001', '9999999', 'Perez Perez Juan Manuel', 'juanito99@alumnos.utalca.cl', 	'M',	'8/17/1982',	'3'	, '2000',	'VIA PSU',	'TITULADO', 	'2009',	'1'	,'N',	'TALCA',	'7'	,'99'),

];

export default function Estudiante() {
  const classes = useStyles();

  return (
      <div>
        <Dialog />
        <Grow   in={true} style={{ transformOrigin: '0 0 0' }}  {...(true ? { timeout: 1500 } : {})}    >
           <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="customized table">
            <TableHead>
            <TableRow>
            <StyledTableCell align="left">Carrera</StyledTableCell>
            <StyledTableCell align="right" >Codigo Carrera</StyledTableCell>
            <StyledTableCell align="right" >Matricula</StyledTableCell>            
            <StyledTableCell align="right">Nombre Alumno</StyledTableCell>    
            <StyledTableCell align="right" >RUT</StyledTableCell>  
            <StyledTableCell align="right">Correo</StyledTableCell>
            <StyledTableCell align="right">Sexo</StyledTableCell>
            <StyledTableCell align="right">Fecha Nacimiento</StyledTableCell>
            <StyledTableCell align="right">Plan</StyledTableCell>
            <StyledTableCell align="right">Ingreso</StyledTableCell>
            <StyledTableCell align="right">Via Ingreso</StyledTableCell>
            <StyledTableCell align="right">Situacion Actual</StyledTableCell>
            <StyledTableCell align="right">Sit Actual Anio</StyledTableCell>
            <StyledTableCell align="right">Sit Actual Periodo</StyledTableCell>
            <StyledTableCell align="right">Periodo</StyledTableCell>
            <StyledTableCell align="right">Comuna Origen</StyledTableCell>
            <StyledTableCell align="right">Region</StyledTableCell>
            <StyledTableCell align="right">Porcentaje</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.carrera}
                </StyledTableCell>
           
                <StyledTableCell align="right">{row.codigo}</StyledTableCell>
                <StyledTableCell align="right">{row.matricula}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">{row.rut}</StyledTableCell>
                
                <StyledTableCell align="right">{row.correo}</StyledTableCell>
                <StyledTableCell align="right">{row.sexo}</StyledTableCell>
                <StyledTableCell align="right">{row.fecha}</StyledTableCell>
                <StyledTableCell align="right">{row.plan}</StyledTableCell>
                <StyledTableCell align="right">{row.ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.via_ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_anio}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.comuna}</StyledTableCell>
                <StyledTableCell align="right">{row.region}</StyledTableCell>
                <StyledTableCell align="right">{row.porcentaje}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        
        </Grow>

        </div>

    
  );
}
