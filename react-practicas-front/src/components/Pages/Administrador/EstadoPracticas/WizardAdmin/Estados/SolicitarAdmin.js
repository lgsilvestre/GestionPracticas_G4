import {Box,FormControl,Grid,IconButton,Input,
    List,ListItem,ListItemIcon,ListItemSecondaryAction,ListItemText,makeStyles, 
    NativeSelect, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { VscFilePdf } from 'react-icons/vsc';
import { GoCheck } from "react-icons/go";
import { GoCircleSlash } from "react-icons/go";
import { useForm } from '../../../../../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
    mainbox:{
        marginTop:'10px', 
        marginBottom:'30px', 
        borderRadius:'20px', 
        backgroundColor:'#fafafa'
    },
    box: {
        padding: theme.spacing(2),
        textAlign: "left"
    },
    formControl: {
        marginRight: theme.spacing(2),
        textAlign: "left",
        minWidth: 120,
    },
    botonAddDoc:{ 
        marginLeft:theme.spacing(1),
        color:"#f69b2e"
    },
    icon:{
        color:'#f69b2e',
        width:"30px", 
        height:"30px"
    },
    logosearch :{
        width:"25px", 
        height:"25px"
    },
    boxBotones:{
      marginTop:'10px', 
      marginBottom:'30px', 
      borderRadius:'20px', 
      backgroundColor:'#fafafa',
      justifyContent:"center"
    },
    botonAceptar:{
      marginRight:'10px',
      backgroundColor:"grey",
      color:"white",
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor:'#f69b2e',
          color: '#fff'
          }
    },
    botonRechazo:{
      backgroundColor:"grey",
      color:"white",
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor:'red',
          color: '#fff'
          }
    }
}));

