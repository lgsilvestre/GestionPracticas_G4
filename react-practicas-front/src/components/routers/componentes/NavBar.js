import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'; 
import { IoPerson } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
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
            <Nav.Item eventKey="2"><IoNotifications /></Nav.Item>
            <Nav.Item icon={<IoPerson />} size="2x" ></Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }
 export default NavBarr