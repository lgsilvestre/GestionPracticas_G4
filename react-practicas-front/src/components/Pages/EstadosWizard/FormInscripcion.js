import React, { Fragment, useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input, 
  FormText, Col, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter,
   ButtonGroup,CustomInput} from 'reactstrap';
import { MdFileDownload } from 'react-icons/md'
import Alert from '@material-ui/lab/Alert';
import { Resolucion } from './Resolucion';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm' 
import { Comentario } from './Comentario';
import {regiones} from '../../../api/regiones';
export const FormInscripcion = ({previousPage, handleSubmit,nroPractica}) => {

    const cookies = new Cookies()
    const id_alumno = cookies.get('id')
    const [formValues, handleInputChange] = useForm({
      empresa: "",
      supervisor: "",
      rutempresa:"",
      fechaStart: "",
      fechaEnd: "",
      correosupervisor:"",
      fonosupervisor:"",
      regionempresa:0,
      zonaempresa:"",
      nombre_emer:"",
      tel_emer:"",
    })
    const [archivos, setArchivos] = useState([])
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [mostrarResolucion, setMostrarResolucion] = useState(false)
    const [mostrarComentario, setmostrarComentario] = useState(false)
    const [regionElegida, setregionElegida] = useState(0)
    const [estado, setEstado] = useState("Por inscribir")
    const [retroalimentacion, setRetroalimentacion] = useState("")
    // const [estadoPractica, setEstadoPractica] = useState({})
    const toggleTooltip =() =>{
        setTooltipOpen(!tooltipOpen)
    }
    const [modal, setModal] = useState(false)
    const [nameDownloaded, setnameDownloaded] = useState("")
    const toggle = () =>{
        setModal(!modal)
    }
    const changeNameDownloaded = (name)=>{
        setnameDownloaded(name)
    }
    const handleDownload = ( namefile ) => {
        toggle()
        changeNameDownloaded(namefile)
        console.log("descargando " ,namefile)    
    }
    
    const postInscripcion = (event) =>{
      event.preventDefault()
      console.log("Info a enviar:",formValues)
      enviarDatosInscripcion()
    }
    const enviarDatosInscripcion = () => {    
      console.log(regionElegida, "-",formValues.zonaempresa)
      axios.post(
        "http://localhost/GestionPracticas_G4/ci-practicas-back/public/inscribirInfo",
        {
          id_alumno:id_alumno,
          nropractica:nroPractica,
          empresa:formValues.empresa,
          supervisor:formValues.supervisor,
          fch_inicio:formValues.fechaStart,
          fch_termino:formValues.fechaEnd,
          rut_empresa:formValues.rutempresa,
          correo_supervisor:formValues.correosupervisor,
          tel_supervisor: formValues.fonosupervisor,
          region_empresa: formValues.regionempresa,
          zona_empresa:formValues.zonaempresa,
          nombre_emer:formValues.nombre_emer,
          tel_emer: formValues.tel_emer
        },
      )
      .then(response=>{
        // console.log("RESPUESTA ENVIAR DATOS INSC: ",response)
        if(response.data===1){
          // console.log("ES TRUE")
          setEstado("Pendiente")
          setMostrarResolucion(true)
        }
      })
      .catch(error =>{
        console.log("Error enviando datos inscripcion: ", error)
      })
    }
    const getEstadoPractica = async() => {
      await axios.post(
        "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getEstadoPracticaActiva",
        {
          id_alumno: id_alumno,
          nropractica:nroPractica,
        },
      )
        .then(response => {
          console.log("RESPUESTA ESTADO PRACTICA ACTIVA:  ",response.data)
          if(response.data[0].estado==="Rechazada"){
            // setEstado("Rechazada")          
            setEstado("")
            setMostrarResolucion(false)
            setmostrarComentario(true)
            solicitarRetroalimentacion()
          }
          if(response.data[0].estado==="Aprobada"){
            setEstado("Aprobada")
            setMostrarResolucion(true)
          }
          else if(response.data[0].estado!=="Por inscribir"){

          }
          
          // setEstadoPractica(response.data[0])
          // setArchivos(response.data)
        })
        .catch(error => {
          console.log("login error: ", error);
    });
    }
    const solicitarRetroalimentacion  = () => {
      axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/getRetroalimentacion",{
        id_alumno:id_alumno,
        'nropractica': nroPractica
      }).then(response=>{
        console.log(response.data)
        if(response.data !== 0){
          setRetroalimentacion(response.data[0].retroalimentacion)
        }
      }).catch(error=>{
        console.log("ERROR RETROALIMENTACION ",error)
      })
    }
    const getDocs = async() => {
        let id_alumno = cookies.get('id')
        // let numeropractica = 1
        await axios.post(
            "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getInstDocuAlumno",
            {
              id_alumno: id_alumno,
              numero: nroPractica,
            },
          )
            .then(response => {
              console.log("RESPUESTA INSTANCIAS DOCUMENTOS:  ",response.data)
              setArchivos(response.data)
            })
            .catch(error => {
              console.log("ERROR EN GET DOCUMENTOS: ", error);
        });
    }
    const handleChangeRegion = (event) => {
      console.log(event.target.value)
      setregionElegida(event.target.value)
      handleInputChange(event)
    }

    useEffect(() => {   
      getEstadoPractica()
      getDocs()    
    }, [])
    
    return (
        <div className="animate__animated animate__fadeIn animate__faster">
          {mostrarResolucion 
          ? <Resolucion 
            previousPage={previousPage} 
            handleSubmit={handleSubmit}
            estado={estado}
            /> 
          : 
          <div>
            {mostrarComentario && 
            (
              <div style={{padding:15}}>             
                <Alert severity="error" style={{marginBottom:"1vh"}}>
                  ¡Han rechazado tu inscripción! Podrás completar o corregir la 
                  información errónea, toma en cuenta la retroalimentación que se muestra a continuación.
                </Alert>    
                <Comentario mensaje={retroalimentacion} />
              </div>
            )}
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Descarga de archivo</ModalHeader>
                <ModalBody>
                    Descargando archivo
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Aceptar</Button>
                </ModalFooter>
            </Modal>               
            <Form onSubmit={postInscripcion}>
              <div className="container">
                <h4>Datos de Practica</h4>
                <hr/>         
                  <div className="row" style={{marginBottom:"15px"}}>
                    {/* Input para fecha de inicio */}
                    <div className="col">
                      <Label for = "fechaStart"> Fecha de inicio</Label>
                      <Input type="date" name="fechaStart" onChange={handleInputChange}/>      
                    </div>
                    {/* Input para fecha de termino */}
                    <div className="col">
                      <Label  for = "fechaEnd"> Fecha de término</Label>
                      <Input type="date" name="fechaEnd" onChange={handleInputChange}/>            
                    </div>
                  </div>  
                <h4 style={{marginTop:"30px"}}>Datos de Empresa</h4>
                <hr/>
                <div className="row" style={{marginBottom:"15px"}}>
                  {/* Input para rut de empresa */}
                  <div className="col-sm">
                    <Label  for = "empresa"> Nombre de Empresa </Label>
                    <Input type="text" name="empresa" onChange={handleInputChange}/>
                  </div>
                  
                  {/* Input para rut de empresa */}
                  <div className="col-sm">
                    <Label for = "rutempresa">RUT de Empresa</Label>
                    <Input type="text" name="rutempresa" onChange={handleInputChange} />  
                  </div>
                  
                </div> 
                <div className="row" style={{marginBottom:"15px"}}>
                  {/* Input para nombre de supervisor */} 
                  <div className="col-sm">
                    <Label for = "supervisor"> Nombre de Supervisor </Label>
                    <Input type="text" name="supervisor" onChange={handleInputChange} />                   
                  </div>
                  <div className="col-sm">
                  <Label for = "correosupervisor">Correo de Supervisor</Label>
                    <Input type="email" name="correosupervisor" onChange={handleInputChange} />                  
                  </div>
                </div>  
                <div className="row" style={{marginBottom:"15px"}}>
                  {/* Input para rut de empresa */}       
                  <div className="col-sm">
                    <Label for = "fonosupervisor">Teléfono Supervisor</Label>
                    <Input type="text" name="fonosupervisor" onChange={handleInputChange} />  
                  </div>
                  <div className="col-sm">
                                
                  </div>
                </div>                                
                <div className="row" style={{marginBottom:"15px"}}>
                  <div className="col-sm">
                    <Label for = "regionempresa">Ubicación: Región o Internacional</Label>
                    <Input type="select" name="regionempresa" onChange={handleChangeRegion}> 
                      {regiones.map((option,index)=>(
                        <option key={index} value={index}>{option.numero}{option.region} </option>
                      ))}
                    </Input>                    
                  </div>    
                  <div className="col-sm">
                    <Label for = "zonaempresa">Ubicación: Comuna o País</Label>
                    <Input type="select" name="zonaempresa" onChange={handleInputChange}>
                      {regiones[regionElegida].comunas.map((comuna,index)=>(
                        <option key={index}>{comuna} </option>
                      ))}
                    </Input>
                  </div>
                </div>   
                
                          
                <h4 style={{marginTop:"30px"}}>Datos de Contacto de Emergencia</h4>
                <hr/>
                <div className="row" style={{marginBottom:"15px"}}>
                  <div className="col-sm">
                    <Label for = "nombre_emer">Nombre</Label>
                    <Input type="text" name="nombre_emer" onChange={handleInputChange}/>                
                  </div>
                  <div className="col-sm">
                    <Label for = "tel_emer">Télefono</Label>
                    <Input type="number" name="tel_emer" onChange={handleInputChange}/>  
                  </div>
                </div>                              
                <h4 style={{marginTop:"30px"}}>
                  Documentos <span style={{textDecoration: "underline", color:"blue"}} href="#" id="infoDocs">i</span>
                </h4>
                <Tooltip placement="right" isOpen={tooltipOpen} target="infoDocs" toggle={toggleTooltip}>
                    Primero debes descargar tus documentos, editarlos y luego subirlos con tu información.
                </Tooltip>
                <hr/>
                {/* Por cada archivo presente en el arreglo archivos, crea el formulario para descargarlo y subirlo */}
                {                  
                    archivos.map( (file,index) => (
                        <div key={index} className="container" style={{marginBottom:"10px"}}>
                          <div className="row">
                              <div className="col-sm">
                                <Label >{file.nombre}</Label>      
                              </div>
                              <div className="col-auto">
                                <Button onClick={handleDownload} color="info">
                                    <MdFileDownload/>
                                </Button> 
                              </div>
                              <div className ="col-sm">
                                {file.requerido === "1" &&                        
                                    <CustomInput 
                                      type="file" 
                                      name={`namefile${index}`} 
                                      id={`file${index}`} 
                                      label="Sube tu archivo"                                     
                                    />
                                }
                              </div>
                          </div>
                          <div className="row">
                            {file.comentario !== "" &&
                            (
                              <div className="col" style={{marginTop:"10px"}}>
                                <Comentario mensaje={file.comentario}/>                  
                              </div>
                            )
                            }
                            
                          </div>                            
                        </div>
                    ))
                }
              </div> 
              <hr/>
              <div className="text-center" style={{marginBottom:20}}>
                <Button className="btn btn-primary" type="submit" onClick={enviarDatosInscripcion}>
                    Inscribir Practica
                </Button>
              </div>               
            </Form>
          </div>
        }
        </div>
    )
}
