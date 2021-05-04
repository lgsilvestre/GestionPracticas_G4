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
import { IoKeySharp } from "react-icons/io5";


function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>             
                <img src={logo}   className="logoUtal"  alt="Utalca Logo"  />                  
              </Link>
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
                  <span className="text">Ingresar Practica</span>  
                  </Link>                   
              </li>
              <li className="nav-text">   
              <Link to="/admin/estadisticas" >               
                <MdLocalOffer />
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