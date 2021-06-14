import React, { Fragment, useEffect, useState } from 'react';
import {AiOutlineEye} from "react-icons/ai";
import { InfoEstudiante } from './InfoEstudiante';
import axios from 'axios';
import { motion } from "framer-motion"
import { Filtros } from './Filtros';
import {makeStyles, Table, TableContainer, TableHead, TableBody, TableRow, Modal, Button, TextField, TableCell, IconButton, Paper,TablePagination} 
  from '@material-ui/core';
import practicas from '../../../routers/assets/practicas.svg';

//Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  encabezado:{
    marginTop: '10vh',
    marginTop: '10vh',
    display: 'flex',
    alignItems: 'center'
  },
  titulo:{
    marginLeft:'10%',
    display: 'inline-block',
    color: '#3d84b8',
    fontFamily: 'Righteous, serif',
   fontSize: '4em',
   textShadow: '.05em .05em 0 #3f3697',
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
  },
  botonPerso: {
    color:'#f69b2e'
  },
  botonFiltro: {
    backgroundColor:"grey",
    color:"white",
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
    '&:hover': {
    backgroundColor:'#f69b2e',
      color: '#fff'
      }
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
    },
    {
      id: 'etapa',
      label: 'Etapa',
      minWidth: "25%",
    },
    {
      id: 'estado',
      label: 'Estado',
      minWidth: "25%",
    },
    {
      id: 'fechaEnd',
      label: 'Fecha de Término',
      minWidth: "25%",
    },
    {
      id: 'action',
      label: 'Acción',
      minWidth: "25%",
    },
  ];
  //Funcion que crea los datos en un objeto para cada alumno o fila
  function createData(nombre, matricula, carrera, anio, etapa, estado, fechaEnd, action) {
    return { nombre, matricula, carrera, anio, estado, etapa, fechaEnd, action };
  }
  const [originalData, setOriginalData] = useState([])
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeState, setChangeState] = useState(false)
  const [seleccionado, setSeleccionado] = useState('')
  const [idAlumnoSelected, setIdAlumnoSelected] = useState("")
  
  useEffect(async()=>{
    petitionGetPracticaAlumno()
  },[])

  const petitionGetPracticaAlumno = async () =>{
    await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/servePracticaAlumno")
    .then(response=>{
      console.log(response.data)
      const resultado = response.data;
      // console.log("antes:",rows)
      const lista = []
      for(var i=0; i<resultado.length; i++){
        const fila = createData(resultado[i].nombre , resultado[i].matricula , resultado[i].nbe_carrera,resultado[i].anho_ingreso,resultado[i].etapa,
          resultado[i].estado, resultado[i].fecha_termino,"button")
        // console.log(fila)
        lista.push(fila)
      }  
      // console.log(lista)
      setRows(lista)
      setOriginalData(lista)
      
    })
  }

  const petitionGetPracticaAlumnoFiltrada = async () =>{
    await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/servePracticaFiltrada",{
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changeSelected = (etapa)=>{
    switch (etapa) {
      case "Solicitud":
        setSeleccionado(0)
        break;
      case "Inscripcion":
        setSeleccionado(1)
        break;
      case "Cursando":
        setSeleccionado(2)
        break;
      case "Evaluacion":
        setSeleccionado(3)
        break;
      default:
        setSeleccionado(0)
        break;
    }
  }
  const handleChangeState = (etapa, idAlumno) => {
    console.log(idAlumno)
    setIdAlumnoSelected(idAlumno)
    setChangeState(!changeState)
    changeSelected(etapa)
    
  }
  const handleChangeStateBack = () =>{
    setChangeState(!changeState)
  }
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} idAlumno = {idAlumnoSelected} etapaProp={seleccionado}/>
  }
  else{
    return (  
      <div className="animate__animated animate__fadeIn animate__faster" style={{marginTop:'20px', marginBottom:'30px'}}>
        <div className={clasesEstilo.encabezado}>
        <motion.div   animate={{ scale: 4 }}   transition={{ duration: 0.5 }} >  <img  heigth ={20} src={practicas} alt='practicas'/>  </motion.div>
        <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <h1 className={clasesEstilo.titulo}  >PRACTICAS</h1></motion.div>
        </div>
        <div>
          <Filtros clasesEstilo={clasesEstilo} data={originalData} setRows={setRows}/>
          <hr/> 
          <Paper className={clasesEstilo.root}>
            {/* Tabla de Practicas */}
            <TableContainer className={clasesEstilo.container}>
              <Table stickyHeader aria-label="sticky table">
                {/* Headers de la tabla */}
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
                {/* Cuerpo de la Tabla */}
                <TableBody>
                  {/* Modificar lista para mostrar solo la cantidad de filas  que se especifica en las opciones, */}
                  {/* luego aplicamos un map para recorrer cada fila creandola en la tabla */}
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {/* Recorremos cada campo de una fila mostrando el dato respectivo */}
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (                           
                            <TableCell key={column.id} align={column.align}>
                              {/* Si el campo es de tipo boton, agregamos el boton de accion, si no mostramos el dato */}
                              {value ==="button" ? 
                              <IconButton className={clasesEstilo.botonPerso} aria-label="delete" size="medium" 
                                onClick={() => handleChangeState(row.etapa, row.matricula)}>
                                <AiOutlineEye fontSize="inherit"/>
                              </IconButton>
                              : value}
                            </TableCell>
                          );
                        })}
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
        {/* <Button  className={clasesEstilo.botonFiltro} variant="contained" onClick={petitionGetPracticaAlumnoFiltrada}>
                Filtrar
        </Button>  */}
      </div>
 
    )
    
  }
}