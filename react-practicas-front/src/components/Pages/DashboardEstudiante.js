import { makeStyles } from '@material-ui/core';
import React from 'react'
// import Calendar from 'react-awesome-calendar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Card } from 'reactstrap';
import { IconContext } from 'react-icons/lib';
import { FcCalendar,FcInspection,FcInfo } from "react-icons/fc";
import { InfoPracticaEstudiante } from '../../api/InfoPracticaEstudiante';

const useStyles = makeStyles((theme)=>({

  cardDatos:{
    marginTop:"1vh",
    height:"32vh",
    width:"57.5vh",
    maxWidth:"57.5vh",
    marginRight:"1vh",
    borderRadius:'20px', 
    backgroundColor:'#fafafa'
  },
  cardFechas:{
    marginTop:"1vh",
    height:"32vh",
    width:"57.5vh",
    maxWidth:"57.5vh",
    borderRadius:'20px', 
    backgroundColor:'#fafafa'
  },
  cardInfo:{
    height:"50vh",
    width:"116vh",
    margin: "1vh",
    borderRadius:'20px', 
    backgroundColor:'#fafafa'
  },
  cardFecha:{
    backgroundColor:"#E4E4E4",
    width:"56vh",
    height:"7vh",
    marginBottom:"1vh"
  },
  cardFechaCritica:{
    backgroundColor:"#FF8886",
    width:"56vh",
    height:"7vh",
    marginBottom:"1vh"
  },
  titleCard:{
    // marginLeft:"2vh", 
    // marginTop:"2vh",
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
  const dataEstudiante = {
    nombre:nombre,
    correo:"correo@alumnos.utalca.cl",
    matricula:"12345678",
    carrera:"Ingeniería Civil en Computación"
  }
  const FechasImportantes = [
    {
      fecha:"16/06",
      evento:"Fin de Plazo para presentar solicitud de práctica."
    },
    {
      fecha:"19/07",
      evento:"Cierre de Primer Semestre"
    },
    {
      fecha:"09/08",
      evento:"Comienzo de Segundo Semestre."
    },
  ]
  const classes = useStyles();
  return (
    <div>
      {/* Barra con el nombre del alumno */}
      <div style={{backgroundColor:"#2D4C85"}}>
        <div className="container" >
          <div className="row justify-content-md-center" >
            <div className="col" style={{marginTop:10}}>
              <h3 style={{color:"white"}}>¡Bienvenido {dataEstudiante.nombre}!</h3>
            </div>
          </div>   
        </div>
      </div>
      <div className="container animate__animated animate__fadeIn animate__faster">
          <div className="row justify-content-md-center">
            {/* DATOS */}
            <Card className={classes.cardDatos} >              
              <div className="col" >
                <div className="row align-items-center" style={{marginLeft:"0.3vh", marginTop:"0.7vh"}}>   
                  <IconContext.Provider value={{size:"4vh"}} >
                    <FcInspection style={{marginTop:"0.5vh", marginRight:"1vh"}}/>
                  </IconContext.Provider> 
                  <h4 className={classes.titleCard}><strong>Tus Datos</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
                <div className="row" style={{marginTop:"3vh"}}>
                  <div className="col" style={{marginBottom:"3vh"}}>
                    <h6 className={classes.textoInfo}><strong>Nombre</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.nombre}</h7>
                  </div>
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Correo</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.correo}</h7>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Matrícula</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.matricula}</h7>
                  </div>
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Carrera</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.carrera}</h7>
                  </div>
                </div>
              </div>
            </Card>
            {/* FECHAS IMPORTANTES */}
            <Card className={classes.cardFechas}>
              <div className="col">
                <div className="row align-items-center" style={{marginLeft:"0.3vh", marginTop:"0.7vh"}}>
                  <IconContext.Provider value={{size:"4vh"}} >
                    <FcCalendar style={{marginTop:"0.5vh", marginRight:"1vh"}}/>
                  </IconContext.Provider> 
                  <h4 className={classes.titleCard}><strong>Fechas importantes 2021</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
              </div>
              <div className="container">
                <div className="row justify-content-md-center">
                  <Card className={classes.cardFechaCritica}>
                    <div className="col-auto">
                      <div className="row align-items-center" style={{height:"7vh"}}>
                        <div className="col-auto" 
                          style={{borderRight:" 0.1vh solid black"}}
                        >
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{FechasImportantes[0].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{FechasImportantes[0].evento}</h1>
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
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{FechasImportantes[1].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{FechasImportantes[1].evento}</h1>
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
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{FechasImportantes[2].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{FechasImportantes[2].evento}</h1>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>    
          </div>
          {/* INFORMACION DE PRACTICA */}
          <div className="row justify-content-md-center">
            <Card className={classes.cardInfo} >
              <div className="col">
                <div className="row align-items-center" style={{marginLeft:"0.3vh", marginTop:"0.7vh"}}>
                  <IconContext.Provider value={{size:"4vh"}} >
                    <FcInfo style={{marginTop:"0.5vh", marginRight:"1vh"}}/>
                  </IconContext.Provider> 
                  <h4 className={classes.titleCard}><strong>Información sobre tu práctica</strong></h4>
                </div>
                <hr className={classes.hrSection}/>
                <div className="row">
                  <div className="col " style={{marginTop:"3vh"}}>
                    <div className="row" style={{marginBottom:"1vh"}}> 
                      <div className="col">
                        <h7 className={classes.textoInfo}><strong>Práctica actual:</strong> Práctica 1</h7>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:"1vh"}}> 
                      <div className="col">
                        <h7 className={classes.textoInfo}><strong>Etapa actual:</strong> {InfoPracticaEstudiante[1].etapa}</h7>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:"1vh"}}> 
                      <div className="col">
                        <h7 className={classes.textoInfo}><strong>Información de etapa:</strong></h7>
                        <p className={classes.textoInfo} style={{margin:0}}> {InfoPracticaEstudiante[1].info}
                        </p>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col">
                        <h7 className={classes.textoInfo}><strong>Pasos a seguir:</strong> {InfoPracticaEstudiante[1].pasos}</h7>
                      </div>
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
