import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStyles from './styles';
import { Table, TableContainer, TableCell, TableHead, TableBody, TableRow, Modal, Button, TextField, Typography, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
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
import ReactExport from "react-export-excel";


export default function Administrador() {

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [arrayCarreras, setCarreras] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [carreraError,setcarreraError] = useState("")
  const [nombreError, setnombreError]= useState("");    
  const [apellidoError, setapellidoError]= useState("");
  const [correoError, setcorreoError]= useState("");
  const [tipoError, settipoError]= useState("");
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [administrador, setAdministrador] = useState({
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
    { id: 'nombre', label: 'Nombre', minWidth: "25%" },
    { id: 'apellido', label: 'Apellido', minWidth: "25%" },
    { id: 'correo', label: 'Correo', minWidth: "25%" },
    { id: 'tipo', label: 'Tipo', minWidth: "25%" },
    { id: 'contrasenia', label: 'Contraseña', minWidth: "25%" },
    { id: 'action', label: 'Acción', minWidth: "25%", },
  ];

  function createData(nombre, apellido, correo, tipo, contrasenia, action) {
    return { nombre, apellido, correo, tipo, contrasenia, action };
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setAdministrador(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(administrador);
  }

  const peticionGet = async () => {
    await axios.get('http://localhost/GestionPracticas_G4/ci-practicas-back/public/getFuncionarios')
      .then(response => {
        const resultado = response.data
        // console.log("antes:",rows)
        const lista = []
        for (var i = 0; i < resultado.length; i++) {
          const fila = createData(resultado[i].nombre, resultado[i].apellido, resultado[i].email, resultado[i].tipo, resultado[i].password, "button")
          // console.log(fila)
          lista.push(fila)
        }
        // console.log(lista)
        setRows(lista)
      }).catch(error => {
        console.log("Error catch: ", error)
      })
  }

  const peticionPut = async () => {
    await axios.put('' + administrador
      .id, administrador
    )
      .then(response => {
        var dataNueva = rows;
        dataNueva.map(datoAdmi => {
          if (administrador
            .id === datoAdmi.id) {
            administrador.nombre = datoAdmi
              .nombre;
            administrador.apellido = datoAdmi
              .apellido;
            administrador.correo = datoAdmi
              .correo;
            administrador.tipo = datoAdmi
              .tipo;
            administrador.contrasenia = datoAdmi
              .contrasenia;
          }
        })
        setRows(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete('' + administrador
      .id)
      .then(response => {
        setRows(rows.filter(consola => consola.id !== administrador
          .id));
        abrirCerrarModalEliminar();
      })
  }

  const abrirCerrarModalInsertar = () => {

    if (modalInsertar == false) {
      generarPassUser();
    }
    getDocumentos();
    setShowPassword(!showPassword);
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarAdministrador = (administrador, caso) => {
    setAdministrador(administrador);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Funcion que se ocupa de insertar en el back un usuario
  function peticionPost() {

    let nombre = administrador.nombre
    let apellido = administrador.apellido
    let email = administrador.email
    let carrera = administrador.carrera
    let tipo = administrador.tipo
    let password = administrador.contrasena
    console.log(nombre, "/", apellido, "/", email, "/", carrera, "/", tipo, "/", password)



    // axios.post(
    //   "http://localhost/GestionPracticas_G4/ci-practicas-back/public/insertUser",
    //   {
    //     nombre: nombre,
    //     apellido: apellido,
    //     email: email,
    //     tipo: tipo,
    //     password: password,
    //   },
    // )
    //   .then(response => {

    //     console.log("respuesta: ", response.data);

    //   })
    //   .catch(error => {
    //     console.log("login error: ", error);
    //   });
  }

  // Funcion que se ocupa de traer las carreras desde el back
  function getDocumentos() {

    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getCarreras"
    ).then(response => {
      console.log("respuesta: ", response.data)
      administrador.carreras = response.data
      console.log(administrador.carreras)
    })
      .catch(error => {
        console.log("login error: ", error)
      });
  }

  useEffect(async () => {
    await peticionGet()
    await getDocumentos()
  }, [])

  function generarPassUser() {
    let randomPass = Math.random().toString(36).slice(-8);
    administrador.contrasena = randomPass;
    console.log(administrador.contrasena);
  }

  function carreraValidation(){
    let carrera = administrador.carrera;
    const carreraErrorVal=[];
    let nuevoUserValidado = true;

    if(carrera === '' ){
      console.log(" lenght es igual a 0 ")
      carreraErrorVal.nombreRequiered ="Debes ingresar la carrera";
      nuevoUserValidado = false;
      console.log("debes ingreasr tu practica")
      setcarreraError(carreraErrorVal);
      return nuevoUserValidado;
    }
    else{
        console.log("seleccionaste una carrera")
        carreraErrorVal.nombreCorrecto = "";
        setcarreraError(carreraErrorVal);
        return nuevoUserValidado;
    }      
  }

  function nombreValidation(){
    let nombre = administrador.nombre;
    const nombreErrorVal =[]; 
    let nuevoUserValidado = true;

    if (nombre !== "") {
      let regex = new RegExp("^[a-zA-Z]+$");
      if (regex.test(nombre)) {
        nuevoUserValidado = true
        nombreErrorVal.noValido = ""
        setnombreError(nombreErrorVal);
        return nuevoUserValidado;
      }
    }
    else if (nombre.length === '0'){
      nombreErrorVal.noValido = "No ha ingresado el nombre"
      setnombreError(nombreErrorVal);
      nuevoUserValidado = false;
      return nuevoUserValidado;
    }
  }

  function apellidoValidation(){
    let apellido = administrador.apellido;
    const apellidoErrorVal =[]; 
    let nuevoUserValidado = true;

    if (apellido !== "") {
      let regex = new RegExp("^[a-zA-Z]+$");
      if (regex.test(apellido)) {
        if(apellido.length < '8'){
          apellidoErrorVal.noValido = "El apellido es muy corto"
          setapellidoError(apellidoErrorVal);
          nuevoUserValidado = false;
          return nuevoUserValidado;
        }
        else if(apellido.lenght > '30'){
          apellidoErrorVal.noValido = "El apellido es muy largo"
          setapellidoError(apellidoErrorVal);
          nuevoUserValidado = false;
          return nuevoUserValidado;

        }
        else{
          nuevoUserValidado = true;
          apellidoErrorVal.Valido = ""
          setapellidoError(apellidoErrorVal);
          return nuevoUserValidado;
        }
        
      }
      else if(apellido.lenght === '0'){
        apellidoErrorVal.noValido = "No ha ingresado el apellido"
        setapellidoError(apellidoErrorVal);
        nuevoUserValidado = false;
        return nuevoUserValidado;
      }
    }
  }
  function correoValidation(){
    let email = administrador.correo;
    const correoErrorVal =[]; 
    let nuevoUserValidado = true;

    if (email !== "") {
      if (email.endsWith("@utalca.cl")) {
          nuevoUserValidado = true;
          
          correoErrorVal.Valido = ""
          setcorreoError(correoErrorVal);
          nuevoUserValidado = true;
          return nuevoUserValidado;
        
      }
    }
    else if(email.lenght ==='0'){
      correoErrorVal.noValido = "No ha ingresado el email"
      setcorreoError(correoErrorVal);
      nuevoUserValidado = false;
      return nuevoUserValidado;
    
    }
  }

  function tipoValidation(){
    let tipo = administrador.tipo;
    const tipoErrorVal =[]; 
    let nuevoUserValidado = true;

    if (tipo !== "") {
      if (tipo === "Jefe de Escuela") {
        nuevoUserValidado = true;
        tipoErrorVal.noValido = ""
        settipoError(tipoErrorVal);
        return nuevoUserValidado;
        
      } else if (tipo === "Supervisor") {
        nuevoUserValidado = true;
        tipoErrorVal.noValido = ""
        settipoError(tipoErrorVal);
        return nuevoUserValidado;
        
      } else {
        tipoErrorVal.noValido = "No ha ingresado el tipo de usuario"
        settipoError(tipoErrorVal);
        nuevoUserValidado = false;
        return nuevoUserValidado;
    
      }

    
    
    }
  }  
  function handleValidation() {

    const carrVal = carreraValidation();
    const nomVal = nombreValidation();
    const apeVal = apellidoValidation();
    //const corrVal = correoValidation();
    const tipoVal = tipoValidation();  

    console.log(carrVal)
    console.log(nomVal)
    console.log(apeVal)
    //console.log(corrVal)
    console.log(tipoVal)
    


    if(carrVal === true && nomVal === true && apeVal === true  && tipoVal === true ){
      console.log("todos los campos son validos")
      setcarreraError("");
      setnombreError("");
      setapellidoError("");
      setcorreoError("");
      settipoError("");
      peticionPost();
      
    }
    else {
      console.log("Error validación");
    }

  }

  const bodyInsertar = (
    <div className={classes.modal}>

      <h3>Nuevo Administrador</h3>
      <br />

      <TextField variant="outlined" name="nombre" id="nombre" className={classes.inputMaterial} label="Nombre" onChange={handleChange} />
      {Object.keys(nombreError).map((key)=>{
              return <div style={{color:"red"}}>{nombreError[key] }</div>  
            })}

      <TextField variant="outlined" name="apellido" id="apellido" className={classes.inputMaterial} label="Apellido" onChange={handleChange} />
      {Object.keys(apellidoError).map((key)=>{
              return <div style={{color:"red"}}>{apellidoError[key] }</div>  
            })}

      <TextField variant="outlined" name="email" id="email" className={classes.inputMaterial} label="Email" onChange={handleChange} />
      {Object.keys(correoError).map((key)=>{
              return <div style={{color:"red"}}>{correoError[key] }</div>  
            })}

      <FormControl variant="outlined" fullWidth required className={classes.inputMaterial}>
          <InputLabel id="select-outlined-label">Carrera</InputLabel>
          <Select
            required
            labelId="select-outlined-label"
            id="select-outlined"
            name= "carrera"
            onChange={handleChange}
            label="Carrera"
          >

            <MenuItem value={'Ingenieria Civil en Computacion'}>Ingenieria Civil en Computacion</MenuItem>
            <MenuItem value={'Ingenieria Civil en Obras Civiles'}>Ingenieria Civil en Obras Civiles</MenuItem>
            <MenuItem value={'Ingenieria Civil en Mecanica'}>Ingenieria Civil en Mecanica</MenuItem>
            <MenuItem value={'Ingenieria Civil en Mecatronica'}>Ingenieria Civil en Mecatronica</MenuItem>
            <MenuItem value={'Ingenieria Civil Electrica'}>Ingenieria Civil Electrica</MenuItem>
            <MenuItem value={'Ingenieria Civil Industrial'}>Ingenieria Civil Industrial</MenuItem>
          </Select>

          {Object.keys(carreraError).map((key)=>{
              return <div style={{color:"red"}}>{carreraError[key] }</div>  
            })}

        </FormControl>
        
        

      <FormControl className={classes.inputMaterial} variant="outlined" >
        <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
        <Select
          name="tipo"
          id="tipo"
          onChange={handleChange}
          label="Tipo"
        >
          <MenuItem key={1} value={'Jefe de Escuela'}>Jefe de Escuela</MenuItem>
          <MenuItem key={2} value={'Supervisor'}>Supervisor</MenuItem>
        </Select>
      </FormControl>
      {Object.keys(tipoError).map((key)=>{
              return <div style={{color:"red"}}>{tipoError[key] }</div>  
            })}

      <FormControl className={classes.inputMaterial} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          label="Contraseña"
          value={administrador.contrasena}
          onChange={administrador.contrasena}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="change"
                edge="end"
                onClick={generarPassUser}
                
              >
                <CachedIcon />
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
        <Button className={classes.boton} color="primary" onClick={handleValidation}>Insertar</Button>
        <Button className={classes.botonCancelar} onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>

    </div>
  )

  const bodyEditar = (
    <div className={classes.modal}>
      <h3>Editar Administrador</h3>
      <TextField name="nombre" className={classes.inputMaterial} label="Nombre" onChange={handleChange} value={administrador
        && administrador
          .nombre} />
      <br />
      <TextField name="correo" className={classes.inputMaterial} label="Correo" onChange={handleChange} value={administrador
        && administrador
          .correo} />
      <br />
      <TextField name="tipo" className={classes.inputMaterial} label="Tipo" onChange={handleChange} value={administrador
        && administrador
          .tipo} />
      <br />
      <TextField name="contrasenia" className={classes.inputMaterial} label="Contrasenia" onChange={handleChange} value={administrador
        && administrador
          .contrasenia} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={classes.modal}>
      <p>Estás seguro que deseas eliminar el administrador <b>{administrador
        && administrador
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
        <motion.div animate={{ x: 100 }} transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h3" className={classes.titulo} >Funcionarios</Typography></motion.div>
      </div>

      <Button className={classes.boton} onClick={() => abrirCerrarModalInsertar()}>Agregar Funcionario</Button>
      <br /><br />
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
                              <Edit className={classes.iconos} onClick={() => seleccionarAdministrador(administrador, 'Editar')} />
                              &nbsp;&nbsp;&nbsp;
                              <Delete className={classes.iconos} onClick={() => seleccionarAdministrador(administrador, 'Eliminar')} />
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
        <br/>
        <div>
          <ExcelFile element={<Button style={{ marginTop: '20px', marginBottom: '30px', backgroundColor: '#344fa1', color: '#fff'}} >Export Usuarios</Button>} color="primary" filename="Export Estudiantes">
            <ExcelSheet data={rows} name="Administrador">
                <ExcelColumn label="Id_usuario" value="id_usuario"/>
                <ExcelColumn label="Nombre" value="nombre"/>
                <ExcelColumn label="Apellido" value="apellido"/>
                <ExcelColumn label="Email" value="email"/>
                <ExcelColumn label="Password" value="password"/>
                <ExcelColumn label="Tipo" value="tipo"/>                                      
                <ExcelColumn label="Permisos" value="permisos"/> 
                <ExcelColumn label="Estado" value="estado"/>  
                <ExcelColumn label="Ref_Carrera" value="refcarrera"/>
            </ExcelSheet>
          </ExcelFile>  
        </div>
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