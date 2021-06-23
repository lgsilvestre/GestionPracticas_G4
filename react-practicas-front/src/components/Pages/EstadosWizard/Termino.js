import React from 'react'
import { FcGraduationCap } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import { CardActionArea, makeStyles } from '@material-ui/core';
import {
    CustomInput
    } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { FcSurvey } from "react-icons/fc";
const ladoCard = "25vh"
const useStyles = makeStyles((theme)=>({

  root: {
    // maxWidth: ladoCard,
    borderRadius: '25px',
    width:"36vh"
    // height: '78%'
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
  }
}))
export const Termino = ({previousPage}) => {
    const classes = useStyles()
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
                  <div className="row justify-content-center">
                    <div className="col-6">
                      <CustomInput 
                        type="file" 
                        name="informeFinal"
                        id= "informeFinal"
                        label="Sube tu informe de práctica"                                     
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center" style={{marginTop:"3vh"}}>
                    {/* NOTA EMPRESA */}
                    <div className="col-auto" style={{margin:"1vh"}}>
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
                            6.0
                          </Typography> 
                        </CardActionArea>
                        <Divider variant="middle" light={true} />
                        <Typography variant="body2" component="p" className={classes.description}>
                          Corresponde a la nota puesta por el supervisor de tu práctica.                          
                        </Typography>
                      </Card>             
                    </div>
                    {/* NOTA ESCUELA */}
                    <div className="col-auto" style={{margin:"1vh"}}>
                      <Card className={classes.root}>
                        <CardActionArea className={classes.area}>
                          <CardContent className={classes.cardContent}>
                          <IconContext.Provider value={{ size: "5em" , color: "#5E8B7E"}} className={classes.icono}>
                              <FcSurvey  />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                  Nota Escuela
                              </Typography>                                                            
                          </IconContext.Provider>                                    
                                  
                          </CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                            6.0
                          </Typography> 
                        </CardActionArea>
                        <Divider variant="middle" light={true} />
                        <Typography variant="body2" component="p" className={classes.description}>
                          Corresponde a la nota puesta por el encargado de práctica de tu carrera.                          
                        </Typography>
                      </Card>                      
                    </div>
                    {/* NOTA FINAL */}
                    <div className="col-auto" style={{margin:"1vh"}}>
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
                    </div>
                    
                  </div>
                </div>   
              </div>   
            </div>
          </div>          
        </div>
    )
}
