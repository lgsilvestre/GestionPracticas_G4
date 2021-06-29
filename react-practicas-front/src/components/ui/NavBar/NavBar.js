import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
//import logo from '../SideBar/utalca.svg'
import "./NavBar.css"
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import logo from '../SideBar/logos/whitelogo-nav.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Dropdown } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; 
import PersonIcon from '@material-ui/icons/Person';
//import logo1 from './logos/whitelogo-1.png';

export const NavBar = ({tipo_usuario = "Estudiante"}) => {

    const cookies = new Cookies();
    const [showPer, setShowPer] = useState(false);

    const showDropdownPer = () => {
        setShowPer(!showPer);
      }
      
    const hideDropdownPer = () => {
      setShowPer(false);
    }

    useEffect(() => {
        // Update the document title using the browser API
        // console.log(cookies.get('id'))
        // console.log(cookies.get('name'))
        console.log("USE EFECT NAVBAR")
        
    });

    return (
        <Fragment>
            {/* Componente extraido de Bootstrap! */}
            <nav className="navbar navbar-expand-sm navbar-dark naax">
                <Link to='/' className='menu-bars'>
                    <img src={logo} className="logo" alt="Utalca Logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante"
                        > Home </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/practicas"
                            style={{marginLeft:'15px', marginRight:'15px', fontSize:'22px', fontWeight:'400'}}
                        > Prácticas </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/postulaciones"
                            style={{marginLeft:'15px', marginRight:'15px', fontSize:'22px', fontWeight:'400'}}
                        > Documentos </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/estudiante/changePass"
                            style={{marginLeft:'15px', marginRight:'15px', fontSize:'22px', fontWeight:'400'}}
                        >
                            <Dropdown 
                                icon={<PersonIcon />} 
                                open={showPer}
                                onMouseEnter={showDropdownPer}
                                onMouseLeave={hideDropdownPer}
                                noCaret
                            >
                                <Dropdown.Item eventKey="4">{cookies.get('name')}</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Configuración</Dropdown.Item>
                                <Dropdown.Item eventKey="6">Historial</Dropdown.Item>
                            </Dropdown>
                            {/* <p>
                                {cookies.get('name')}
                            </p>   */}
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link"
                            exact to="/login"
                            style={{marginLeft:'15px', marginRight:'15px', fontSize:'22px', fontWeight:'400'}}
                        >
                            <ExitToAppIcon />
                        </NavLink>
                    </ul>
                </div>
            </nav>

        </Fragment>
    )
}
