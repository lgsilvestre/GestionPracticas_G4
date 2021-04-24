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
                <img src={logo}   className="logo"  alt="Utalca Logo"  />                  
              </Link>
            </li> 
               

              <li className="nav-text">   
              <Link to="/practicas" >       
                <MdWork />
                  <span className="text">Practicas</span> 
              </Link>                     
              </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">  
              <Link to="/estudiantes" >                
                <MdPeople />
                  <span className="text">Estudiantes</span>   
                  </Link>                  
              </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">    
              <Link to="/postulaciones" >              
                <MdDescription />
                  <span className="text">Postulaciones</span>  
                  </Link>                   
              </li>
              <Divider variant="middle" light={true}/>

              <li className="nav-text">   
              <Link to="/ofertas" >               
                <MdLocalOffer />
                  <span className="text">Ofertas</span>  
                  </Link>                   
              </li>

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;