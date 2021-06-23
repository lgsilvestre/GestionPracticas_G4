import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; 
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './NavBarStyle.css';
import HelpIcon from '@material-ui/icons/Help';



const NavBarr = ({ onSelect, activeKey, ...props }) => {

  const [show, setShow] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [showPer, setShowPer] = useState(false);

  const showDropdown = (e)=>{
    setShow(!show);
  }
  const hideDropdown = e => {
      setShow(false);
  }

  const showDropdownNot = (e)=>{
    setShowNot(!showNot);
  }
  const hideDropdownNot = e => {
      setShowNot(false);
  }

  const showDropdownPer = () => {
    setShowPer(!showPer);
  }
  
  const hideDropdownPer = () => {
    setShowPer(false);
  }

    return (
      <Navbar className={styles.navBarCustom}>
        <Navbar.Body>
          <Nav onSelect={onSelect} activeKey={activeKey}>
            {/* <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              Home
            </Nav.Item> */}
            <Dropdown 
              icon={<HelpIcon />} 
              open={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
              noCaret
            >
              <Dropdown.Item eventKey="4">Acerca de</Dropdown.Item>
              <Dropdown.Item eventKey="5">Contacto</Dropdown.Item>
              <Dropdown.Item eventKey="6">Universidad</Dropdown.Item>
              <Dropdown.Item eventKey="6">Atajos</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>

              <Dropdown 
                icon={<NotificationsIcon />} 
                open={showNot}
                onMouseEnter={showDropdownNot}
                onMouseLeave={hideDropdownNot}
                noCaret
              >
                <Dropdown.Item eventKey="4">02:02 PM: Práctica Inscrita</Dropdown.Item>
                <Dropdown.Item eventKey="5">02:02 PM: Práctica Inscrita</Dropdown.Item>
                <Dropdown.Item eventKey="6">02:02 PM: Práctica Inscrita</Dropdown.Item>
              </Dropdown>

              <Dropdown 
                icon={<PersonIcon />} 
                open={showPer}
                onMouseEnter={showDropdownPer}
                onMouseLeave={hideDropdownPer}
                noCaret
              >
                <Dropdown.Item eventKey="4">Mi cuenta</Dropdown.Item>
                <Dropdown.Item eventKey="5">Configuración</Dropdown.Item>
                <Dropdown.Item eventKey="6">Historial</Dropdown.Item>
              </Dropdown>

            <Nav.Item icon={<ExitToAppIcon /> } ></Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }
 export default NavBarr