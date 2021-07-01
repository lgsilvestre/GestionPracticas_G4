import React, { useEffect, useState } from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableBody, 
  TableRow, TableCell, Divider, Paper,TablePagination, Typography} 
  from '@material-ui/core';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FAFAFA",
    color: "black",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  encabezado:{
    marginLeft: '-88px',
    marginTop:"5vh"
  },
  titulo:{
    color: '#1b2d4f'
  },
});

export const Historial = () => {
  
  const location = useLocation()
  const idAlumno=location.state.idAlumno
  const nroPractica = location.state.nroPractica
  console.log("idalumno; ",idAlumno," nro ",nroPractica)
  // const {idAlumno,nroPractica} = location.state
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  function createData(fecha, etapa, accion, comentario) {
    return { fecha, etapa, accion, comentario};
  }
  
  const getHistorialPractica = () => {
    axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getHistorialPractica",{
      id_alumno:idAlumno,
      nropractica:nroPractica
    }).then(response =>{
      const resultado = response.data;
      console.log("Resultado Practica:", response.data)
      const lista = []
      for(var i=resultado.length-1; i>=0; i--){
        const fila = createData(resultado[i].fecha,resultado[i].etapa, resultado[i].comentario, resultado[i].retroalimentacion)
        console.log("fila: ",fila)
        lista.push(fila)
      }
      setRows(lista)
    }).catch(error =>{
      console.log("Erorr en historial", error)
    })
  }
  useEffect(() => {
    getHistorialPractica()
    
  }, [])
  return (
    <div>
      <div className={classes.encabezado}>
        <motion.div  
          animate={{ x: 100 }}  
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <Typography variant="h3" className={classes.titulo} style={{color:''}}>Historial</Typography>
        </motion.div>
      </div>
      <div className="animate__animated animate__fadeIn animate__faster">
        <Divider style={{marginTop:"1vh", marginBottom:"2vh"}}/>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{minWidth:"10vw"}}>Fecha</StyledTableCell>
                <StyledTableCell style={{minWidth:"7vw"}}>Etapa</StyledTableCell>
                <StyledTableCell style={{width:"25vw"}}>Acción</StyledTableCell>
                <StyledTableCell style={{width:"25vw"}}>Comentario</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell >{row.fecha}</StyledTableCell>
                  <StyledTableCell >{row.etapa}</StyledTableCell>
                  <StyledTableCell >{row.accion}</StyledTableCell>
                  <StyledTableCell >{row.comentario}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </div>
  );
}