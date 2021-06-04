import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import {StyledTableCell, StyledTableRow} from './styles';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal, TableCell, Paper} from '@material-ui/core';
import {Edit, Delete, Assignment} from '@material-ui/icons';
import FormAlumno from '../../FormAlumno/FormAlumno';


export default function Administrador() {
  const classes = useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modalVerMas, setModalVerMas]=useState(false);
  const [estudiante , setEstudiante ]=useState({
    nombre: '',
    correo_ins: '',
    correo_per: '',
    password: '',
    matricula: '',
    cod_carrera: '',
    rut: '',
    fecha_nac: '',
    plan: '',
    via_ingreso: '',
    anho_ingreso: '',
    sit_actual: '',
    sit_actual_anho: '',
    sit_actual_periodo: '',
    regular: '',
    comuna_origen: '',
    region: '',
    nivel: '',
    porc_avance: '',
    ult_punt_prio: '',
    al_dia: '',
    nivel_99_aprobado: ''
  })

  const peticionGet=async()=>{
    await axios.get('')
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async(estudiante)=>{
    console.log(estudiante)
    await axios.post('', estudiante
 )
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put('' +estudiante
 .id, estudiante
 )
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(estudiante
     .id===consola.id){
          consola.nombre=estudiante
     .nombre;
          consola.lanzamiento=estudiante
     .lanzamiento;
          consola.empresa=estudiante
     .empresa;
          consola.unidades_vendidas=estudiante
     .unidades_vendidas;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(''+estudiante
 .id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==estudiante
   .id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalVerMas=()=>{
    setModalVerMas(!modalVerMas);
  }

  const seleccionarEstudiante=(estudiante, caso)=>{
    setEstudiante (estudiante);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const seleccionarVerMas=(estudiante)=>{
    abrirCerrarModalVerMas();
    setEstudiante (estudiante);
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
      <div>
      <FormAlumno setEstudiante={setEstudiante} estudiante={estudiante}/>
      <DialogActions>
      <Button  className={classes.boton} style={{marginTop:'60px',margin: '35px'}} color="primary" 
      onClick={()=>peticionPost(estudiante)}>Agregar</Button>
      <Button className={classes.botonCancelar} style={{marginTop:'60px',margin: '35px'}} 
      onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </DialogActions>
        
      </div>
  )

  const bodyEditar=(
    <div >
      <FormAlumno setEstudiante={setEstudiante} estudiante={estudiante}/>

      <DialogActions>
      <Button className={classes.boton} color="primary" onClick={()=>peticionPut()}>Editar</Button>
      <Button className={classes.botonCancelar} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </DialogActions>     

    </div>
  )

  const bodyEliminar=(
    <div className={classes.modal}>
      <p>Estás seguro que deseas eliminar el Estudiante <b>{estudiante
  && estudiante
 .nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="animate__animated animate__fadeIn animate__faster" >
    <div style={{marginTop:'20px', marginBottom:'30px'}}>
    <h4 style={{marginBottom:'10px'}}>
            Admin &gt; Estudiantes
      </h4>
      <br />
      <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Estudiante</Button>
      <br /><br />
      <hr/>
      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell >Carrera</TableCell> 
                <TableCell >Matricula</TableCell>             
                <TableCell >Nombre Alumno</TableCell>     
                <TableCell >RUT</TableCell>   
                <TableCell >Correo</TableCell> 
                <TableCell >Plan</TableCell> 
                <TableCell >Ingreso</TableCell> 
                <TableCell >Comuna Origen</TableCell>
                <TableCell >Detalle</TableCell> 
                <TableCell >Acciones</TableCell>  
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(estudiante=>(
                <TableRow key={estudiante.name}> 
                  <TableCell component="th" scope="row"> 
                      {estudiante.carrera} 
                  </TableCell>                 
                  <TableCell >{estudiante.matricula}</TableCell> 
                  <TableCell >{estudiante.nombre}</TableCell> 
                  <TableCell >{estudiante.rut}</TableCell>                 
                  <TableCell >{estudiante.correo_ins}</TableCell>                 
                  <TableCell >{estudiante.plan}</TableCell> 
                  <TableCell >{estudiante.anho_ingreso}</TableCell>                 
                  <TableCell >{estudiante.comuna_origen}</TableCell> 
                  <TableCell>
                    <Assignment className={classes.iconos} onClick={()=>seleccionarVerMas(estudiante)}/>
                  </TableCell>
                  <TableCell>
                    <Edit className={classes.iconos} onClick={()=>seleccionarEstudiante(estudiante, 'Editar')}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={classes.iconos} onClick={()=>seleccionarEstudiante(estudiante, 'Eliminar')}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      

      <Modal open={modalVerMas}   onClose={abrirCerrarModalVerMas} aria-labelledby="form-dialog-title" >        
          <div className={classes.modal}>          
          <Typography variant="h5">CodigoCarrera: {estudiante.cod_carrera}</Typography> 
          <Typography variant="h5">Correo Personal: {estudiante.correo_pers}</Typography> 
          <Typography variant="h5">Sexo: {estudiante.sexo}</Typography> 
          <Typography variant="h5">Fecha Nacimiento: {estudiante.fecha_nac}</Typography> 
          <Typography variant="h5">Via Ingreso: {estudiante.via_ingreso}</Typography> 
          <Typography variant="h5">Situacion Actual: {estudiante.sit_actual}</Typography> 
          <Typography variant="h5">Situacion Actual Anio: {estudiante.sit_actual_anho}</Typography> 
          <Typography variant="h5">Situacion Actual Periodo:{estudiante.sit_actual_periodo}</Typography> 
          <Typography variant="h5">Periodo: {estudiante.periodo}</Typography> 
          <Typography variant="h5">Region: {estudiante.region}</Typography> 
          <Typography variant="h5">Regular: {estudiante.regular}</Typography> 
          <Typography variant="h5">Nivel: {estudiante.nivel}</Typography> 
          <Typography variant="h5">Porcentaje Avance: {estudiante.porc_avance}</Typography> 
          <Typography variant="h5">Ultimo Puntaje Prioridad: {estudiante.ult_punt_prio}</Typography> 
          <Typography variant="h5">Al Dia: {estudiante.al_dia}</Typography> 
          <Typography variant="h5">Nivel 99 Aprobado: {estudiante.nivel_99_aprobado}</Typography>

          <div align="right">
            <Button onClick={()=>abrirCerrarModalVerMas()}>Cerrar</Button>
          </div>

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
     
    </div>
  );
}