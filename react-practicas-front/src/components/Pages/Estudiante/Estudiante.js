import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Table, TableContainer, TableHead, TableBody, TableRow, Modal, TableCell, Paper, Container } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import FormAlumno from '../../FormAlumno/FormAlumno';
import { motion } from "framer-motion"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Excel from '../Estudiante/Excel/Excel'

export default function Administrador() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [hideLoader, setLoader] = useState(true)
  const loaderController = () => setLoader(false)
  const [estudiante, setEstudiante] = useState({
    nombre: '',
    carrera: '',
    correo_ins: '',
    password: '',
    matricula: '',
    cod_carrera: '',
    rut: '',
    fecha_nac: '',
    plan: '',
    anho_ingreso: '',
    sit_actual_periodo: '',
    nivel: '',
    nivel_99_aprobado: '',
  })

  function createData(carrera, matricula, nombre, rut, correo_ins, action) {
    return { carrera, matricula, nombre, rut, correo_ins, action };
  }

  // Columnas para la tabla de estados
  const columns = [
    { id: 'carrera', label: 'Carrera', minWidth: "25%" },
    { id: 'matricula', label: 'Nro Matricula', minWidth: "25%" },
    { id: 'nombre', label: 'Estudiante', minWidth: "25%" },
    { id: 'rut', label: 'RUT', minWidth: "25%" },
    { id: 'correo_ins', label: 'Correo', minWidth: "25%" },
    { id: 'action', label: 'Acción', minWidth: "50%", },
  ];

  const peticionGet = async () => {
    await axios.get('http://localhost/GestionPracticas_G4/ci-practicas-back/public/getAlumnosAdmin')
      .then(response => {
        console.log(response.data)
        const resultado = response.data;
        // console.log("antes:",rows)
        const lista = []
        for (var i = 0; i < resultado.length; i++) {
          const fila = createData(resultado[i].nombre_carrera, resultado[i].matricula, resultado[i].nombre_alumno, resultado[i].rut, resultado[i].correo_ins, "button")
          // console.log(fila)
          lista.push(fila)
          console.log(resultado[i].carrera)
        }
        // console.log(lista)
        loaderController()
        setRows(lista)
      }).catch(error => {
        console.log(error)
      })
  }

  const getCarreraAlumno = async () => {
    await axios.post('http://localhost/GestionPracticas_G4/ci-practicas-back/public/getCarreraAlumno')
      .then(response => {
        setRows(rows.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPost = async (estudiante) => {
    console.log(estudiante)
    await axios.post('', estudiante
    )
      .then(response => {
        setRows(rows.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPut = async () => {
    await axios.put('' + estudiante
      .id, estudiante
    )
      .then(response => {
        var dataNueva = rows;
        dataNueva.map(consola => {
          if (estudiante
            .id === consola.id) {
            consola.nombre = estudiante
              .nombre;
            consola.lanzamiento = estudiante
              .lanzamiento;
            consola.empresa = estudiante
              .empresa;
            consola.unidades_vendidas = estudiante
              .unidades_vendidas;
          }
        })
        setRows(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    console.log(estudiante.id)
    await axios.delete('' + estudiante.id)
      .then(response => {
        setRows(rows.filter(consola => consola.id !== estudiante
          .id));
        abrirCerrarModalEliminar();
      })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalVerMas = () => {
    setModalVerMas(!modalVerMas);
  }

  const seleccionarEstudiante=(rows, caso)=>{
    setEstudiante (rows);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const seleccionarVerMas = (estudiante) => {
    abrirCerrarModalVerMas();
    setEstudiante(estudiante);
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyInsertar = (
    <div>
      <FormAlumno setEstudiante={setEstudiante} estudiante={estudiante} />
      <DialogActions className={classes.encabezado}>
        <Button className={classes.boton} color="primary" onClick={() => peticionPost(estudiante)}>Agregar</Button>
        <Button className={classes.botonCancelar} onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </DialogActions>

    </div>
  )

  const bodyEditar = (
    <div >
      <FormAlumno setEstudiante={setEstudiante} estudiante={estudiante} />

      <DialogActions>
        <Button className={classes.boton} color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button className={classes.botonCancelar} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </DialogActions>

    </div>
  )

  const bodyEliminar = (
    <div className={classes.modal}>
      <p>Estás seguro que deseas eliminar el Estudiante <b>{estudiante
        && estudiante
          .nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className={classes.root} style={{ marginTop: '20px', marginBottom: '30px' }}>

      <div className={classes.encabezado}>
        <motion.div animate={{ x: 100 }} transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h3" className={classes.titulo}  >Estudiantes</Typography></motion.div>

      </div>


      <Button className={classes.boton} onClick={() => abrirCerrarModalInsertar()}>Agregar Estudiante</Button>
      <br />
      <br />
      <hr />
      <Paper className={classes.root}>
        {/* Tabla de Practicas */}
        <TableContainer className={classes.container}>
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
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {/* Recorremos cada campo de una fila mostrando el dato respectivo */}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value === "button" ?
                            <div>
                              <Edit className={classes.iconos} onClick={() => seleccionarEstudiante(row, 'Editar')} />
                              &nbsp;&nbsp;&nbsp;
                              <Delete className={classes.iconos} onClick={() => seleccionarEstudiante(row, 'Eliminar')} />
                            </div>
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

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', width: '100%'}}>
          {hideLoader ? <CircularProgress style={{marginTop: '10px', marginBottom: '10px'}}/> : null}

        </div>

      </Paper>


      <Modal open={modalVerMas} onClose={abrirCerrarModalVerMas} aria-labelledby="form-dialog-title" >
        <div className={classes.modal}>
          <Typography variant="h5">CodigoCarrera: {estudiante.cod_carrera}</Typography>
          <Typography variant="h5">Sexo: {estudiante.sexo}</Typography>
          <Typography variant="h5">Fecha Nacimiento: {estudiante.fecha_nac}</Typography>
          <Typography variant="h5">Situacion Actual Periodo:{estudiante.sit_actual_periodo}</Typography>
          <Typography variant="h5">Nivel:{estudiante.nivel}</Typography>
          <Typography variant="h5">Nivel 99 Aprovado:{estudiante.nivel_99_aprobado}</Typography>

        </div>

      </Modal>

      <Dialog open={modalInsertar} onClose={abrirCerrarModalInsertar} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Nuevo Estudiante</DialogTitle>
        <DialogContent>
          {bodyInsertar}
        </DialogContent>
      </Dialog>

      <Dialog open={modalEditar} onClose={abrirCerrarModalEditar} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Estudiante</DialogTitle>
        <DialogContent>
          {bodyEditar}
        </DialogContent>
      </Dialog>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}