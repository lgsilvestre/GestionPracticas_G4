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
import { useState } from 'react';

const SidePro = () => {

    const [weight, setweight] = useState(600);

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
      };

    return (
        <ProSidebar style={{width:'100%'}} image={Backside}>            
            <Menu iconShape="square">   

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'20px'}}>
                    <Link to="/supervisor" >
                        <img src={logo1} className={styles.centerimage} alt="Utalca Logo"/>
                    </Link>
                </MenuItem>
                     
                <Divider variant="middle" light={true} style={{backgroundColor:'#969696'}} fluid/>     

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}} value="practicas" onClick={handleChange}>
                    <Link to="/admin/practicas" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdWork/>
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>
                            Prácticas
                        </span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}} value="estudiantes" onClick={handleChange}>
                    <Link to="/admin/estudiantes" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdPeople />
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}} >Estudiantes</span>
                    </Link>
                </MenuItem>
    
                <MenuItem style={{marginBottom:'10px'}} value="gestionar_p" onClick={handleChange}>
                    <Link to="/admin/ofertas" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdLocalOffer />
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>Gestionar Práctica</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginBottom:'10px'}} value="documentos" onClick={handleChange}>
                    <Link to="/admin/plan" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <FaFileAlt />
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>Documentos</span>
                    </Link>
                </MenuItem>
            </Menu>

        </ProSidebar>
    )
}

export default SidePro