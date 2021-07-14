import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Link
} from 'reactstrap';
import PersonIcon from '@material-ui/icons/Person';
//import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notifications from "react-notifications-menu"
import notificationIcon from '../../ui/NavBar/Notificaciones/notificationIcon.png'

const NavBarBtrap = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const data = [
    {
      image :'../../../../public/IconUser.png' ,
      message : 'solicitud de practica aceptada.',
      detailPage : '/admin', 
      receivedTime:'3 días Atras'
    },
    {
      image :'../../../../public/IconUser.png' ,
      message : 'Datos ingresados, se le notificaran los resultados.',
      detailPage : '/admin', 
      receivedTime:'1 día atras'
    },
    {
      image :'../../../../public/IconUser.png' ,
      message : 'Datos Aceptados, ingrese los documentos.',
      detailPage : '/admin', 
      receivedTime:'12 horas atras'
    },
    {
      image :'../../../../public/IconUser.png' ,
      message : 'Se han aceptado los documentos, puedes iniciar tu practica profesional.',
      detailPage : '/admin', 
      receivedTime:'30 min atras'
    }
 ]


  return (
    <div>
      <Navbar className="shadow-none" color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
               <div style={{
                width: '15px',
                height: '15px',
                marginLeft: '25px', 
                marginRight: '25px',
                marginTop: '15px',
                marginBottom: '15px',
                alignItems: 'center'
              }}>
                    {/*<Notifications 
                        data={data}                         
                        height='25px'
                        width='150px'
                      
                        classNamePrefix='okrjoy'
                        cardOption={data => console.log(data)}
                        viewAllbtn={{ text: 'ver mas...', linkTo: '/seeAll' }}
                        markAsRead={data => console.log(data)}
                        headerBackgroundColor = '#f6f7f9'
                        header={
                            {
                            title: 'Notificaciones',
                            option: { text: 'View All', onClick: () => console.log('Clicked') },
                            }}
                        icon={notificationIcon}
                    />*/}
                    <Notifications 
                    data={data} 
                    icon={notificationIcon}
                    width='250px'
                    viewAllbtn={{ text: 'ver mas...', linkTo: '/seeAll' }}
                    header={
                      {
                        title: 'Notificaciones',
                        option: { text: 'Ver más...', onClick: () => {} }
                      }
                    }
                    />
                </div>
                
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav style={{ marginLeft: '25px', marginRight: '25px' }}>
                <PersonIcon />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem >
              <NavLink
                className="nav-item nav-link"
                exact to="/login"
                style={{ marginLeft: '25px', marginRight: '25px' }}
              >
                <ExitToAppIcon />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarBtrap;