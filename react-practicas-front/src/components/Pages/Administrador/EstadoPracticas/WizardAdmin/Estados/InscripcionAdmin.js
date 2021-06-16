import React, { useState } from 'react'
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
    TextField} from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useForm } from '../../../../../../hooks/useForm';
import { AiOutlineSearch } from 'react-icons/ai';
import {InputCollapse, CardBody, Card, Collapse, Input } from 'reactstrap';
import { GoCheck } from "react-icons/go";
import { GoCircleSlash } from "react-icons/go";
import axios from 'axios';

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
    const [idDocCancelado, setIdDocCancelado] = useState(0)
    const [isOpen, setisOpen] = useState(false)
    const clasesEstilo = useStyles();
    const dataEmpresa = {
        empresa: "Universidad de Talca",
        supervisor: "Juan Perez",
        fechainicio: "21/07/2021",
        fechatermino: "21/10/2021",
    }
    const infoLabelsEmpresa = ["Nombre Empresa:", "Nombre de Supervisor:", "Fecha de Inicio:", "Fecha de término:"]
    const archivosEstudiante =[
        {
            nombre:"Carta de presentación",
            id: 1
        },{
            nombre:"Currículo Plan",
            id: 2
        },{
            nombre: "Consentimiento Informado",
            id: 3
        },{
            nombre: "Protocolo Covid",
            id: 4
        },{
            nombre: "Módulos de desempeño integrado",
            id: 5
        }]
    
    const handleCancelDoc = (id) => {
      setIdDocCancelado(id)
      setisOpen(!isOpen)
      console.log("cancelando doc ",id)
    }
    const enviarInformacionInscripcion= () =>{  
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/",{
        matricula:nroMatricula,
        numero:nroPractica,
        idalumno:idAlumno
      }
      ).then(response =>{
        //TRUE PRACTICA AGREGADA CORRECTAMENTE -> CAMBIAR ETAPA A INSCRIPCION
        console.log("respuesta enviar info solicitud: ",response.data)
        nextPage()
      }
      )
      .catch(error => {
        //FALSE PRACTICA NO AGREGADA
        //MOSTRAR ALERTA
        console.log("Error: ", error)
      });
    }
    const handleAceptarInscripcion = () =>{
      console.log("ACEPTANDO PRACTICA")
      nextPage()
      // enviarInformacionInscripcion()
    }
    return (
        <div className="animate__animated animate__fadeIn animate__faster">       
            {/*Datos de Empresa  */}
            <Box className={clasesEstilo.mainbox} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Empresa</h4>
                <hr/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[0]}
                            </Box>
                            <Box>
                                {dataEmpresa.empresa}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[1]}
                            </Box>
                            <Box>
                                {dataEmpresa.supervisor}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[2]}
                            </Box>
                            <Box>
                                {dataEmpresa.fechainicio}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[3]}
                            </Box>
                            <Box>
                                {dataEmpresa.fechatermino}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
            </Box>   
            {/* Archivos */}
            <Box className={clasesEstilo.mainbox} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Documentos Subidos</h4>
                <hr/>                          
                <List>
                  {archivosEstudiante.map( (file,index) => (
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
                              <IconButton  onClick={() => handleCancelDoc(file.id)} >
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
                              {idDocCancelado === file.id 
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
