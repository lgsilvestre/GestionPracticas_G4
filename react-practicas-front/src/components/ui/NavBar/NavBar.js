import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../SideBar/utalca.svg'
import "./NavBar.css"

export const NavBar = ({username = "Juan Perez", tipo_usuario = "Estudiante"}) => {
    return (
        <Fragment>
            {/* Componente extraido de Bootstrap! */}
            <nav className="navbar navbar-expand-sm navbar-dark">
                <Link to='/' className='menu-bars'>
                    <img src={logo} className="logo" alt="Utalca Logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/landing"
                        > Landing </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/practicas"
                        > Practicas </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/postulaciones"
                        > Postulacion </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <NavLink
                            activeClassName="active"
                            className="nav-item nav-link"
                            exact
                            to="/estudiante/changePass"
                        > {username} </NavLink>
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
