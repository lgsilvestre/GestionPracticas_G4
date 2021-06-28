import React, { useState } from 'react'
import {FcApproval,FcCancel, FcClock,FcCheckmark} from 'react-icons/fc'
import { IconContext } from 'react-icons/lib';
import { 
  Box,
  Grid,  
  IconButton,  
  List,  
  ListItem,  
  ListItemIcon,  
  ListItemSecondaryAction,  
  makeStyles, Icon
  } from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';
import { Card } from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import {
  Button} from 'reactstrap';
const useStyles = makeStyles((theme) => ({
    icon:{
        width:"30px", 
        height:"30px"
    }
      }));
export const Resolucion = ({previousPage, handleSubmit, mostrarSeguro=true}) => {
    const clasesEstilo = useStyles();
    const [estadoSolicitud, setEstadoSolicitud] = useState(0)
    const handleChangeState=(estado)=>{
        setEstadoSolicitud(estado)
    }
    return (
      <div className="animate__animated animate__fadeIn animate__faster">          
        <div className="container">
          <div className="row justify-content-center">
            <h5 > Esta etapa de tu práctica se encuentra en el estado: </h5>  
          </div>
          {
            estadoSolicitud===0 && (
            <div className="col card mb-3">
              <div className="row justify-content-center" style={{marginTop:"5vh"}}>
                <IconContext.Provider value={{size:"5em"}} >
                  <FcApproval/>
                </IconContext.Provider>      
              </div>
              <div className="row justify-content-center">
                <h4>Aprobada</h4>
              </div>
              <hr/>  
              <div className="row justify-content-center" style={{marginBottom:"5vh"}}>
                <p>¡Esta etapa se encuentra aprobada! Ya puedes seguir con el siguiente paso </p> 
              </div>             
              {mostrarSeguro&&(    
                <>
                  <div className="row justify-content-center">
                    <Alert severity="warning" >
                      <strong>IMPORTANTE: </strong> Recuerda descargar tu seguro, es indispensable para dar comienzo a tu práctica.
                    </Alert>
                  </div>
                  <Card 
                    className="container" 
                    style={{marginTop:'10px', 
                      marginBottom:'5vh', 
                      borderRadius:'20px', 
                      backgroundColor:'#fafafa', 
                      width:"40vw",
                      minWidth:"10vw"                
                    }}
                  >
                    <div className="row align-items-center" >
                      <div className="col-auto">
                        <Icon style={{color:'#f69b2e'}}>
                          <VscFilePdf className={clasesEstilo.icon}/>
                        </Icon>
                      </div>
                      <div className="col-9">                           
                          Seguro de Práctica                                                        
                      </div>
                      <div className="col-auto">                       
                          <IconButton  style={{color:'#f69b2e'}}>
                            <MdFileDownload />
                          </IconButton>                                                                                                                                                                         
                      </div>                                         
                    </div>
                  </Card>
                  <div className="row justify-content-center" style={{marginBottom:'5vh',}}>
                  <Button className="btn btn-primary" onClick={handleSubmit}>
                    Continuar
                  </Button>
                  </div>
                </>                
              )
              }
            </div>                                                
            )
          }
            {
              estadoSolicitud===1 &&
              (
                <div className="col card mb-3">
                  <div className="row justify-content-center" style={{marginTop:"5vh"}}>
                    <IconContext.Provider value={{size:"5em"}} >
                      <FcApproval/>
                    </IconContext.Provider>      
                  </div>
                  <div className="row justify-content-center">
                    <h4>Aprobada</h4>
                  </div>
                  <hr/>  
                  <div className="row justify-content-center" style={{marginBottom:"5vh"}}>
                    <p>¡Esta etapa se encuentra aprobada! Ya puedes seguir con el siguiente paso </p> 
                  </div>
                </div>
              )
            }
            {
              estadoSolicitud===2 &&
              (
                <div className="col card mb-3">
                  <div className="row justify-content-center" style={{marginTop:"10vh"}}>
                    <IconContext.Provider value={{size:"6em"}} >
                      <FcClock/>
                    </IconContext.Provider>      
                  </div>
                  <div className="row justify-content-center" style={{marginBottom:"2vh"}} >
                    <h3>Pendiente</h3>
                  </div>
                  <hr style={{marginLeft:"9vw", marginRight:"9vw"}}/>  
                  <div 
                      className="row justify-content-center" 
                      style={{marginBottom:"15vh", marginLeft:"10vw", marginRight:"10vw"}}>
                      <div className="col-auto text-center">
                        ¡Esta etapa se encuentra en etapa de revisión por parte de tu encargado, por favor espera por la resolución.
                        Te avisaremos mediante correo electrónico cuando haya una respuesta.
                      </div>
                  </div>
                </div>
              )
            }

          </div>
        </div>                
    )
}
