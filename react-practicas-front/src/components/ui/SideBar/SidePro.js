import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { MdWork } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { IoKeySharp } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import styles from "./sidePro.scss";
import logo from './utalca.svg';
import logo1 from './logos/whitelogo-1.png';
import Container from 'react-bootstrap/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Backside from "./back/backside.png";
 

const SidePro = () => {

    return (
        <ProSidebar style={{width:'100%'}} image={Backside}>            
            <Menu iconShape="square">   

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}}>
                    <Link to="/admin/practicas" >
                        <img src={logo1} className={styles.centerimage} alt="Utalca Logo"/>
                    </Link>
                </MenuItem>
                     
                <Divider variant="middle" light={true} />     

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}}>
                    <Link to="/admin/practicas" >
                        <MdWork />
                        <span className="text" style={{fontWeight:'bold', fontSize:'18px'}}>Prácticas</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/estudiantes" >
                        <MdPeople />
                        <span className="text" style={{fontWeight:'bold', fontSize:'18px'}}>Estudiantes</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/administradores" >
                        <IoKeySharp />
                        <span className="text" style={{fontWeight:'bold', fontSize:'18px'}}>Funcionarios</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/ofertas" >
                        <MdLocalOffer />
                        <span className="text" style={{fontWeight:'bold', fontSize:'18px'}}>Gestionar Práctica</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/plan" >
                        <FaFileAlt />
                        <span className="text" style={{fontWeight:'bold', fontSize:'18px'}}>Gestionar Documentos</span>
                    </Link>
                </MenuItem>
            </Menu>

        </ProSidebar>
    )
}

export default SidePro