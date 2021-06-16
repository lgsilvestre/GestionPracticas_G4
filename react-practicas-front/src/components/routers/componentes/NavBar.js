import { Navbar, Nav, Dropdown } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; 
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styles from './NavBarStyle.css';

const NavBarr = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar className={styles.navBarCustom}>
        <Navbar.Body>
          <Nav onSelect={onSelect} activeKey={activeKey}>
            {/* <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              Home
            </Nav.Item> */}
            <Dropdown title="About">
              <Dropdown.Item eventKey="4">Company</Dropdown.Item>
              <Dropdown.Item eventKey="5">Team</Dropdown.Item>
              <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item eventKey="2"><NotificationsIcon fontSize="small"/></Nav.Item>
            <Nav.Item icon={<PersonIcon />} ></Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }
 export default NavBarr