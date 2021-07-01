import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Card } from 'reactstrap';
import { IconContext } from 'react-icons/lib';
import { FcCalendar,FcInspection,FcInfo } from "react-icons/fc";
import { InfoPracticaEstudiante } from '../../api/InfoPracticaEstudiante';
import Cookies from 'universal-cookie';

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
  const cookies = new Cookies()
  const id_alumno = cookies.get('id')
  const dataEstudianteEj = {
    nombre:nombre,
    correo_ins:"correo@alumnos.utalca.cl",
    matricula:"12345678",
    nbe_carrera:"Ingeniería Civil en Computación"
  }
  const FechasImportantesEj = [
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
  const [dataEstudiante, setdataEstudiante] = useState(dataEstudianteEj)
  const [fechasImportantes, setfechasImportantes] = useState(FechasImportantesEj)
  const [etapa, setEtapa] = useState(0)
  const [infoPractica, setInfoPractica] = useState(InfoPracticaEstudiante[0])
  const [nroPractica, setNroPractica] = useState(1)
  const [sinPractica, setSinPractica] = useState(true)
  const getInfoAlumno = () => {
    // console.log("Solicitando alumno con id: ",id_alumno)
    axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getAlumnoId",
      {
        id_alumno:id_alumno
      }
    )
    .then(response=>{
      console.log("Info Alumno:" ,response.data)
      setdataEstudiante(response.data[0])
    })
  }
  const getEtapaPracticaActiva = () => {
    axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEstadoPracticaActiva",
      {
        id_alumno:id_alumno
      }
    )
    .then(response=>{
      if(response.data!==0){
        console.log("Practica activa:" ,response.data)      
        switch (response.data[0].etapa) {
          case "Solicitud":
            setEtapa(1)
            setInfoPractica(InfoPracticaEstudiante[1])
            break;
          case "Inscripción":
            setEtapa(2)
            setInfoPractica(InfoPracticaEstudiante[2])
            break;
          case "Cursando":
            setEtapa(3)
            setInfoPractica(InfoPracticaEstudiante[3])
            break;
          case "Evaluación":
            setEtapa(4)
            setInfoPractica(InfoPracticaEstudiante[4])
            break;    
          default:
            break;
        }
      }
      else{
        console.log("Estudiante no tiene practica activa")
        setInfoPractica(InfoPracticaEstudiante[1])
      }
    })
  }
  const getPracticasTerminada = () => {
    axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getNumeroSiguientePractica",
      {
        id_alumno:id_alumno
      }
    )
    .then(response=>{
      if(response.data !==0){
        setSinPractica(false)
        const arrayNumeros = []
        console.log("Practicas Terminadas:" ,response.data)
        response.data.map((objeto)=>(
          arrayNumeros.push(objeto.numero)
        ))
        // console.log("rray numeros",arrayNumeros)
        const mayor = Math.max(...arrayNumeros)+1
        console.log("mayor: ",mayor)
        setNroPractica(mayor)
        cookies.set('practica_next', mayor, { path: '/' });
      }
      else{
        console.log("No hay practicas")
        setNroPractica(1)
        cookies.set('practica_next', 1, { path: '/' })
      }
    })
  }
  
  useEffect(() => {
    getInfoAlumno()
    getEtapaPracticaActiva()
    getPracticasTerminada()
  }, [])
  const classes = useStyles();
  return (
    <div>
      {/* Barra con el nombre del alumno */}
      <div style={{backgroundColor:"#2D4C85"}}>
        <div className="container" >
          <div className="row justify-content-md-center" >
            <div className="col-auto" style={{marginTop:10}}>
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
                    <h7 className={classes.textoInfo}>{dataEstudiante.correo_ins}</h7>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Matrícula</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.matricula}</h7>
                  </div>
                  <div className="col">
                    <h6 className={classes.textoInfo}><strong>Carrera</strong></h6>
                    <h7 className={classes.textoInfo}>{dataEstudiante.nbe_carrera}</h7>
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
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{fechasImportantes[0].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{fechasImportantes[0].evento}</h1>
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
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{fechasImportantes[1].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{fechasImportantes[1].evento}</h1>
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
                          <h1 style={{fontSize:"2.6vh", margin:0}}><strong>{fechasImportantes[2].fecha}</strong></h1>
                        </div>
                        <div className="col-9" >
                          <h1 style={{fontSize:"1.7vh", margin:0}}>{fechasImportantes[2].evento}</h1>
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
                          <h7 className={classes.textoInfo}><strong>Práctica actual:</strong> Práctica {nroPractica}</h7>
                        {/* {!sinPractica ? (
                          <h7 className={classes.textoInfo}><strong>Práctica actual:</strong> Práctica {nroPractica}</h7>
                        ):(
                          <h7 className={classes.textoInfo}><strong>Práctica actual:</strong> No has solicitado ninguna práctica</h7>
                        )} */}
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:"1vh"}}> 
                      <div className="col">
                        <h7 className={classes.textoInfo}>
                        <strong>Etapa actual:</strong> {infoPractica.etapa}</h7>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom:"1vh"}}> 
                      <div className="col">
                        <h7 className={classes.textoInfo}><strong>Información de etapa:</strong></h7>
                        <p className={classes.textoInfo} style={{margin:0}}> {infoPractica.info}
                        </p>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col">
                        <h7 className={classes.textoInfo}>
                        <strong>Pasos a seguir:</strong> Ve a <Link to='estudiante/practicas' >
                        Practicas  
                        </Link>{infoPractica.pasos} 
                        </h7>
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
