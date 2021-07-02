import React, { useCallback, useEffect, useState } from 'react'
import { 
    Box,
    Grid,  
    IconButton,  
    List,  
    ListItem,  
    ListItemIcon,  
    ListItemSecondaryAction,  
    makeStyles,
    Button,
    Divider
    } from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import {Collapse, Input,CustomInput } from 'reactstrap';
import { GoCircleSlash } from "react-icons/go";
import { BsPencilSquare } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
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
      backgroundColor:"#77C78F",
      color:"white",
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor:'#0DC143',
          color: '#fff'
          }
    },
    botonRechazo:{
      backgroundColor:"#FF7D7D",
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
    const [seguroSubido, setSeguroSubido] = useState(false)
    const [showRetroAli, setShowRetroAli] = useState(false)
    const [retroAli, setRetroAli] = useState("")
    const [rechazado, setRechazado] = useState(false)
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
        if(response.data!==false){
          setMostrarAlertaCursar(true)
          enviarCorreoConfirmacion(response.data)
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

    const enviarCorreoConfirmacion = (dato) => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/aceptarInscripcionCorreo",{ 
        idAlumno:idAlumno,
        id_alumno:dato
      }).then(response=>{
          console.log("Respuesta envio correo: ",response.data)
      }).catch(error=>{
          console.log("ERROR EN RECHAZO: ",error)
      })
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
      // console.log(data)
      let formData = new FormData()
      // console.log(archivo[0])
      //idalumno y nropractica
      formData.append("file",archivo[0])
      formData.append("id_alumno",idAlumno)
      formData.append("numero",nroPractica)
      console.log("ENVIANDO: ",formData)
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/recibirSeguro",
        formData,    
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
    const handleRechazarPractica = async() => {
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/handleRechazo",{ 
        idalumno:idAlumno,
        numero:nroPractica,
        etapa:"Inscripción",
        retroalimentacion: retroAli   
      }).then(response=>{
          console.log("Respuesta rechazo: ",response.data)
          if(response.data=1){
              setRechazado(true)
              // setExitoRechazo(true)
              enviarCorreoRechazo()
          }
      }).catch(error=>{
          console.log("ERROR EN RECHAZO: ",error)
      })
    }
    const enviarCorreoRechazo = () => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/handlerRechazarCorreo",{ 
          idalumno:idAlumno,
          etapa:"Solicitud"             
      }).then(response=>{
          console.log("Respuesta envio correo ins: ",response.data)
      }).catch(error=>{
          console.log("ERROR EN RECHAZO: ",error)
      })
  }
    const handleEscribirRetroAli = (event) => {
      // console.log("escribiendo", event.target.value)
      setRetroAli(event.target.value)
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
          {
              rechazado && (
                <Alert severity="success">
                  Se ha <strong>rechazado</strong> exitosamente esta etapa de inscripción. El alumno deberá corregir los aspectos en los que falló y
                  enviar nuevamente la información, por favor espere.
                </Alert>
              )
            }
          {/*Datos de Empresa  */}
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
          
            <div className="row align-items-center">
              <div className="col">
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Práctica</h4>
              </div>
              <div className="col-auto">
                <IconButton  >
                  <BsPencilSquare style={{margintop:"10vh"}}/>
                </IconButton>    
              </div>   
            </div>
          
            <Divider/>
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
            <div className="row align-items-center">
              <div className="col">
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Empresa</h4>
              </div>
              <div className="col-auto">
                <IconButton  >
                  <BsPencilSquare style={{margintop:"10vh"}}/>
                </IconButton>    
              </div>   
            </div>
            <Divider/>
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
            <div className="row align-items-center">
              <div className="col">
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos de Emergencia</h4>
              </div>
              <div className="col-auto">
                <IconButton  >
                  <BsPencilSquare style={{margintop:"10vh"}}/>
                </IconButton>    
              </div>   
            </div>
            <Divider/>
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
            <Divider/>                          
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
          {seguroSubido ?(              
              <Alert severity="success">
                Seguro subido! puedes continuar
              </Alert>              
              ):(
              <Alert severity="warning">
                <strong>IMPORTANTE:</strong> Debes subir el seguro del alumno antes de aceptar la Inscripción.
              </Alert>
              )}
          <Box className={clasesEstilo.mainbox} boxShadow={1}>
            <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Subir Seguro de Práctica</h4>
            <hr/>  
            <form onSubmit={handleSubmit(guardarArchivo)} style={{width:"100%"}}>
              <div className="row justify-content-center">
                <div className="col-6" style={{marginBottom:16}}>
                  <CustomInput 
                    ref={register}    
                    type="file" 
                    name="informeFinal"
                    onChange={(e)=>handleChangeFile(e)}
                    id= "informeFinal"
                    label="Click para subir archivo"                                     
                  />
                </div>
                <div className="col-auto">
                  <Button type="submit" className={clasesEstilo.boton}>
                    Guardar
                  </Button>
                  <Button className={clasesEstilo.botonRechazo}>
                    Eliminar
                  </Button>
                </div>         
              </div>
            </form>
          </Box>
          {/* BOX BOTONES ACEPTAR/RECHAZAR */}
          <Box className={clasesEstilo.boxBotones} display="flex" boxShadow={1}>
          <div className = "container" style={{padding:"30px"}}>
              <div className = "row justify-content-center" >
                <div className = "col-auto">
                    <Button disabled={showRetroAli} className={clasesEstilo.boton} startIcon={<GoCheck/>} onClick={handleAceptarInscripcion} >
                        Aceptar
                    </Button>
                </div>
                <div className= "col-auto">
                    <Button disabled={showRetroAli} className={clasesEstilo.botonRechazo} startIcon={<GoCircleSlash/>} onClick = {() => {setShowRetroAli(true)}}  >
                        Rechazar
                    </Button>
                </div>    
              </div>
              {
                showRetroAli && (
                <Collapse isOpen={true} style={{marginTop:"3vh"}}>   
                    <div className="row justify-content-center">
                      <h6 style={{color:"red", fontStyle:"italic", fontSize:17}}>Menciona las razones del rechazo</h6>            
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <Input
                            // value={retroAli}
                            placeholder="Escribir aquí..."                                
                            type="textarea" 
                            invalid="true"      
                            onChange = {(event) => handleEscribirRetroAli(event)}                        
                            />  
                        </div>
                    </div>         
                    <div className= "row justify-content-center" style={{marginTop:"2vh"}}>
                        <div className="col-auto">
                            <Button className={clasesEstilo.boton} onClick={handleRechazarPractica}>
                                Enviar
                            </Button>                               
                        </div>
                        <div className="col-auto">
                            <Button className={clasesEstilo.botonRechazo} onClick={()=>{setShowRetroAli(false)}}>
                                Cancelar
                            </Button>                               
                        </div>

                    </div>                                            
                </Collapse>    

                )
              }
            </div>       
          </Box>
        </div>
        
    )
}
