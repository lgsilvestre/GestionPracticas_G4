import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';
import useStyles from './styles';
// import {StyledTableCell, StyledTableRow} from './styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal, Button, TextField, TableCell, Paper} from '@material-ui/core';
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

      <div>
        <Button className={classes.boton} style={{marginTop:'60px',margin: '35px'}} color="primary" 
          onClick={()=>peticionPost()}>Insertar</Button>
        <Button className={classes.botonCancelar} style={{marginTop:'60px',margin: '35px'}} 
          onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
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
    <div className="animate__animated animate__fadeIn animate__faster">
      <div style={{marginTop:'20px', marginBottom:'30px'}}>
        <h4 style={{marginBottom:'10px'}}>
          Admin &gt; Administradores
        </h4>
        <br />
        <Button className={classes.boton}  onClick={()=>abrirCerrarModalInsertar()}>Agregar Administrador</Button>
        <br /><br />
        <hr/>
        <Paper className={classes.root}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Contrasenia </TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map(administrador=>(
                  <TableRow key={administrador.id}>
                    <TableCell>{administrador.nombre}</TableCell>
                    <TableCell>{administrador.correo}</TableCell>
                    <TableCell>{administrador.tipo}</TableCell>
                    <TableCell>{administrador.contrasenia}</TableCell>
                    <TableCell>
                      <Edit className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Editar')}/>
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Eliminar')}/>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        

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
        
    </div>
  );
}