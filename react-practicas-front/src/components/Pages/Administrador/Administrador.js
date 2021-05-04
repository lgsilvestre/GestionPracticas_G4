import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import {StyledTableCell, StyledTableRow} from './styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

export default function Administrador() {
  const classes = useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [administrador , setAdministrador ]=useState({
    nombre: '',
    correo:'',
    tipo: '',
    contrasena: '',
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAdministrador (prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(administrador
 );
  }

  const peticionGet=async()=>{
    await axios.get('')
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post('', administrador
 )
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put('' +administrador
 .id, administrador
 )
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(datoAdmi=>{
        if(administrador
     .id===datoAdmi.id){
      administrador.nombre=datoAdmi
     .nombre;
      administrador.correo=datoAdmi
     .correo;
      administrador.tipo=datoAdmi
     .tipo;
      administrador.contrasenia=datoAdmi
     .contrasenia;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(''+administrador
 .id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==administrador
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

  const seleccionarAdministrador=(administrador, caso)=>{
    setAdministrador (administrador);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={classes.modal}>
      <h3>Nuevo Administrador</h3>
      <br />
      <TextField variant="outlined" name="nombre" className={classes.inputMaterial} label="Nombre" onChange={handleChange}/>

      <TextField variant="outlined" name="correo" className={classes.inputMaterial} label="Correo" onChange={handleChange}/>

      <TextField variant="outlined" name="tipo" className={classes.inputMaterial} label="Tipo" onChange={handleChange}/>

      <TextField variant="outlined" name="contrasena" className={classes.inputMaterial} label="Contrasena" onChange={handleChange}/>

      <div align="right">
        <Button  className={classes.boton} color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button className={classes.botonCancelar} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={classes.modal}>
      <h3>Editar Administrador</h3>
      <TextField name="nombre" className={classes.inputMaterial} label="Nombre" onChange={handleChange} value={administrador
    && administrador
   .nombre}/>
      <br />
      <TextField name="correo" className={classes.inputMaterial} label="Correo" onChange={handleChange} value={administrador
    && administrador
   .correo}/>
      <br />
      <TextField name="tipo" className={classes.inputMaterial} label="Tipo" onChange={handleChange} value={administrador
    && administrador
   .tipo}/>
      <br />
      <TextField name="contrasenia" className={classes.inputMaterial} label="Contrasenia" onChange={handleChange} value={administrador
    && administrador
   .contrasenia}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={classes.modal}>
      <p>Estás seguro que deseas eliminar el administrador <b>{administrador
  && administrador
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
    <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Administrador</Button>
      <br /><br />
     <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <StyledTableCell>Nombre</StyledTableCell>
             <StyledTableCell>Correo</StyledTableCell>
             <StyledTableCell>Tipo</StyledTableCell>
             <StyledTableCell>Contrasenia </StyledTableCell>
             <StyledTableCell>Acciones</StyledTableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(administrador=>(
             <StyledTableRow key={administrador.id}>
               <StyledTableCell>{administrador.nombre}</StyledTableCell>
               <StyledTableCell>{administrador.correo}</StyledTableCell>
               <StyledTableCell>{administrador.tipo}</StyledTableCell>
               <StyledTableCell>{administrador.contrasenia}</StyledTableCell>
               <StyledTableCell>
                 <Edit className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Eliminar')}/>
                 </StyledTableCell>
             </StyledTableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}