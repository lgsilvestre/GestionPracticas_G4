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
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notifications from "react-notifications-menu"

const NavBarBtrap = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const data = [
    {

      message : 'Lorem ipsum dolor sit amet.',
      detailPage : '/events', 
      receivedTime:'12h ago'
    }
 ]
  const exit = () => {

  }


  return (
    <div>
      <Navbar className="shadow-none" color="light" light expand="md">
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav style={{ marginLeft: '15px', marginRight: '15px' }}>
                <NotificationsIcon />
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

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav style={{ marginLeft: '15px', marginRight: '15px' }}>
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
                style={{ marginLeft: '15px', marginRight: '15px' }}
              >
                <ExitToAppIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <Notifications 
                data={data} 
                icon= {NotificationsIcon}
                classNamePrefix='okrjoy'
                cardOption={data => console.log(data)}
                viewAllbtn={{ text: 'see all', linkTo: '/seeAll' }}
                markAsRead={data => console.log(data)}
                headerBackgroundColor = 'blue'
                header={
                  {
                    title: 'Notifications',
                    option: { text: 'View All', onClick: () => {} }
                  }
                }
              />
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarBtrap;