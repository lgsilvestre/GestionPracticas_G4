import React, { useEffect, useState } from 'react'
import { 
    Box,
    Grid,  
    IconButton,  
    List,  
    ListItem,  
    ListItemIcon,  
    ListItemSecondaryAction,  
    makeStyles,
    Button
    } from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import {Collapse, Input,CustomInput } from 'reactstrap';
import { GoCheck } from "react-icons/go";
import { GoCircleSlash } from "react-icons/go";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import {useForm} from 'react-hook-form';
import { regiones } from '../../../../../../api/regiones';

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
    filebox:{
        minWidth:"450px",
        maxWidth:"450px"
    },
    icon:{
        width:"30px", 
        height:"30px"
    },
    boxBotones:{
      marginTop:'10px', 
      marginBottom:'30px', 
      borderRadius:'20px', 
      backgroundColor:'#fafafa',
      justifyContent:"center"
    },
    boton:{
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
export const InscripcionAdmin = ({nroMatricula, nroPractica, nextPage, idAlumno}) => {
    const {register, handleSubmit} = useForm()
    const [idDocCancelado, setIdDocCancelado] = useState(0)
    const [isOpen, setisOpen] = useState(false)
    const [mostrarAlertaInfo, setmostrarAlertaInfo] = useState(true)
    const [mostrarAlertaDoc, setmostrarAlertaDoc] = useState(true)
    const clasesEstilo = useStyles();
    const [dataInscripcion, setDataInscripcion] = useState({})
    const [docsInscripcion, setDocsInscripcion] = useState([])
    const [mostrarAlertaCursar, setMostrarAlertaCursar] = useState(false)
    const [archivo, setArchivo] = useState()
    const handleCancelDoc = (id) => {
      setIdDocCancelado(id)
      setisOpen(!isOpen)
    }
    const confirmarInscipcion= () =>{  
       axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/aceptarInscripcion",{
        matricula:nroMatricula,
        numero:nroPractica,
        id_alumno:idAlumno
      }
      ).then(response =>{
        //TRUE 1 PRACTICA AGREGADA CORRECTAMENTE -> CAMBIAR ETAPA A INSCRIPCION
        console.log("respuesta enviar info solicitud: ",response.data)
        if(response.data===1){
          setMostrarAlertaCursar(true)
        }
      }
      )
      .catch(error => {

        console.log("Error: ", error)
      });
    }
    const handleAceptarInscripcion = () =>{
      console.log("ACEPTANDO PRACTICA")
      confirmarInscipcion() 
    }
    //rut_empresa, email_supervisor,telefono_supervisor,region,comuna,nombre_contacto,telefono_contacto
    const getInfoInscripcion = async () => {
      console.log(regiones[8].region)
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getDatosInscripcionAlumno",{
        matricula:nroMatricula,
        numero:nroPractica,
        id_alumno:idAlumno
      })
      .then(response=>{
        var data = response.data[0]
        var region = regiones[parseInt(data.region)].region
        console.log("respuesta info inscripcion: ",data)
        data.region=region
        if(response.data[0].empresa.length>0){
          setmostrarAlertaInfo(false)
        }   
        setDataInscripcion(data)
      })
      .catch(error=>{
        console.log("Error: ", error)
      })
    }
    const getDocsInscripcion = async() => {
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getInstDocuAlumnoRequerido",{
        matricula:nroMatricula,
        numero:nroPractica,
        id_alumno:idAlumno
      })
      .then(response=>{
        console.log(response.data)
        if(response.data.length>0){
          setmostrarAlertaDoc(false)
        }      
        setDocsInscripcion(response.data)
      })
      .catch(error=>{
        console.log("Error: ", error)
      })
    }
    const guardarArchivo = (data) => {
      console.log(data)
      let formData = new FormData()
      console.log(archivo[0])
      formData.append("file",archivo[0])
      console.log("ENVIANDO: ",formData)
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/recibirArchivo",formData,    
        {headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response=>console.log("Respuesta subir file: ",response.data))
      .catch(error=>{
        console.log("Error: ", error)
      })  
    }
    const handleChangeFile = (e) => {
      setArchivo(e.target.files)
    }
    
    useEffect(() => {
      // console.log("ALUMNO ACTUAAAL:", cookies.get('alumnoactual'))
      console.log("ID ALUMNO", idAlumno)
      getInfoInscripcion()
      getDocsInscripcion()
    }, [])    

    return (
      <div className="animate__animated animate__fadeIn animate__faster">       
          {
            mostrarAlertaInfo && (
              <Alert severity="info">
                  A la espera de que el alumno suba la información correspondiente a su práctica.
              </Alert>        
            )
          }
          {
            mostrarAlertaCursar && (
              <Alert severity="success">
                  Has aprobado satisfactoriamente esta etapa de inscripción. Ahora, debes esperar a que el alumno descargue su seguro de práctica
                  y continue hacia la etapa de Cursando.
              </Alert>
            )
          }  
          {/*Datos de Empresa  */}
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Práctica</h4>
            <hr/>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >    
              <Grid item xs>
                  <Box className={clasesEstilo.box}>
                      <Box fontWeight="fontWeightMedium">
                          Fecha de Inicio:
                      </Box>
                      <Box>
                          {dataInscripcion.fecha_inicio}
                      </Box>
                  </Box> 
              </Grid>
              <Grid item xs >
                  <Box className={clasesEstilo.box}>
                      <Box fontWeight="fontWeightMedium">
                          Fecha de Término:
                      </Box>
                      <Box>
                          {dataInscripcion.fecha_termino}
                      </Box>
                  </Box>
              </Grid>                                               
            </Grid>
          </Box>  
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Empresa</h4>
            <hr/>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
              <Grid item xs>
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                    Nombre de Empresa:
                  </Box>
                  <Box>
                    {dataInscripcion.empresa}
                  </Box>
                </Box> 
              </Grid>
              <Grid item xs >
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                    Rut de Empresa:
                  </Box>
                  <Box>
                    {dataInscripcion.rut_empresa}
                  </Box>
                </Box>
              </Grid>                                               
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
              <Grid item xs>
                  <Box className={clasesEstilo.box}>
                      <Box fontWeight="fontWeightMedium">
                          Nombre del Supervisor:
                      </Box>
                      <Box>
                          {dataInscripcion.supervisor}
                      </Box>
                  </Box> 
              </Grid>
              <Grid item xs >
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                    Correo del Supervisor:
                  </Box>
                  <Box>
                    {dataInscripcion.email_supervisor}
                  </Box>
                </Box>
              </Grid>                                               
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
              <Grid item xs>
                  <Box className={clasesEstilo.box}>
                      <Box fontWeight="fontWeightMedium">
                          Teléfono del Supervisor:
                      </Box>
                      <Box>
                          {dataInscripcion.telefono_supervisor}
                      </Box>
                  </Box> 
              </Grid>                                              
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
              <Grid item xs>
                  <Box className={clasesEstilo.box}>
                      <Box fontWeight="fontWeightMedium">
                          Ubicación (Región o Internacional):
                      </Box>
                      <Box>
                        {dataInscripcion.region}
                      </Box>
                  </Box> 
              </Grid>
              <Grid item xs >
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                  Ubicación (Comuna o País):
                  </Box>
                  <Box>
                    {dataInscripcion.comuna}
                  </Box>
                </Box>
              </Grid>                                               
            </Grid>
          </Box> 
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos de Emergencia</h4>
            <hr/>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
              <Grid item xs>
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                    Nombre Contacto:
                  </Box>
                  <Box>
                    {dataInscripcion.nombre_contacto}
                  </Box>
                </Box> 
              </Grid>
              <Grid item xs >
                <Box className={clasesEstilo.box}>
                  <Box fontWeight="fontWeightMedium">
                    Teléfono Contacto:
                  </Box>
                  <Box>
                    {dataInscripcion.telefono_contacto}
                  </Box>
                </Box>
              </Grid>                                               
            </Grid>
          </Box>
          {
            mostrarAlertaDoc && (
              <Alert severity="info">
                  A la espera de que el alumno suba los documentos requeridos por su escuela.
              </Alert>                
            )
          }  
          {/* Archivos */}
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Documentos Subidos</h4>
            <hr/>                          
            <List>
              {docsInscripcion.map( (file,index) => (
                <div key={index} className="container">
                  <div className="row">
                    <ListItem>
                      <div className="col-sm-auto">
                        <ListItemIcon style={{color:'#f69b2e'}}>
                          <VscFilePdf className={clasesEstilo.icon}/>
                        </ListItemIcon>
                      </div>
                      <div className="col-sm">                           
                          {file.nombre}                                                           
                      </div>
                      <div className="col-sm-auto" style={{minWidth:"200px"}}>
                        <ListItemSecondaryAction>                         
                          <IconButton  style={{color:'#f69b2e'}}>
                            <MdFileDownload />
                          </IconButton>                                                 
                          <IconButton  >
                            <FcCheckmark />
                          </IconButton>                                                 
                          <IconButton  onClick={() => handleCancelDoc(file.id_instancia_documento)} >
                            <FcCancel />
                          </IconButton>                           
                        </ListItemSecondaryAction>                                                                
                      </div>                       
                    </ListItem>
                  </div>
                  <div className="row">
                    <ListItem> 
                      <div className="col">
                        <Collapse isOpen={isOpen}>
                          {idDocCancelado === file.id_instancia_documento 
                          &&                    
                          (      
                          <div className="row">
                            <div className="col">
                              <Input                                                    
                              placeholder="Ingrese retroalimentación..."                                
                              type="textarea" 
                              invalid="true"                              
                              />  
                            </div>
                            <div className="col">
                              <Button className={clasesEstilo.boton}>
                                Guardar
                              </Button>                               
                            </div>
                            </div>
                            
                          ) 
                          }                  
                          
                        </Collapse>                                                         
                      </div>                                             
                    </ListItem>                   
                  </div>                                                               
                </div>
                
              ))}
            </List>            
                            
          </Box>
          {/* SEGURO DE PRACTICA */}
          <Alert severity="warning">
            <strong>IMPORTANTE:</strong> Debes subir el seguro del alumno antes de aceptar la Inscripción.
          </Alert>
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Subir Seguro de Práctica</h4>
            <hr/>  
            <div className="row justify-content-center" >
              <form onSubmit={handleSubmit(guardarArchivo)}>
                <div className="col-6" style={{marginBottom:16}} >
                  <CustomInput    
                    ref={register}      
                    type="file" 
                    name="seguroPractica"
                    onChange={(e)=>handleChangeFile(e)}
                    id= "seguroPractica"
                    label="Suba el seguro"                                     
                  />               
                </div>
                <div className="col">
                  <Button type="submit">Guardar</Button>
                </div>
              </form>
            </div>
          </Box>
          {/* BOX BOTONES ACEPTAR/RECHAZAR */}
          <Box className={clasesEstilo.boxBotones} display="flex" boxShadow={1}>
          <div style={{padding:"30px"}}>
            <Button className={clasesEstilo.boton} startIcon={<GoCheck/>} onClick={handleAceptarInscripcion} >
              Aceptar
            </Button>
            <Button className={clasesEstilo.botonRechazo} startIcon={<GoCircleSlash/>} >
              Rechazar
            </Button>
          </div>       
          </Box>
        </div>
        
    )
}
