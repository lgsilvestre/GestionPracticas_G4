import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import {StyledTableCell, StyledTableRow} from './styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import FormAlumno from '../../FormAlumno/FormAlumno';



export default function Administrador() {
  const classes = useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

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

  const seleccionarEstudiante=(consola, caso)=>{
    setEstudiante (consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
      <div>
      <FormAlumno setEstudiante={setEstudiante} estudiante={estudiante}/>
      <DialogActions>
      <Button  className={classes.boton} color="primary" onClick={()=>peticionPost(estudiante)}>Agregar</Button>
      <Button className={classes.botonCancelar} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
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
    <div className={classes.root}>
      <br />
    <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Estudiante</Button>
      <br /><br />
     <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
           <StyledTableCell >Carrera</StyledTableCell> 
            <StyledTableCell  >Codigo Carrera</StyledTableCell> 
            <StyledTableCell >Matricula</StyledTableCell>             
            <StyledTableCell >Nombre Alumno</StyledTableCell>     
            <StyledTableCell >RUT</StyledTableCell>   
            <StyledTableCell >Correo</StyledTableCell> 
            <StyledTableCell >Correo Personal</StyledTableCell> 
            <StyledTableCell >Sexo</StyledTableCell> 
            <StyledTableCell >Fecha Nacimiento</StyledTableCell> 
            <StyledTableCell >Plan</StyledTableCell> 
            <StyledTableCell >Ingreso</StyledTableCell> 
            <StyledTableCell >Via Ingreso</StyledTableCell> 
            <StyledTableCell >Situacion Actual</StyledTableCell> 
            <StyledTableCell >Sit Actual Anio</StyledTableCell> 
            <StyledTableCell >Sit Actual Periodo</StyledTableCell> 
            <StyledTableCell >Periodo</StyledTableCell> 
            <StyledTableCell >Comuna Origen</StyledTableCell> 
            <StyledTableCell >Region</StyledTableCell> 
            <StyledTableCell >Regular</StyledTableCell> 
            <StyledTableCell >Nivel</StyledTableCell> 
            <StyledTableCell >Porcentaje</StyledTableCell> 
            <StyledTableCell >Ult Punt Prio</StyledTableCell> 
            <StyledTableCell >Al Dia</StyledTableCell> 
            <StyledTableCell >Nivel 99</StyledTableCell> 
            <StyledTableCell>Acciones</StyledTableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(estudiante=>(
             <StyledTableRow key={estudiante.name}> 
                <StyledTableCell component="th" scope="row"> 
                    {estudiante.carrera} 
                </StyledTableCell> 
            
                <StyledTableCell >{estudiante.cod_carrera}</StyledTableCell> 
                <StyledTableCell >{estudiante.matricula}</StyledTableCell> 
                <StyledTableCell >{estudiante.nombre}</StyledTableCell> 
                <StyledTableCell >{estudiante.rut}</StyledTableCell>                 
                <StyledTableCell >{estudiante.correo_ins}</StyledTableCell> 
                <StyledTableCell >{estudiante.correo_pers}</StyledTableCell> 
                <StyledTableCell >{estudiante.sexo}</StyledTableCell> 
                <StyledTableCell >{estudiante.fecha_nac}</StyledTableCell> 
                <StyledTableCell >{estudiante.plan}</StyledTableCell> 
                <StyledTableCell >{estudiante.anho_ingreso}</StyledTableCell> 
                <StyledTableCell >{estudiante.via_ingreso}</StyledTableCell> 
                <StyledTableCell >{estudiante.sit_actual}</StyledTableCell> 
                <StyledTableCell >{estudiante.sit_actual_anho}</StyledTableCell> 
                <StyledTableCell >{estudiante.sit_actual_periodo}</StyledTableCell> 
                <StyledTableCell >{estudiante.periodo}</StyledTableCell> 
                <StyledTableCell >{estudiante.comuna_origen}</StyledTableCell> 
                <StyledTableCell >{estudiante.region}</StyledTableCell> 
                <StyledTableCell >{estudiante.regular}</StyledTableCell> 
                <StyledTableCell >{estudiante.nivel}</StyledTableCell> 
                <StyledTableCell >{estudiante.porc_avance}</StyledTableCell> 
                <StyledTableCell >{estudiante.ult_punt_prio}</StyledTableCell> 
                <StyledTableCell >{estudiante.al_dia}</StyledTableCell> 
                <StyledTableCell >{estudiante.nivel_99_aprobado}</StyledTableCell> 
               <StyledTableCell>
                 <Edit className={classes.iconos} onClick={()=>seleccionarEstudiante(estudiante, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={classes.iconos} onClick={()=>seleccionarEstudiante(estudiante, 'Eliminar')}/>
                 </StyledTableCell>
             </StyledTableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     
      <Dialog open={modalInsertar} onClose={abrirCerrarModalInsertar} aria-labelledby="form-dialog-title">
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