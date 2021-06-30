import {Button} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IoIosArrowBack } from "react-icons/io";
import WizardAdmin from './WizardAdmin/WizardAdmin';
// import { Navbar, Nav, Dropdown } from 'rsuite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
    }
    
}));
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const InfoEstudiante = ({handleChangeStateBack, etapaProp=1, nroMatricula, nroPractica,idAlumno}) => {
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
      setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    
    const [mostrarModal, setmostrarModal] = useState(false)
    const cerrarModal = () => {
      setmostrarModal(false)
    }
    const abrirModal = () => {
      setmostrarModal(true)
    }
    const toggleModal = () => {
      setmostrarModal(!mostrarModal)
    }
    
    const handleAceptarDelete = () => {
      console.log("Aceptando delete practica")
      cerrarModal()
    }
    
    const handleDenegar = () => {
      console.log("Preguntando delete practica")
      abrirModal()
    }
    // console.log("nro recibido en infoestudiante:",nroPractica)
    const classes = useStyles();  
    const [etapa, setEtapa] = useState(etapaProp)
    // const [etapa, setEtapa] = useState(2)
    
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
        {/* <Modal isOpen={mostrarModal} toggle={toggleModal} >
          <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAceptarDelete}>Aceptar</Button>{' '}
            <Button color="secondary" onClick={cerrarModal}>Cancelar</Button>
          </ModalFooter>
        </Modal> */}       
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
                    {/* <Dropdown 
                      icon={<MoreVertIcon />} 
                      open={show}
                      onMouseEnter={showDropdown}
                      onMouseLeave={hideDropdown}
                      noCaret
                    >
                      <Dropdown.Item 
                      icon={<DeleteForeverIcon style={{marginRight:"10px", color:"#E65F5D"}} />}  
                      eventKey="1"
                      onSelect={handleDenegar}
                      >DENEGAR</Dropdown.Item>
                    </Dropdown> */}
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
