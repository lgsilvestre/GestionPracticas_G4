import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { InfoEstudiante } from './InfoEstudiante';
import axios from 'axios';
import { motion } from "framer-motion"
import { Filtros } from './Filtros';
import {
  makeStyles, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, IconButton, Paper, TablePagination, Typography
}
  from '@material-ui/core';
import Cookies from 'universal-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';

//Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  encabezado: {
    marginLeft: '-88px'
  },
  titulo: {
    color: '#1b2d4f'
  },
  container: {
    maxHeight: "50%",
  },
  logosearch: {
    width: "25px",
    height: "25px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  botonPerso: {
    color:'#f69b2e',
    backgroundColor:"white"
  },
  botonFiltro: {
    backgroundColor: "grey",
    color: "white",
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
    '&:hover': {
      backgroundColor: '#f69b2e',
      color: '#fff'
      }
  },
  red:{
    backgroundColor:"#FFAEAC"
  } 
  
}));

export const TablaEstados = ({ history }) => {
  const cookies = new Cookies();
  const clasesEstilo = useStyles();
  // Columnas para la tabla de estados
  const columns = [
    { id: 'nombre', label: 'Estudiante', minWidth: "25%" },
    { id: 'matricula', label: 'Nro Matricula', minWidth: "25%" },
    { id: 'carrera', label: 'Carrera', minWidth: "25%" },
    { id: 'anio', label: 'Año', minWidth: "25%" },
    { id: 'etapa', label: 'Etapa', minWidth: "25%" },
    { id: 'estado', label: 'Estado', minWidth: "25%" },
    { id: 'fechaEnd', label: 'Fecha de Término', minWidth: "25%" },
    { id: 'nroPractica', label: 'N° Práctica', minWidth: "25%" },
    { id: 'action', label: 'Acción', minWidth: "25%" },
  ];
  //Funcion que crea los datos en un objeto para cada alumno o fila
  function createData(nombre, matricula, carrera, anio, etapa, estado, fechaEnd, nroPractica, action, del) {
    return { nombre, matricula, carrera, anio, estado, etapa, fechaEnd, nroPractica, action, del };
  }
  const [originalData, setOriginalData] = useState([])
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeState, setChangeState] = useState(false)
  const [seleccionado, setSeleccionado] = useState('')
  const [nroMatriculaSelected, setNroMatriculaSelected] = useState("")
  const [nroPractica, setnroPractica] = useState("")
  const [hideLoader, setLoader] = useState(true)
  const [idPractica, setIdPractica] = useState("")
  const loaderController = () => setLoader(false)
  const [idAlumnoSelected, setIdAlumnoSelected] = useState("")
  const [count, setCount] = useState(0)
  useEffect(async()=>{
    petitionGetPracticaAlumno()
  },[changeState])

  const petitionGetPracticaAlumno = async () => {
    await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/servePracticaAlumno")
      .then(response => {
        console.log(response.data)
        const resultado = response.data;
        // console.log("antes:",rows)
        const lista = []
        for (var i = 0; i < resultado.length; i++) {
          console.log("practica: ",resultado[i])
          const fila = createData(resultado[i].nombre, resultado[i].matricula, resultado[i].nbe_carrera, resultado[i].anho_ingreso, resultado[i].etapa,
            resultado[i].estado, resultado[i].fecha_termino, resultado[i].numero, "button", "del")
          fila.idPractica = resultado[i].id_practica
          console.log("row", fila)
          lista.push(fila)
        }
        // console.log(lista)
        loaderController()
        setRows(lista)
        setOriginalData(lista)
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changeSelected = (etapa) => {
    switch (etapa) {
      case "Solicitud":
        setSeleccionado(0)
        break;
      case "Inscripción":
        setSeleccionado(1)
        break;
      case "Cursando":
        setSeleccionado(2)
        break;
      case "Evaluación":
        setSeleccionado(3)
        break;
      default:
        setSeleccionado(0)
        break;
    }
  }
  const getIdAlumno = async (etapa, matricula, numero,idpractica) => {
    console.log("SOLICITANDO ID ALUMNO  CON ", matricula)
    await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getAlumnoIdMatricula", {
      matricula: matricula
    })
      .then(response => {
        setIdPractica(idpractica)
        setIdAlumnoSelected(response.data[0].id_alumno)
        console.log("RESPONSE GETIDALUMNO:", response.data)
        setnroPractica(numero)
        setNroMatriculaSelected(matricula)
        cookies.set('alumnoactual', '4', { path: '/' });
        changeSelected(etapa)
        setChangeState(!changeState)
      })
  }

  const handleChangeState = (etapa, matricula, numero, idpractica) => {
    getIdAlumno(etapa, matricula, numero,idpractica)
  }
  
  const handleChangeStateBack = () =>{
    setCount(count+1)
    setChangeState(!changeState)
  }
  const getBackGroundRow = (etapa) => {
    // console.log("Entrando con",etapa)
    if(etapa==="Solicitud"){
      return clasesEstilo.red
    }
  }
  
  if(changeState){
    return <InfoEstudiante 
      handleChangeStateBack={handleChangeStateBack} 
      nroMatricula = {nroMatriculaSelected} 
      etapaProp={seleccionado}
      nroPractica={nroPractica}
      idAlumno={idAlumnoSelected}
      idPractica={idPractica}
    />
  }
  else {
    return (
      <div className="animate__animated animate__fadeIn animate__faster" style={{ marginTop: '20px', marginBottom: '30px' }}>
        <div className={clasesEstilo.encabezado}>
          <motion.div animate={{ x: 100 }} transition={{ ease: "easeOut", duration: 2 }}><Typography variant="h3" className={clasesEstilo.titulo} style={{ color: '' }}>Practicas</Typography></motion.div>
        </div>
        <div>
          <Filtros clasesEstilo={clasesEstilo} data={originalData} setRows={setRows} />
          <hr />
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
                      <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                        {/* Recorremos cada campo de una fila mostrando el dato respectivo */}
                        {columns.map((column,index) => {
                          const value = row[column.id];
                          return (                           
                            <TableCell key={column.id}className={getBackGroundRow(row.etapa)} claskey={column.id} align={column.align} >
                              {/* Si el campo es de tipo boton, agregamos el boton de accion, si no mostramos el dato */}                         
                              {value ==="button" ? (
                                <>                              
                                    <IconButton className={clasesEstilo.botonPerso} aria-label="delete" size="medium" 
                                      onClick={() => handleChangeState(row.etapa, row.matricula, row.nroPractica, row.idPractica)}>
                                    <AiOutlineEye fontSize="inherit" />
                                  </IconButton>
                                  {/* <IconButton className={clasesEstilo.botonPerso} aria-label="delete" size="medium" 
                                    onClick={() => {}}>
                                    <AiFillDelete fontSize="inherit"/>
                                  </IconButton> */}
                                </>

                              )
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
              labelRowsPerPage="Filas por página"
            />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
              {hideLoader ? <CircularProgress style={{ marginTop: '10px', marginBottom: '10px' }} /> : null}

            </div>

          </Paper>
        </div>
        {/* <Button  className={clasesEstilo.botonFiltro} variant="contained" onClick={petitionGetPracticaAlumnoFiltrada}>
                Filtrar
        </Button>  */}
      </div>

    )

  }
}