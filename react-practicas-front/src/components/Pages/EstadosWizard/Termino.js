import React, { useEffect, useState } from 'react'
import { FcGraduationCap } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import { Button, CardActionArea, makeStyles } from '@material-ui/core';
import {
    CustomInput
    } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { FcSurvey } from "react-icons/fc";
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Cookies from 'universal-cookie';

const ladoCard = "25vh"
const useStyles = makeStyles((theme)=>({

  root: {
    borderRadius: '25px',
    width:"36vh"
  },
  area : {
    padding: '0'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icono:{
    flex:' 0 0 43.333333%',
    maxWidth: '43.333333%',
    alignSelf: 'left'
  },
  label: {
    boxSizing: 'border-box',
    display: 'block',
    marginRight:'1em',
    textAlign: 'right',
    color: '#9A9A9A',
    fontSize: '2.5vh',
    lineHeight: '1.4em'
  },
  cantidad: {
    textAlign: 'right',
    fontSize: '2em',
    marginRight: '2em',
    marginTop: '-2em',
    fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif'
  },
  description:{
    margin:"1.5vh",
    textAlign:"center"
  },
  boton:{
    marginRight:'10px',
    backgroundColor:"grey",
    color:"white",
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
    '&:hover': {
    backgroundColor:'#0DC143',
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
}))
export const Termino = ({previousPage, nroPractica}) => {
    console.log("Renderizando componente con practica",nroPractica)
    const [mostrarAlertaDias, setMostrarAlertaDias] = useState(true)
    const [mostrarAlertaCriticaDias, setmostrarAlertaCriticaDias] = useState(false)
    const [documentoSubido, setDocumentoSubido] = useState(false)
    // const [nroPracticaEtapa, setnroPracticaEtapa] = useState(0)
    const [notaEmpresa, setNotaEmpresa] = useState("--")
    const [notaEscuela, setNotaEscuela] = useState("--")  
    const classes = useStyles()
    const cookies = new Cookies()
    const id_alumno = cookies.get('id')
    
    const getNotaEmpresa = async() => {
      console.log("Preguntando nota ",nroPractica)
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEvaluacionEmpresa",{
        id_alumno:id_alumno,
        numero:nroPractica
      })
      .then(response =>{   
        console.log("respuesta nota empresa:" ,response.data)
        //0 No hay evaluacion
        //>0 Es evaluacion
        if(response.data[0].evaluacion_empresa==="0"){
          setNotaEmpresa("--")
        }
        else{
          setNotaEmpresa(response.data[0].evaluacion_empresa)
        }
      }
      )
      .catch(error => {

        console.log("Error: ", error)
      });
    }
    const getNotaUni = async() => {
      console.log("Preguntando nota ",nroPractica)
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEvaluacionPracticaUni",{
        id_alumno:id_alumno,
        numero:nroPractica
      })
      .then(response =>{      
        console.log("respuesta nota uni:" ,response.data)
        if(response.data[0].evaluacion_uni==="0"){
          setNotaEscuela("--")
        }            
        else{
          setNotaEscuela(response.data[0].evaluacion_uni)
        }
      }
      )
      .catch(error => {
        console.log("Error: ", error)
      });
    }
    
    
    useEffect(() => {
         
      console.log("Consultando notas de practica: ",nroPractica)
      getNotaEmpresa()
      getNotaUni()  
    }, [nroPractica])
      
    
    return (
        <div className="animate__animated animate__fadeIn animate__faster">  
          <div >      
            <div className="card mb-3">
              <div className="p-5">
                <div className="text-center">
                  <IconContext.Provider value={{size:"5em"}} >
                    <FcGraduationCap/>
                  </IconContext.Provider> 
                  <h3>¡Felicidades!</h3>
                  <h4>¡Has completado tu práctica!</h4>
                  <hr/>  
                  <p>Esperamos que hayas tenido la oportunidad de aplicar tus conocimientos y además, de adquirir nuevos. 
                  A continuación, podrás ver tus calificaciones y subir el informe de práctica.</p>  
                </div>              
             
                <div className="container" style={{marginTop:"4vh"}}>
                  {!documentoSubido && 
                    mostrarAlertaDias && (
                      <div className="row justify-content-center" style={{marginBottom:"20px"}}>
                        <Alert severity="info">
                          ¡Quedan <strong>15</strong> días para subir tu informe de práctica, apresúrate!
                        </Alert>
                      </div>
                  )}
                  {!documentoSubido &&
                    mostrarAlertaCriticaDias &&(
                      <div className="row justify-content-center" style={{marginBottom:"20px"}}>
                          <Alert severity="error">
                            ¡Quedan solamente <strong>4</strong> días para subir tu informe de práctica, no te arriesgues a reprobar tu práctica!
                          </Alert>
                      </div>
                    )
                  }
                  <div className="row justify-content-center">
                    <div className="col-6">
                      <CustomInput 
                        type="file" 
                        name="informeFinal"
                        id= "informeFinal"
                        label="Sube tu informe de práctica"                                     
                      />
                    </div>
                    <div className="col-auto">
                      <Button className={classes.boton}>
                        Guardar
                      </Button>
                      <Button className={classes.botonRechazo}>
                        Eliminar
                      </Button>
                    </div>
                  {documentoSubido && (
                    <div className="row justify-content-center" style={{marginTop:"20px"}}>
                      <Alert severity="success">
                        ¡Has subido tu informe de práctica a tiempo! Espera por tus calificaciones.
                      </Alert>
                  </div>
                  )}
                  </div>
                  <div className="row justify-content-center" style={{marginTop:"3vh"}}>
                    {/* NOTA EMPRESA */}
                    {/* <div className="col-auto" style={{margin:"1vh"}}>
                      <Card className={classes.root}>
                        <CardActionArea className={classes.area}>
                          <CardContent className={classes.cardContent}>
                          <IconContext.Provider value={{ size: "5em" , color: "#5E8B7E"}} className={classes.icono}>
                              <FcSurvey  />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                  Nota Empresa
                              </Typography>                                                            
                          </IconContext.Provider>                                    
                                  
                          </CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                            {notaEmpresa}
                          </Typography> 
                        </CardActionArea>
                        <Divider variant="middle" light={true} />
                        <Typography variant="body2" component="p" className={classes.description}>
                          Corresponde a la nota puesta por el supervisor de tu práctica.                          
                        </Typography>
                      </Card>             
                    </div> */}
                    {/* NOTA ESCUELA */}
                    <div className="col-auto" style={{margin:"1vh"}}>
                      <Card className={classes.root}>
                        <CardActionArea className={classes.area}>
                          <CardContent className={classes.cardContent}>
                          <IconContext.Provider value={{ size: "5em" , color: "#5E8B7E"}} className={classes.icono}>
                              <FcSurvey  />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                  Nota de Practica
                              </Typography>                                                            
                          </IconContext.Provider>                                    
                                  
                          </CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                            {notaEscuela}
                          </Typography> 
                        </CardActionArea>
                        <Divider variant="middle" light={true} />
                        <Typography variant="body2" component="p" className={classes.description}>
                          Corresponde a la evaluación final de tu práctica.                          
                        </Typography>
                      </Card>                      
                    </div>
                    {/* NOTA FINAL */}
                    {/* <div className="col-auto" style={{margin:"1vh"}}>
                      <Card className={classes.root}>
                        <CardActionArea className={classes.area}>
                          <CardContent className={classes.cardContent}>
                          <IconContext.Provider value={{ size: "5em" , color: "#5E8B7E"}} className={classes.icono}>
                              <FcSurvey  />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                  Nota Final
                              </Typography>                                                            
                          </IconContext.Provider>                                    
                                  
                          </CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                            6.0
                          </Typography> 
                        </CardActionArea>
                        <Divider variant="middle" light={true} />
                        <Typography variant="body2" component="p" className={classes.description}>
                          Corresponde a la nota final de tu práctica.                          
                        </Typography>
                      </Card>    
                    </div> */}
                    
                  </div>
                </div>   
              </div>   
            </div>
          </div>          
        </div>
    )
}
