import React, { useState, useEffect } from 'react';
import axios from 'axios';
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




export default function Estudiante() {
  const classes = useStyles();
  const [data, setData] = useState([]);

 
  useEffect(() => {    
    cargarEstudiantes();
  }, []);


  const cargarEstudiantes = async () => {
     //Metodo que obtiene los datos del estudiante 
     axios.get(``)
     .then(res => {
       const estudiante = res.data;
       setData([...data, estudiante]);
     })
      
  }

  
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
           { /* data.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.carrera}
                </StyledTableCell>
           
                <StyledTableCell align="right">{row.cod_carrera}</StyledTableCell>
                <StyledTableCell align="right">{row.matricula}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">{row.rut}</StyledTableCell>                
                <StyledTableCell align="right">{row.correo_ins}</StyledTableCell>
                <StyledTableCell align="right">{row.sexo}</StyledTableCell>
                <StyledTableCell align="right">{row.fecha_nac}</StyledTableCell>
                <StyledTableCell align="right">{row.plan}</StyledTableCell>
                <StyledTableCell align="right">{row.anho_ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.via_ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_anho}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.comuna_origen}</StyledTableCell>
                <StyledTableCell align="right">{row.region}</StyledTableCell>
                <StyledTableCell align="right">{row.porc_avance}</StyledTableCell>
                </StyledTableRow>
            )) */} 
            </TableBody>
        </Table>
        </TableContainer>
        
        </Grow>

        </div>

    
  );
}
