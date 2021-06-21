import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
//import logo from '../SideBar/utalca.svg'
import "./NavBar.css"
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import logo from '../SideBar/logos/whitelogo-1.png';
//import logo1 from './logos/whitelogo-1.png';

export const NavBar = ({tipo_usuario = "Estudiante"}) => {

    const cookies = new Cookies();

    useEffect(() => {
        // Update the document title using the browser API
        console.log(cookies.get('id'))
        console.log(cookies.get('name'))
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
                        > Prácticas </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/postulaciones"
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
                        > {cookies.get('name')} </NavLink>
                        <NavLink
                            className="nav-item nav-lin"
                            exact to="/login">
                            <button className="btn btn-danger" >
                                Cerrar Sesion
                            </button>
                        </NavLink>
                    </ul>
                </div>
            </nav>

        </Fragment>
    )
}