export const SolicitarAdmin = ({nroMatricula, nroPractica, nextPage,idAlumno}) => {

    console.log("Solicitando alumno con: ",nroMatricula)

    console.log("Numero de practica: ", nroPractica)

    const [docs, setDocs] = useState([])

    const classes = useStyles();

    //Datos por defecto 
    const data = {
        nombre: "Camilo Villalobos",
        carrera: "Ingenieria Civil en Computacion",
        edad: "18 años",
        sexo: "Masculino",
        rut:"12345678-9",
        matricula:"12345679",
    }

    const [dataEstudiante, setdataEstudiante] = useState(data)

    const [docSelect, setDocSelect] = useState('')

    const [mostrarAlerta, setmostrarAlerta] = useState(false)

    const [practicaAceptada, setpracticaAceptada] = useState(false)

    const [archivos, setArchivos] = useState([])

    const handleChangeDocSelect = (event) => {
      setDocSelect(event.target.value);
    };

    const handleAddDoc = () =>{
      const infoDocSelected = docs.find(doc => doc.nombre ===docSelect)
      console.log("VVALOR: ",infoDocSelected);
        if(!archivos.find(doc =>doc.nombre===docSelect)){
          if(docSelect!=''){
            setArchivos([...archivos, {
              nombre:docSelect,
              id_documento:infoDocSelected.id_documento,
              requerido:infoDocSelected.requerido
            }])
          }
        } else {  
          console.log("DOCUMENTO REPETIDO")
            //Alerta mismo documento
        }      
    }

    const [formValues, handleInputChange] = useForm({
        searchText:""
    })

    const {searchText} = formValues;

    const handleSearch = (e) =>{
        e.preventDefault()
        console.log("submit", searchText)
        if(searchText.length >0){
            const filteredDocs = docs.filter(doc => doc.nombre.includes(searchText));
            console.log(filteredDocs)
        }
    }

    const handleDeleteDoc= () =>{
    }

    const [administrador , setAdministrador ]=useState({
        nombre: "",
        apellido: "",
        correo: "",
        tipo: "",
        carrera: "",
        contrasena: "",
        carreras: []
    })

    const getDocumentos= () =>{
    
        axios.get(
            "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getDocumentos"
          )
            .then(response => {
              console.log("respuesta: ", response.data)
              setDocs(response.data)
            //   administrador.carreras = response.data
            //   console.log(administrador.carreras)
            })
            .catch(error => {
              console.log("Error: ", error)
        });

    }

    const enviarInformacionSolicitud = () =>{  
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/aceptarSolicitud",{
        documentos:archivos,
        matricula:nroMatricula,
        numero:nroPractica,
        idalumno:idAlumno
      }).then(response =>{
        //TRUE PRACTICA AGREGADA CORRECTAMENTE -> CAMBIAR ETAPA A INSCRIPCION
        console.log("respuesta enviar info solicitud: ",response.data)
        nextPage()
      })
      .catch(error => {
        //FALSE PRACTICA NO AGREGADA
        //MOSTRAR ALERTA
        console.log("Error: ", error)
      });
    }

    const infoLabelsEstudiante = ["Nombre:", "Carrera:", "Correo Institucional:", "Correo Personal:", "Rut:", "Matrícula:"]

    const handleAceptarPractica = () =>{
      enviarInformacionSolicitud()
    }

    const handleRechazarPractica = async () =>{
        await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/rechazarSolicitud",{
            params:{
                idalumno:idAlumno
            }
        })
        .then(response =>{
            console.log(response.data)
        })
    }

    useEffect(async() => {
        getDocumentos()
        await axios.get("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getAlumnoMatricula",{
            params:{
                matricula:nroMatricula
            }
        })
        .then(response =>{
            const datosEstudiante={
                nombre: response.data.nombre,
                carrera: response.data.nbe_carrera,
                correo_inst: response.data.correo_ins,
                correo_per: response.data.correo_per,
                rut: response.data.rut,
                matricula: response.data.matricula
            }
            setdataEstudiante(datosEstudiante)
            console.log(datosEstudiante)
        })
    }, [])

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            {
              mostrarAlerta && (
                practicaAceptada 
                ? <Alert severity="success">
                    Esta solicitud de práctica se encuentra <strong>Aceptada</strong>. A la espera del siguiente paso por parte del estudiante.
                </Alert>
                : <Alert severity="error">
                  Esta solicitud de practica se encuentra <strong>Rechazada</strong>.
                </Alert>       
              )
            }  
            
            
            {/* Datos de Estudiante */}
            <Box className={classes.mainbox} boxShadow={1}>
                <h4 style={{paddingTop:'20px', paddingLeft:'20px'}}>Datos Estudiante</h4>
                <hr/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[0]}
                            </Box>
                            <Box>
                                {dataEstudiante.nombre}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[1]}
                            </Box>
                            <Box>
                                {dataEstudiante.carrera}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">                    
                    <Grid item xs >
                        <Box  className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[2]}
                            </Box>
                            <Box>
                                {dataEstudiante.correo_inst}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[3]}
                            </Box>
                            <Box>
                                {dataEstudiante.correo_per}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">                    
                    <Grid item xs >
                        <Box  className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[4]}
                            </Box>
                            <Box>
                                {dataEstudiante.rut}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[5]}
                            </Box>
                            <Box>
                                {dataEstudiante.matricula}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
            </Box>   
            {/* Documentos */}
            <Box className={classes.mainbox} boxShadow={1}>
                <div style={{paddingTop:'20px', paddingLeft:'20px'}}>
                    <h4 >Documentos</h4>
                    <hr/>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item className={classes.formControl}  >
                            Filtrar por nombre:
                        </Grid>
                        {/* <Grid item>
                            <AiOutlineSearch className={classes.logosearch} />
                        </Grid>    */}
                        <Grid item>
                            <form onSubmit={handleSearch} noValidate autoComplete="off">
                                <Input name="searchText" placeholder="Documento" onChange={handleInputChange} />
                                {/* <TextField name="searchText" type="text" id="search" label="Documento" onChange={handleInputChange}  /> */}
                            </form>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item className={classes.formControl}  >
                            Elegir archivo:
                        </Grid>
                        <Grid item >
                            <FormControl >                 
                                <NativeSelect                            
                                    id="docSelect"
                                    value={docSelect}
                                    onChange={handleChangeDocSelect}
                                >     
                                    <option value=""> Ninguno </option>   
                                    {
                                        docs.map((doc, index)=> (
                                        <option key={index} value={doc.nombre}>{doc.nombre}</option>
                                    ))
                                    }                
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <IconButton  className = {classes.botonAddDoc} size="small" onClick={handleAddDoc}>
                                <IoMdAddCircle fontSize="40px"/>
                            </IconButton>
                        </Grid>                 
                    </Grid>
                    <hr/>     
                    <List>
                        {
                            archivos.map( (file,index) => (

                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <VscFilePdf className={classes.icon}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.nombre}
                                    />    
                                    <ListItemSecondaryAction>
                                        <Input type="file" name={`namefile${index}`} id={`file${index}`} /> 
                                        <IconButton onClick={handleDeleteDoc}>
                                            <MdDelete className={classes.icon}/>
                                        </IconButton>         
                                    </ListItemSecondaryAction>                                 

                                </ListItem>
                            ))
                        }
                    </List>                
                    
                </div>          
            </Box>
            <Box className={classes.boxBotones} display="flex" boxShadow={1}>
            <div style={{padding:"30px"}}>
              <Button className={classes.botonAceptar} startIcon={<GoCheck/>} onClick={handleAceptarPractica} >
                Aceptar
              </Button>
              <Button className={classes.botonRechazo} startIcon={<GoCircleSlash/>} onClick={handleRechazarPractica} >
                Rechazar
              </Button>
            </div>       
            </Box>
        </div>
    )
}
