import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import funcionarios from '../../routers/assets/funcionarios.svg'
import { makeStyles } from '@material-ui/core/styles';
import {StyledTableCell, StyledTableRow} from './styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, Modal, Button, TextField, Typography} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import CachedIcon from '@material-ui/icons/Cached';
import Select from '@material-ui/core/Select';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { motion } from "framer-motion"

export default function Administrador() {
  
  const nombreRef = React.useRef('');
  const emailRef = React.useRef('');
  const tipoRef = React.useRef('');
  const contrasenaRef = React.useRef('');

  
  const classes = useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [arrayCarreras, setCarreras]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [showPassword, setShowPassword]=useState(false);
  const [administrador , setAdministrador ]=useState({
    nombre: "",
    apellido: "",
    correo: "",
    tipo: "",
    carrera: "",
    contrasena: "",
    carreras: []
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAdministrador (prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(administrador);
    console.log(typeof(administrador.apellido));
  }

  const peticionGet=async()=>{
    await axios.get('')
    .then(response=>{
      setData(response.data);
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
    
    if (modalInsertar == false) {
      generarPassUser();
    }
    getDocumentos();
    setShowPassword(!showPassword);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getCarreras"
    )
      .then(response => {
        let carreras = JSON.parse(response.data);
        setCarreras(carreras);

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }, []);
  
  // Funcion que se ocupa de insertar en el back un usuario
  function peticionPost () {

    let nombre = administrador.nombre;
    let apellido = administrador.apellido;
    let email = administrador.email;
    let tipo = administrador.tipo;
    let carrera = administrador.carrera;
    let password = administrador.contrasena;

    axios.post(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/insertUser",
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        tipo: tipo,
        password: password,
      },
    )
      .then(response => {

        console.log("respuesta: ", response.data);

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }

  // Funcion que se ocupa de traer las carreras desde el back
  function getDocumentos () {

    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getCarreras"
    )
      .then(response => {
        console.log("respuesta: ", response.data);
        arrayCarreras = JSON.parse(response.data);
        console.log("cascasda: ", arrayCarreras);
        //let respJson = JSON.parse(response.data);
        /*
        for(var i in response.data)
          arrayCarreras.push([i, response.data [i]]);
        */

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }

  useEffect(async()=>{
    await getDocumentos();
  },[])
  
function generarPassUser() {
  let randomPass = Math.random().toString(36).slice(-8);
  administrador.contrasena = randomPass;
  console.log(administrador.contrasena);
}

function handleValidation() {
  console.log(administrador.contrasena);
  let nombre = administrador.nombre;
  let apellido = administrador.apellido;
  let email = administrador.email;
  let tipo = administrador.tipo;
  let password = administrador.contrasena;

  let nuevoUserValidado = false; 

  if (nombre != "") {
    let regex = new RegExp("^[a-zA-Z]+$");
    if (regex.test(nombre)) {
      nuevoUserValidado = true;
    }
  }

  if (apellido != "") {
    let regex = new RegExp("^[a-zA-Z]+$");
    if (regex.test(nombre)) {
      nuevoUserValidado = true;
    }
  }

  if (email != "") {
    if (email.endsWith("@utalca.cl")){
      var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      console.log("UTAL");
      if (regex.test(email)){
        nuevoUserValidado = true;
        console.log("REGEX");
      }
    }
  }

  if (tipo != "") {
    if (tipo == "0" || tipo == "1") {
      nuevoUserValidado = true;
    }    
  }

  if (password != "") {
    nuevoUserValidado = true;
  }

  console.log(nuevoUserValidado);
  if (nuevoUserValidado == true){
    peticionPost();
  } else {
    console.log("Error validación");
  }

}

const bodyInsertar=(
  <div className={classes.modal}>
    
    <h3>Nuevo Administrador</h3>
    <br />
    
    <TextField variant="outlined" name="nombre" id="nombre" className={classes.inputMaterial} label="Nombre" onChange={handleChange}/>
    
    <TextField variant="outlined" name="apellido" id="apellido" className={classes.inputMaterial} label="Apellido" onChange={handleChange}/>

    <TextField variant="outlined" name="email" id="email" className={classes.inputMaterial} label="Mail" onChange={handleChange}/>
    <FormControl className={classes.inputMaterial} variant="outlined" >
                           <InputLabel id="demo-simple-select-outlined-label">Carrera</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={handleChange}
                            label="Carrera"
                          >
           { /*                 
                    arrayCarreras.map( (carrera) => (
                     
                            <MenuItem >{carrera.nombre}</MenuItem>
                       
                    ))
                    */}
         
             
                    
         </Select>
     </FormControl>
      
     

    <TextField variant="outlined" name="tipo" id="tipo" className={classes.inputMaterial} label="Tipo" onChange={handleChange}/>
    
    <FormControl className={classes.inputMaterial} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Contraseña"
            value={administrador.contrasena}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="change"
                  edge="end"
                  onClick={generarPassUser}
                >
                <CachedIcon/>
                </IconButton>
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
    </FormControl>
          

    <div align="right">
      <Button  className={classes.boton} color="primary" onClick={handleValidation}>Insertar</Button>
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
    <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
    <div className={classes.encabezado}>
      <motion.div   animate={{ scale: 4 }}   transition={{ duration: 0.5 }} > <img  heigth ={20} src={funcionarios} alt='funcionarios'/></motion.div>
      <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <h1 className={classes.titulo} >FUNCIONARIOS</h1></motion.div>
    </div>

    
     
    <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Funcionario</Button>
      <br /><br />
     <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <StyledTableCell>Nombre</StyledTableCell>
             <StyledTableCell>Correo</StyledTableCell>
             <StyledTableCell>Tipo</StyledTableCell>
             <StyledTableCell>Contrase&ntilde;a</StyledTableCell>
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
    </div>
    
  );
}