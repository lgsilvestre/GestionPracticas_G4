import React, {useEffect, useState} from 'react';
import axios from 'axios';
import estudiantes from '../../routers/assets/estudiantes.svg'
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import {StyledTableCell, StyledTableRow} from './styles';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal} from '@material-ui/core';
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
    password: '',
    matricula: '',
    cod_carrera: '',
    rut: '',
    fecha_nac: '',
    plan: '',
    anho_ingreso: '',
    sit_actual_periodo: '',
    nivel: '',
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
      <DialogActions className={classes.encabezado}>
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
    <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
        <div className={classes.encabezado}>
           <img  heigth ={20} src={estudiantes} alt='ESTUDIANTES'/>
           <h1 className={classes.titulo}  >ESTUDIANTES</h1>
         </div>
    <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Estudiante</Button>
      <br /><br />
    <Grow  in={true}  style={{ transformOrigin: '0 0 0' }}   {...(true ? { timeout: 1000 } : {})}    >
     <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
           <StyledTableCell >Carrera</StyledTableCell> 
            <StyledTableCell >Matricula</StyledTableCell>             
            <StyledTableCell >Nombre Alumno</StyledTableCell>     
            <StyledTableCell >RUT</StyledTableCell>   
            <StyledTableCell >Correo</StyledTableCell> 
            <StyledTableCell >Plan</StyledTableCell> 
            <StyledTableCell >Ingreso</StyledTableCell> 
            <StyledTableCell >Detalle</StyledTableCell> 
            <StyledTableCell >Acciones</StyledTableCell>  
          
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(estudiante=>(
             <StyledTableRow key={estudiante.name}> 
                <StyledTableCell component="th" scope="row"> 
                    {estudiante.carrera} 
                </StyledTableCell>                 
                <StyledTableCell >{estudiante.matricula}</StyledTableCell> 
                <StyledTableCell >{estudiante.nombre}</StyledTableCell> 
                <StyledTableCell >{estudiante.rut}</StyledTableCell>                 
                <StyledTableCell >{estudiante.correo_ins}</StyledTableCell>                 
                <StyledTableCell >{estudiante.plan}</StyledTableCell> 
                <StyledTableCell >{estudiante.anho_ingreso}</StyledTableCell>    
                 
                <StyledTableCell>
                 <Assignment className={classes.iconos} onClick={()=>seleccionarVerMas(estudiante)}/>
                </StyledTableCell>
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
     </Grow>

     <Modal open={modalVerMas}   onClose={abrirCerrarModalVerMas} aria-labelledby="form-dialog-title" >        
        <div className={classes.modal}>          
        <Typography variant="h5">CodigoCarrera: {estudiante.cod_carrera}</Typography> 
        <Typography variant="h5">Sexo: {estudiante.sexo}</Typography> 
        <Typography variant="h5">Fecha Nacimiento: {estudiante.fecha_nac}</Typography> 
        <Typography variant="h5">Situacion Actual Periodo:{estudiante.sit_actual_periodo}</Typography>
        <Typography variant="h5">Nivel:{estudiante.nivel}</Typography>
        <Typography variant="h5">Nivel 99 Aprovado:{estudiante.nivel_99_aprobado}</Typography>

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
  );
}