import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import logo from '../SideBar/utalca.svg'
import "./NavBar.css"
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import logo from '../SideBar/logos/whitelogo-nav.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import PersonIcon from '@material-ui/icons/Person';
//import Notification from './Notificaciones/Notification'
import Notifications from "react-notifications-menu"
//import logo1 from './logos/whitelogo-1.png';

export const NavBar = ({ tipo_usuario = "Estudiante" }) => {

    const cookies = new Cookies();

    const [showPer, setShowPer] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);


    const data = [
        {
          image :'https://synergi-dev.s3.ap-southeast-1.amazonaws.com/profile-pictures/6b9.png' ,
          message : 'Lorem ipsum dolor sit amet.',
          detailPage : '/events', 
          receivedTime:'12h ago'
        }
     ];
     /*
    const listItems = [
        {
          UTC: "1408648665",
          list: [
            {
              type: "Message",
              content: "A messgae description for testing notofication bar",
              count: 3,
              timestamp: "1PM"
            }
          ]
        },
        {
          UTC: "1598103780",
          list: [
            {
              type: "Login",
              content: "A messgae description for testing notofication bar",
              count: 1
            }
          ]
        },
        {
          UTC: "1595594400",
          list: [
            {
              type: "Login",
              content: "A messgae description for testing notofication bar",
              count: 4
            }
          ]
        },
        {
          UTC: "1595575200",
          list: [
            {
              type: "Critical",
              content: "A messgae description for testing notofication bar",
              count: 3
            }
          ]
        }
    ];
    */
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
                            style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', fontWeight: '400' }}
                        > Home </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/practicas"
                            style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', fontWeight: '400' }}
                        > Prácticas </NavLink>
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-item nav-link"
                            to="/estudiante/postulaciones"
                            style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', fontWeight: '400' }}
                        > Documentos </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">

                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', fontWeight: '400', backgroundColor: '#132038' }} caret>
                                {cookies.get('name')}
                            </DropdownToggle>
                            <DropdownMenu>
                                {/* <DropdownItem header>Cambiar contraseña</DropdownItem>
                                <DropdownItem>

                                    <NavLink
                                        activeClassName="active"
                                        className="nav-item nav-link"
                                        exact
                                        to="/estudiante/changePass"
                                        
                                    >
                                        Some Action
                                    </NavLink>
                                </DropdownItem> */}
                                {/* <DropdownItem text>Dropdown Item Text</DropdownItem>
                                <DropdownItem disabled>Action (disabled)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Foo Action</DropdownItem>
                                <DropdownItem>Bar Action</DropdownItem>
                                <DropdownItem>Quo Action</DropdownItem> */}
                            </DropdownMenu>
                        </Dropdown>

                        {/* <Dropdown 
                                icon={<PersonIcon />} 
                                open={showPer}
                                onMouseEnter={showDropdownPer}
                                onMouseLeave={hideDropdownPer}
                                noCaret
                            >
                                <Dropdown.Item eventKey="4">{cookies.get('name')}</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Configuración</Dropdown.Item>
                                <Dropdown.Item eventKey="6">Historial</Dropdown.Item>
                            </Dropdown> */}
                        {/* <p>
                                {cookies.get('name')}
                            </p>   */}

                        <NavLink
                            className="nav-item nav-link"
                            exact to="/login"
                            style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', fontWeight: '400' }}
                        >
                            <ExitToAppIcon />
                        </NavLink>
                    </ul>
                </div>
                
                <div>
                    <Notifications 
                        data={data} 
                        height='500px'
                        width='300px'
                        classNamePrefix='okrjoy'
                        cardOption={data => console.log(data)}
                        viewAllbtn={{ text: 'see all', linkTo: '/seeAll' }}
                        markAsRead={data => console.log(data)}
                        headerBackgroundColor = 'red'
                        header={
                            {
                            title: 'Notifications',
                            option: { text: 'View All', onClick: () => {} }
                            }
                        }
                    />
                </div>
            </nav>
            

        </Fragment>
    )
}
