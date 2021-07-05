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
import { FaFileAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import Badge from '@material-ui/core/Badge';
import Container from 'react-bootstrap/Container'
import { Fragment } from 'react';
import StickyBox from "react-sticky-box";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function SideBar() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <Fragment>
      <nav className='nav-menu'>
          <ul className='nav-menu-items nav-menu'>
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
                <span className="text">Prácticas</span>
              </Link>
            </li>
            <Divider variant="middle" light={true} />

            <li className="nav-text">
              <Link to="/admin/estudiantes" >
                <MdPeople />
                <span className="text">Estudiantes</span>
              </Link>
            </li>
            <Divider variant="middle" light={true} />

            <li className="nav-text">
              <Link to="/admin/administradores" >
                <IoKeySharp />
                <span className="text">Funcionarios</span>
              </Link>
            </li>
            <Divider variant="middle" light={true} />

            <li className="nav-text">
              <Link to="/admin/ofertas" >
                <MdLocalOffer />
                <span className="text">Gestionar Práctica</span>
              </Link>
            </li>

            <Divider variant="middle" light={true} />

            <li className="nav-text">
              <Link to="/admin/plan" >
                <FaFileAlt />
                <span className="text">Gestionar Documentos</span>
              </Link>
            </li> 

            <Divider variant="middle" light={true} />

            <li className="nav-text">
                <Link to="#">
                  <IoPerson />
                </Link>
                <Link to="#" >
                  <IoNotifications />
                </Link>
                <Link to="/" >
                  <IoExit />
                </Link>
            </li>

          </ul>
      </nav>
    </Fragment>
  );
}

export default SideBar;