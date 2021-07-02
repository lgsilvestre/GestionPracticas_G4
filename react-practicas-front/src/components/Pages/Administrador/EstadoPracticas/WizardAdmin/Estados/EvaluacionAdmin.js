import React, { useEffect, useState } from 'react'
import { 
  Box,
  Grid,  
  IconButton,  
  List,  
  ListItem,  
  ListItemIcon,  
  ListItemSecondaryAction,  
  ListItemText,  
  makeStyles,
  Button,
  TextField,
  Divider} from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import Alert from '@material-ui/lab/Alert';
import {InputCollapse, CardBody, Card, Collapse, Input } from 'reactstrap';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  mainbox:{
    marginTop:'5vh', 
    //marginBottom:'30px', 
    borderRadius:'20px', 
    backgroundColor:'#fafafa'
  },
  margintitle:{
    paddingTop:'20px',
    paddingLeft:'20px'
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
  
}));

export const EvaluacionAdmin = ({idAlumno, nroPractica}) => {
    const classes = useStyles()
    const [openComentario, setOpenComentario] = useState(false)
    const [mostrarAlertaInforme, setmostrarAlertaInforme] = useState(true)
    const [estadoInforme, setEstadoInforme] = useState(true)
    const [mostrarAlertaNota, setmostrarAlertaNota] = useState(true)
    const [estadoNotaEmpresa, setEstadoNotaEmpresa] = useState(false)
    const [notaPractica, setnotaPractica] = useState("")
    const [notaPracticaEmpresa, setnotaPracticaEmpresa] = useState("")
    
    const [nombreSupervisor, setnombreSupervisor] = useState("")
    const handleCancelDoc = () => {
      setOpenComentario(true)
    }
    const cerrarAlertaInforme = () =>{
      setmostrarAlertaInforme(false)
    }
    const cerrarAlertaNota = () =>{
      setmostrarAlertaNota(false)
    }
    //Axios para obtener el informe que subio el alumno.
    const getInforme = () => {
      
    }
    //Axios para obtenet la nota que subio el supervisor.
    const getNotaEmpresa = () => {
      console.log("nro Practica ",nroPractica)
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEvaluacionEmpresa",{
        id_alumno:idAlumno,
        numero:nroPractica
      })
      .then(response =>{
        console.log(response.data)
        setnombreSupervisor(response.data[0].supervisor)
        //0 No hay evaluacion
        //>0 Es evaluacion
        if(response.data[0].evaluacion_empresa==0){
          setnotaPracticaEmpresa("--")
        }
        else{
          setEstadoNotaEmpresa(true)
          setnotaPracticaEmpresa(response.data[0].evaluacion_empresa)
          
        }       
      }
      )
      .catch(error => {

        console.log("Error: ", error)
      });
    }
    const getNotaUni = () => {
      console.log("nro Practica ",nroPractica)
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEvaluacionPracticaUni",{
        id_alumno:idAlumno,
        numero:nroPractica
      })
      .then(response =>{      
        //0 No hay evaluacion
        //>0 Es evaluacion
        if(response.data[0].evaluacion_uni==="0"){
          setnotaPractica("--")
        }
        else{
          setnotaPractica(response.data[0].evaluacion_uni)
          
        }       
      }
      )
      .catch(error => {

        console.log("Error: ", error)
      });
    }
    const handleCambiarNota = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      setnotaPractica(event.target.value)
      // actualizarNota(event.target.value)
    }
    const cambiarPracticaInactiva = () => {

      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/practicaInactiva",{
        id_alumno:idAlumno,
      })
      .then(response=>{
        //1 EVALUADA 0 ERROR
        console.log(response.data)
      })
    }
    
    const finalizarPractica = () => {
      actualizarNotaPractica()

    }
    
    const actualizarNotaPractica = () => {
      
      console.log("Axios con nota: ",notaPractica)
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/evaluarPractica",{
        id_alumno:idAlumno,
        nota:notaPractica
      })
      .then(response=>{
        //1 EVALUADA 0 ERROR
        if(response.data!==1){
          console.log("Evaluada correctamente")
          confirmarEvaluacionCorreo(response.data)
          cambiarPracticaInactiva()
        }
        else{
          console.log("No se pudo evaluar")
        }
        console.log(response.data)
      }).catch(error =>{
        console.log("ERROR EVALUANDO", error)
      })
    }
    const confirmarEvaluacionCorreo = (dato) => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/evaluarPracticaCorreo",{ 
          id_alumno:idAlumno,
          id_historia:dato
      }).then(response=>{
          console.log("Respuesta envio correo: ",response.data)
      }).catch(error=>{
          console.log("ERROR EN RECHAZO: ",error)
      })
    }
    
    
    const file={
      nombre: "Informe de Práctica",
      id_instancia_documento:1
    }
    useEffect(() => {
      getNotaEmpresa()
      getNotaUni()
    }, [])
    return (
      <>
          {
            mostrarAlertaInforme && (
              <div style={{marginBottom:"10px"}}>
                    {estadoInforme 
                    ?(
                      <Alert severity="success" onClose={cerrarAlertaInforme}>
                        ¡Este alumno subió su informe de práctica! Ahora puedes evaluarlo. 
                      </Alert>
                    )
                    :(
                      <Alert severity="info" onClose={cerrarAlertaInforme}>
                        Este alumno completo su práctica, pero aún no sube su informe de práctica.
                      </Alert>
                    )}
              </div>
            )
          }
          {
            mostrarAlertaNota && (
              <div>
                {estadoNotaEmpresa 
                ?( //TRUE
                  <Alert severity="success" onClose={cerrarAlertaNota}>
                    ¡El supervisor de práctica ha subido la nota del estudiante! 
                  </Alert>
                )
                :(//FALSE
                  <Alert severity="info" onClose={cerrarAlertaNota}>
                    Este alumno completo su práctica, pero aún no es evaluado por el supervisor de su empresa.
                  </Alert>
                )}
              </div>
            )
          } 
        <div className="container">            
          <Box className={classes.mainbox} boxShadow={1}>
            <h4 className={classes.margintitle}>Informe de práctica</h4>   
            <Divider/> 
            <List>
              <div className="row">
                <ListItem>
                  <div className="col-sm-auto">              
                    <ListItemIcon style={{color:'#f69b2e'}}>
                      <VscFilePdf/>
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
                      <IconButton  onClick={handleCancelDoc} >
                        <FcCancel />
                      </IconButton>                           
                    </ListItemSecondaryAction>                                                                
                  </div>                       
                </ListItem>
              </div>
              <div className="row">
                <ListItem> 
                  <div className="col">
                    <Collapse isOpen={openComentario}>            
                      <div className="row">
                        <div className="col">
                          <Input                                                    
                          placeholder="Ingrese retroalimentación..."                                
                          type="textarea" 
                          invalid="true"                              
                          />  
                        </div>
                        <div className="col">
                          <Button className={classes.boton}>
                            Guardar
                          </Button>                               
                        </div>
                        </div>                  
                    </Collapse>                                                         
                  </div>                                             
                </ListItem>                   
              </div>                                                                             
            </List>
          </Box>
          <div className="row justify-content-center">
            <div className="col">
              <Box className={classes.mainbox} boxShadow={1} style={{width:"27vw", minWidth:"450px"}}>
                <h4 className={classes.margintitle}>Nota de Supervisor</h4>
                <Divider/>
                <div className="row ">
                  <div className="col-9">
                    <p className={classes.margintitle}>Nombre: {nombreSupervisor}</p>
                  </div>
                  <div className="col">
                    <h4 className={classes.margintitle}>{notaPracticaEmpresa} </h4>
                  </div>
                </div>
              </Box>
            </div>
            <div className="col justify-content-center">
              <Box className={classes.mainbox} boxShadow={1} style={{width:"27vw", minWidth:"450px"}}>
                <h4 className={classes.margintitle}>Evaluar práctica</h4>
                <Divider/>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <p className={classes.margintitle}> Ingrese nota de práctica:</p>
                  </div>
                  <div className="col-auto">
                    <Input value={notaPractica} style={{width:"70px"}} type="number" name="nota" onChange={handleCambiarNota}/>
                  </div>
                  <div className="col-auto">
                    <Button className={classes.boton} onClick={finalizarPractica}>
                      Guardar
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </div>
          <div style={{height:"5vh"}}></div>
        </div>     
      </>
    )
}
