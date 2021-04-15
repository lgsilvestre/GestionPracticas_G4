import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../SideBar/utalca.svg'
import "./style.css"
export const NavBar = () => {
    return (
        <Fragment>
            {/* Componente extraido de Bootstrap! */}
           <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to='#' className='menu-bars'>             
                    <img src={logo} className="logo" alt="Utalca Logo"  />                  
                </Link>  
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">  
                    <div className = "navbar-nav">
                        
                        <NavLink 
                            exact 
                            activeClassName="active" 
                            className="nav-item nav-link" 
                            to="./practicas"
                        > Practicas </NavLink>                       
                        <NavLink 
                            exact 
                            activeClassName="active" 
                            className="nav-item nav-link" 
                            to="./about"
                        >  </NavLink>       
                        <NavLink 
                            exact 
                            activeClassName="active" 
                            className="nav-item nav-link" 
                            to="./postulaciones"
                        > Postulacion </NavLink>             
                    </div>
                </div>             
            </nav>
        </Fragment>
    )
}
