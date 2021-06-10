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
import logo from './utalca.svg'
import Container from 'react-bootstrap/Container'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';


const SidePro = () => {

    return (
        <ProSidebar style={{width:'100%'}}>            
            <Menu iconShape="square">    
                <MenuItem >
                <div>
                <Box style={{ marginBottom:'20px', marginTop:'25px',width:'100%', display:'flex', justifyContent:'center', alignContent:'center'}}>
                    
                    <Link to='/admin' className='menu-bars'>
                        <img src={logo} className={styles.centerimage} alt="Utalca Logo"/>        
                    </Link>
                </Box>
                </div>
                    
                </MenuItem>   
                <Divider variant="middle" light={true} />     

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}}>
                    <Link to="/admin/practicas" >
                        <MdWork />
                        <span className="text">Prácticas</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/estudiantes" >
                        <MdPeople />
                        <span className="text">Estudiantes</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/administradores" >
                        <IoKeySharp />
                        <span className="text">Funcionarios</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/ofertas" >
                        <MdLocalOffer />
                        <span className="text">Gestionar Práctica</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/plan" >
                        <FaFileAlt />
                        <span className="text">Gestionar Documentos</span>
                    </Link>
                </MenuItem>
            </Menu>

            <Divider variant="middle" light={true} style={{marginTop:'20px', marginBottom:'20px'}}/>

            <Menu iconShape="square">  
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/plan" >
                     <IoNotifications />
                        <span className="text">Notificaciones</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/plan" >
                        <IoPerson />
                        <span className="text">Perfil</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}}>
                    <Link to="/admin/plan" >
                        <IoExit />
                        <span className="text">Cerrar Sesión</span>
                    </Link>
                </MenuItem>
                    
            </Menu>

        </ProSidebar>
    )
}

export default SidePro