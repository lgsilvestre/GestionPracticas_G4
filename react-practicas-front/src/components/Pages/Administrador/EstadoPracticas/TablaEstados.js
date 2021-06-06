import React, { Fragment, useState } from 'react';
import {AiOutlineEye} from "react-icons/ai";
import { InfoEstudiante } from './InfoEstudiante';
import axios from 'axios';
import { Filtros } from './Filtros';
import {makeStyles, Table, TableContainer, TableHead, TableBody, TableRow, Modal, Button, TextField, TableCell, IconButton, Paper,TablePagination} 
  from '@material-ui/core';
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
  ];
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeState, setChangeState] = useState(false)
  const [seleccionado, setSeleccionado] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [estudiante, setEstudiante] = useState("")
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changeSelected = (etapa)=>{
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
  const handleChangeState = (etapa, idAlumno="") => {
    setChangeState(!changeState)
    //setEstudiante(idAlumno)
    changeSelected(etapa)
    
  }
  const handleChangeStateBack = () =>{
    setChangeState(!changeState)
  }
  if(changeState){
    return <InfoEstudiante handleChangeStateBack={handleChangeStateBack} estudiante = {estudiante} etapaProp={seleccionado}/>
  }
  else{
    return (  
      <div className="animate__animated animate__fadeIn animate__faster" style={{marginTop:'20px', marginBottom:'30px'}}>
        <h4 style={{marginBottom:'10px'}}>
            Admin &gt; Prácticas
          </h4>
        <div>
          <Filtros clasesEstilo={clasesEstilo} data={data} setRows={setRows}/>
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
                                onClick={() => handleChangeState(row.etapa)}>
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
      </div>
 
    )
    
  }
}