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
  TextField,
  Divider} from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import Alert from '@material-ui/lab/Alert';
import {InputCollapse, CardBody, Card, Collapse, Input } from 'reactstrap';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';

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

export const EvaluacionAdmin = () => {
    const classes = useStyles()
    const [openComentario, setOpenComentario] = useState(false)
    const handleCancelDoc = () => {
      setOpenComentario(true)
    }
    
    const file={
      nombre: "Informe de Práctica",
      id_instancia_documento:1
    }
    return (
      <>
        <div>
          <Alert severity="info" onClose={()=>{}}>
            Este alumno completo su práctica, pero aún no sube su informe de práctica.
          </Alert>
          <Alert severity="success" onClose={()=>{}}>
            ¡Este alumno subió su informe de práctica! Ahora puedes evaluarlo. 
          </Alert>
          <Alert severity="info" onClose={()=>{}}>
            Este alumno completo su práctica, pero aún no es evaluado por el supervisor de su empresa.
          </Alert>
          <Alert severity="success" onClose={()=>{}}>
            ¡El supervisor de práctica ha subido la nota del estudiante! 
          </Alert>
        </div>
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
                          <Button >
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
                    <p className={classes.margintitle}>Nombre supervisor...</p>
                  </div>
                  <div className="col">
                   <h4 className={classes.margintitle}> 6.0 </h4>
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
                    <Input style={{width:"70px"}} type="number" name="nota"/>
                  </div>
                  <div className="col-auto">
                    <Button className={classes.boton} >
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
