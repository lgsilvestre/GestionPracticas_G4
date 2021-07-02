import {Button, 
  Dialog, 
  DialogActions , 
  DialogContent ,
  DialogContentText , 
  DialogTitle } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IoIosArrowBack } from "react-icons/io";
import { BsExclamationCircleFill } from "react-icons/bs";
import WizardAdmin from './WizardAdmin/WizardAdmin';
import { Input,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MdDeleteForever,MdMoreVert, MdHistory } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import axios from 'axios';
import { useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    botonBack:{
        marginBottom:'10px', 
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
      backgroundColor:"#FF7D7D",
      color:"white",
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor:'red',
          color: '#fff'
          }
    },
    botonAceptar:{
      marginRight:'10px',
      backgroundColor:"#77C78F",
      color:"white",
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor:'#0DC143',
          color: '#fff'
          }
    },
    
}));

export const InfoEstudiante = ({handleChangeStateBack, etapaProp=1, nroMatricula, nroPractica,idAlumno, idPractica}) => {
    let history = useHistory()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [retroAli, setRetroAli] = useState("")
    const handleClose = () => {
      setOpen(false);
    };
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    const cerrarModal = () => {
      setOpen(false)
    }
    const abrirModal = () => {
      setOpen(true)
    }
    
    const handleDenegarPractica = () => {
      console.log("Preguntando delete practica")
      abrirModal()
    }
    // console.log("nro recibido en infoestudiante:",nroPractica)
    const classes = useStyles();  
    const [etapa, setEtapa] = useState(etapaProp)
    // const [etapa, setEtapa] = useState(2)
    const DenegarPractica = async () => {
      await axios.post("http://localhost/GestionPracticas_G4/ci-practicas-back/public/denegarPractica",{
        id_alumno:idAlumno
      }).then(response=>{
        console.log("respuesta denegar: ",response.data)
        if(response.data ===1){
          cerrarModal()
        }
        //confimarCorreoDenegar()
      }).catch(error =>{
        console.log("ERROR DENEGANDO", error)
      })
    }
    const handleEscribirRetroAli = (event) => {
      // console.log("escribiendo", event.target.value)
      setRetroAli(event.target.value)
    }
    const mostrarHistorial = () => {
      history.push({
        pathname:"/admin/practicas/historial",
        state:{
          idAlumno:idAlumno,
          nroPractica:nroPractica,
          idPractica:idPractica
        }
      })
    }
    
    useEffect(() => {
        changeEtapaLabel()  
    }, [etapa])
    const changeEtapaLabel = () =>{
        switch (etapa) {
            case 0:
                setEtapa("Solicitar")
                break;
            case 1:
                setEtapa("Inscripción")
                break;
            case 2:
                setEtapa("Cursando")
                break;
            case 3:
                setEtapa("Evaluación")
                break;
            default:
                break;
        }
    }
    return (
      <>
      <div>    
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          <BsExclamationCircleFill size={30} color="red"/> <strong>¡Precaución! Esta es una acción irreversible.</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <hr style={{margin:0, marginBottom:10}}/>
              Estás a punto de denegar esta práctica, esto es muy diferente a rechazar una etapa en particular ya que esta
              opción inhabilita la práctica por completo. ¿Estás seguro que deseas continuar?
              <hr/>
              <div className="row justify-content-center">

                <h6 style={{color:"red", fontStyle:"italic", fontSize:17}}>Menciona las razones de denegar</h6>            
              </div>             
              <div className="row justify-content-center">
                  <div className="col-12">
                      <Input
                      // value={retroAli}
                      placeholder="Escriba aquí..."                                
                      type="textarea" 
                      invalid="true"      
                      onChange = {(event) => handleEscribirRetroAli(event)}                        
                      />  
                  </div>
              </div> 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.botonRechazo} >
              Cancelar
            </Button>
            <Button onClick={DenegarPractica} className={classes.botonAceptar} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
        <div className="animate__animated animate__fadeIn animate__faster">
            <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
                <h4 style={{marginBottom:'15px', color: '#1b2d4f'}}>
                    Prácticas &gt; Alumno
                </h4>
                <div className="row">
                  <div className="col">
                    <Button className = {classes.botonBack} startIcon={<IoIosArrowBack/>} onClick={handleChangeStateBack}>
                        Volver a tabla 
                    </Button>
                  </div>
                  <div className="col-auto">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle style={{backgroundColor:"transparent", borderColor:"transparent", color:"white"}}>
                      <MdMoreVert size={25} style={{color:"#132038"}}/>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem 
                      onClick={mostrarHistorial}
                      >
                        <BiDetail size={20}/> Detalles
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem 
                      style={{color:"red"}}
                      onClick={handleDenegarPractica}
                      >
                        <MdDeleteForever size={20} color="red"/> Denegar Práctica
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </div>
                </div>
                <WizardAdmin 
                  pageProp={etapa} 
                  classes={classes} 
                  nroMatricula={nroMatricula} 
                  nroPractica={nroPractica}
                  idAlumno={idAlumno}
                />
            </div>
        </div>
      </>
        
    )
}
