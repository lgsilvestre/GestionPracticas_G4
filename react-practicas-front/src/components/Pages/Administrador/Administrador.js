import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import {Table, TableContainer, TableCell, TableHead, TableBody, TableRow, Modal, Button, TextField, Typography, Paper} from '@material-ui/core';
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
import { motion } from "framer-motion";

export default function Administrador() {
  
  const classes = useStyles();
  const [rows, setRows] = useState([]);
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

   // Columnas para la tabla de estados
   const columns = [
    { id: 'nombre', label: 'Funcionario', minWidth: "25%" },
    { id: 'correo', label: 'Correo', minWidth: "25%" },
    { id: 'tipo', label: 'Tipo', minWidth: "25%" },
    { id: 'contrasenia', label: 'Contraseña', minWidth: "25%" },
    { id: 'action', label: 'Acción',  minWidth: "25%",  },
  ];

  function createData(nombre, correo, tipo, contrasenia, action) {
    return {nombre, correo, tipo, contrasenia, action };
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setAdministrador (prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(administrador);
  }

  const peticionGet=async()=>{
    await axios.get('')
    .then(response=>{
      const resultado = response.data;
      // console.log("antes:",rows)
      const lista = []
      for(var i=0; i<resultado.length; i++){
        const fila = createData(resultado[i].nombre , resultado[i].correo , resultado[i].tipo,resultado[i].contrasenia,"button")
        // console.log(fila)
        lista.push(fila)
      }  
      // console.log(lista)
      setRows(lista)
    })
  }

  const peticionPut=async()=>{
    await axios.put('' +administrador
 .id, administrador
 )
    .then(response=>{
      var dataNueva=rows;
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
      setRows(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(''+administrador
 .id)
    .then(response=>{
      setRows(rows.filter(consola=>consola.id!==administrador
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
        console.log("respuesta: ", response.data)
        administrador.carreras = response.data
        console.log(administrador.carreras)
      })
      .catch(error => {
        console.log("login error: ", error)
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
      nuevoUserValidado = true
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
                    {administrador.carreras.map((carrera) => (
                       <MenuItem>{carrera}</MenuItem>
                    ))}           
                    
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
      <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h2" className={classes.titulo} >Funcionarios</Typography></motion.div>
    </div>

    
     
    <Button className={classes.boton} onClick={()=>abrirCerrarModalInsertar()}>Agregar Funcionario</Button>
      <br /><br />
      <hr/> 
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
                      {value ==="button" ? 
                      <div>
                      <Edit className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Editar')}/>
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={classes.iconos} onClick={()=>seleccionarAdministrador(administrador, 'Eliminar')}/>
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
    
  );
}