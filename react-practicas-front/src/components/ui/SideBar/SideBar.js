import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from './utalca.svg'
import './styles.css';
import Divider from '@material-ui/core/Divider';
import { IconContext } from 'react-icons';
import { MdWork } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { IoKeySharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import Badge from '@material-ui/core/Badge';
import Container from 'react-bootstrap/Container'

function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }} style={{overflow: "hidden"}}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="justify-content-end">
            <Badge>
              <IoNotifications style={{ fontSize: 25 , marginRight: "20px"}}/>
            </Badge>
            <Badge>
              <IoPerson style={{ fontSize: 25 , marginRight: "10px"}}/>
            </Badge>
          </div>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{float: "left"}}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Container fluid>
              <Link to='#' className='menu-bars'>             
                <img src={logo} className="logoUtal" alt="Utalca Logo" />                  
              </Link>
              </Container>
              
            </li> 
               

              <li className="nav-text">   
              <Link to="/admin/practicas" >       
                <MdWork />
                  <span className="text">Practicas</span> 
              </Link>                     
              </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">  
              <Link to="/admin/estudiantes" >                
                <MdPeople />
                  <span className="text">Estudiantes</span>   
                  </Link>                  
              </li>
              <Divider variant="middle" light={true}/>

            <li className="nav-text">  
            <Link to="/admin/administradores" >                
            <IoKeySharp />
                <span className="text">Aministradores</span>   
                </Link>                  
            </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">    
              <Link to="/admin/postulaciones" >              
                <MdDescription />
                  <span className="text">Postulaciones</span>  
                  </Link>                   
              </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">   
              <Link to="/admin/ofertas" >               
                <MdLocalOffer />
                  <span className="text">Gestionar Practica</span>  
                  </Link>                   
              </li>
              <li className="nav-text">   
              <Link to="/admin/estadisticas" >               
                <EqualizerIcon />
                  <span className="text">Estadisticas</span>  
                  </Link>                   
              </li>

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;