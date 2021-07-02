import React, { useEffect, useState } from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableBody, 
  TableRow, TableCell, Divider, Paper,TablePagination, Typography,Box} 
  from '@material-ui/core';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"
import { regiones } from '../../../../api/regiones';

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
  mainbox:{
    marginTop:'10px', 
    marginBottom:'30px', 
    borderRadius:'20px', 
    backgroundColor:'#fafafa'
  },
});

export const Historial = () => {
  
  const location = useLocation()
  const idAlumno=location.state.idAlumno
  const nroPractica = location.state.nroPractica
  const idPractica = location.state.idPractica
  // console.log("idalumno; ",idAlumno," nro ",nroPractica)
  const [infoAlumno, setInfoAlumno] = useState({})
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
      // console.log("Resultado Practica:", response.data)
      const lista = []
      for(var i=resultado.length-1; i>=0; i--){
        const fila = createData(resultado[i].fecha,resultado[i].etapa, resultado[i].comentario, resultado[i].retroalimentacion)
        // console.log("fila: ",fila)
        lista.push(fila)
      }
      setRows(lista)
    }).catch(error =>{
      console.log("Erorr en historial", error)
    })
  }
  const getInfoPractica = () => {
    console.log("Info de practica: ",idPractica)
    axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getInfoPracticaById",{
      id_practica:idPractica
    }).then(response =>{
      var data = response.data[0]
      var region = regiones[parseInt(data.region)].region
      // console.log("respuesta info inscripcion: ",data)
      data.region=region
      console.log("Practica: ",data)
      setInfoAlumno(data)
    }).catch(error =>{
      console.log("ERROR info practica. ",error)
    })
  }
  useEffect(() => {
    getHistorialPractica()
    getInfoPractica()
    // servePracticaAlumno()
  }, [])
  return (
    <div>
      <div className={classes.encabezado}>
        <motion.div  
          animate={{ x: 100 }}  
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <Typography variant="h3" className={classes.titulo} style={{color:''}}>Detalles</Typography>
        </motion.div>
      </div>
      <div className="animate__animated animate__fadeIn animate__faster">
      <Divider style={{marginTop:"1vh", marginBottom:"2vh"}}/>
      <Box className="container" 
        style={{marginTop:'10px', 
          marginBottom:'30px', 
          borderRadius:'20px', 
          backgroundColor:'#fafafa'}} 
        boxShadow={1}
      >
        <div className="row align-items-center">
          <div className="col">
            <h4 style={{paddingTop:'20px',marginLeft:"2vw"}}>Resumen de práctica</h4>
          </div>
        </div>
        <Divider/>
        
        <div className="row" style={{marginLeft:"2vw", marginTop:"1vh"}}>
          <div className="col">
            <div className="row">
              <div className="col">
                <h7><strong>Alumno: </strong>{infoAlumno.nombre}</h7>
              </div> 
              <div className="col">
              <h7><strong>Correo: </strong>{infoAlumno.correo_ins}</h7>
              </div>  
            </div>         
            <div className="row">
              <div className="col">
                <h7><strong>Carrera: </strong>{infoAlumno.nbe_carrera}</h7>
              </div> 
              <div className="col">
                <h7><strong>N° de práctica: </strong>{nroPractica}</h7>
              </div>  
            </div>         
            <div className="row">
              <div className="col">
                <h7><strong>Etapa Actual: </strong>{infoAlumno.etapa} - {infoAlumno.estado}</h7>
              </div> 
              <div className="col">
                <h7><strong>Fecha de Solicitud: </strong>{infoAlumno.fecha_solicitud}</h7>
              </div>  
            </div>         
            <div className="row">
              <div className="col">
                <h7><strong>Fecha de Inicio: </strong>{infoAlumno.fecha_inicio}</h7>
              </div> 
              <div className="col">
                <h7><strong>Fecha de Termino: </strong>{infoAlumno.fecha_termino}</h7>
              </div>  
            </div>     
            <div className="row">
              <div className="col">
              <h7><strong>Empresa: </strong>{infoAlumno.empresa}</h7>

              </div> 
              <div className="col">
              <h7><strong>Region: </strong>{infoAlumno.region}</h7>

              </div>  
            </div>     
            <div className="row">
              <div className="col">
                <h7><strong>Comuna o País: </strong>{infoAlumno.comuna}</h7>
              </div> 
              <div className="col">
                <h7><strong>Fecha de Inicio: </strong>{infoAlumno.etapa} - {infoAlumno.estado}</h7>
              </div>  
            </div>     
            <div className="row">
              <div className="col">
                <h7><strong>Nombre Supervisor: </strong>{infoAlumno.supervisor}</h7>
              </div> 
              <div className="col">
                <h7><strong>Correo de supervisor: </strong>{infoAlumno.email_supervisor}</h7>
              </div>  
            </div>     
            <div className="row">
              <div className="col">
                <h7><strong>Contacto emergencia: </strong>{infoAlumno.nombre_contacto}</h7>
              </div> 
              <div className="col">
                <h7><strong>Telefono emergencia: </strong>{infoAlumno.telefono_contacto}</h7>
              </div>  
            </div>     
          </div>

        </div>
        <div className="row" style={{height:"2vh"}}></div>
      </Box>
      <h4 style={{paddingTop:'20px',marginLeft:"2vw"}}>Historial</h4>
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
      {rows.length==0 &&(
        <p className="text-center" style={{fontStyle:"italic"}}> No existe registro de historial para esta práctica </p>
      )
      }

      </div>
    </div>
  );
}