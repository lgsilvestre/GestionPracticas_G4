import { makeStyles } from '@material-ui/core';
import React from 'react'
import 'react-calendar/dist/Calendar.css';
import { Card } from 'reactstrap';
const useStyles = makeStyles((theme)=>({
  cardDatos:{
    marginTop:"1vh",
    height:"32vh",
    width:"62vh",
    marginRight:"1vh"
  },
  cardFechas:{
    marginTop:"1vh",
    height:"32vh",
    width:"62vh",
  },
  cardInfo:{
    height:"50vh",
    width:"125vh",
    margin: "1vh",
  },
  cardFecha:{
    backgroundColor:"#E4E4E4",
    width:"60vh",
    height:"7vh",
    marginBottom:"1vh"
  },
  titleCard:{
    marginLeft:"2vh", 
    marginTop:"2vh",
    fontSize:"3vh",
    margin:0
  },
  hrSection:{
    margin:"1vh"
  },
  textoInfo:{
    fontSize:"1.8vh"
  }
}))
export const DashboardEstudiante = ({nombre="Camilo Villalobos"}) => {
  const classes = useStyles();
  return (
    <div>
      {/* Barra con el nombre del alumno */}
      <div style={{backgroundColor:"#2D4C85"}}>
        <div className="container" >
          <div className="row justify-content-md-center" >
            <div className="col" style={{marginTop:10}}>
              <h3 style={{color:"white"}}>¡Bienvenido {nombre}!</h3>
            </div>
          </div>  
        </div>
      </div>
      <div className="container">
          <div className="row justify-content-md-center">
            {/* DATOS */}
            <Card className={classes.cardDatos} >              
              <div className="col" >
                <div className="row">
                  <h4 className={classes.titleCard}><strong>Tus Datos</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
                <div className="row" style={{marginTop:"3vh"}}>
                  <div className="col" style={{marginBottom:"3vh"}}>
                    <h6 className={classes.textoInfo}><strong>Nombre</strong></h6>
                    <h7 className={classes.textoInfo}>Camilo Villalobos</h7>
                  </div>
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Correo</strong></h6>
                    <h7 className={classes.textoInfo}>correo@alumnos.utalca.cl</h7>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Matricula</strong></h6>
                    <h7 className={classes.textoInfo}>12345678</h7>
                  </div>
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Carrera</strong></h6>
                    <h7 className={classes.textoInfo}>Ingeniería Civil en Computación</h7>
                  </div>
                </div>
              </div>
            </Card>
            {/* FECHAS IMPORTANTES */}
            <Card className={classes.cardFechas}>
              <div className="col">
                <div className="row">
                  <h4 className={classes.titleCard}><strong>Fechas importantes</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
              </div>
              <div className="container">
                <div className="row justify-content-md-center">
                  <Card className={classes.cardFecha}>
                    <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>16 Junio</strong></h1>
                        </div>
                        <div className="col-8" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>Fin de Plazo para presentar solicitud de práctica.</h1>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className={classes.cardFecha}>
                  <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>16 Junio</strong></h1>
                        </div>
                        <div className="col-8" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>Fin de Plazo para presentar solicitud de práctica.</h1>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className={classes.cardFecha}>
                  <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>16 Junio</strong></h1>
                        </div>
                        <div className="col-8" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>Fin de Plazo para presentar solicitud de práctica.</h1>
                        </div>
                      </div>
                    </div>
                  </Card>
                  {/* <Card className={classes.cardFecha}>
                  <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>16 Junio</strong></h1>
                        </div>
                        <div className="col-8" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>Fin de Plazo para presentar solicitud de práctica.</h1>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className={classes.cardFecha}>
                  <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>16 Junio</strong></h1>
                        </div>
                        <div className="col-8" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>Fin de Plazo para presentar solicitud de práctica.</h1>
                        </div>
                      </div>
                    </div>
                  </Card> */}
                </div>
              </div>
            </Card>    
          </div>
          {/* INFORMACION DE PRACTICA */}
          <div className="row justify-content-md-center">
            <Card className={classes.cardInfo} >
              <div className="col">
                <div className="row">
                  <h4 className={classes.titleCard}><strong>Información sobre tu práctica</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
                <div className="container" style={{marginTop:"3vh"}}>
                  <div className="row" style={{marginBottom:"1vh"}}> 
                    <div className="col">
                      <h7 className={classes.textoInfo}><strong>Práctica actual:</strong> Práctica 1</h7>
                    </div>
                  </div>
                  <div className="row" style={{marginBottom:"1vh"}}> 
                    <div className="col">
                      <h7 className={classes.textoInfo}><strong>Etapa actual:</strong> Solicitud Pendiente</h7>
                    </div>
                  </div>
                  <div className="row" style={{marginBottom:"1vh"}}> 
                    <div className="col">
                      <h7 className={classes.textoInfo}><strong>Información de etapa:</strong></h7>
                      <p className={classes.textoInfo} style={{margin:0}}>En esta primera etapa debes solicitar la práctica para que el encargado de tu carrera analice tu situación.
                      Si acepta tu solicitud, se te enviarán los documentos correspondientes para que los presentes en la entrevista
                      con tu empresa elegida. Si es rechazada, se te enviara las razones del rechazo.
                      </p>
                    </div>
                  </div>
                  <div className="row"> 
                    <div className="col">
                      <h7 className={classes.textoInfo}><strong>Pasos a seguir:</strong> Ve a Prácticas y luego solicita tu práctica</h7>
                    </div>
                  </div>
                </div>              
              </div>
            </Card>
          </div>

           
      </div>
      
    </div>
    
  )
}
