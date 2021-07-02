import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { MdWork } from "react-icons/md";
import { MdPeople ,MdDashboard} from "react-icons/md";
import { GiPin } from "react-icons/gi";
import { IoKeySharp } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import styles from "./sidePro.scss";
import logo1 from './logos/whitelogo-1.png';
import Divider from '@material-ui/core/Divider';
import Backside from "./back/backside.png";
import { GoFileDirectory } from "react-icons/go";

const SidePro = () => {


    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
      };

    return (
        <ProSidebar style={{width:'100%', minWidth:80}} image={Backside}>            
            <Menu iconShape="square">   

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'20px'}}>
                    <Link to="/admin" >
                        <img src={logo1} className={styles.centerimage} alt="Utalca Logo"/>
                    </Link>
                </MenuItem>
                    
                <Divider variant="middle" light={true} style={{backgroundColor:'#969696'}} fluid/>     

                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}} value="practicas" onClick={handleChange}>
                    <Link to="/admin" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdDashboard style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'500', fontSize:'18px', marginLeft:'10px'}}>
                            Inicio
                        </span>
                    </Link>
                </MenuItem>
                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}} value="practicas" onClick={handleChange}>
                    <Link to="/admin/practicas" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdWork style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'500', fontSize:'18px', marginLeft:'10px'}}>
                            Prácticas
                        </span>
                    </Link>
                </MenuItem>
                <MenuItem className={styles.navItem} style={{marginTop:'20px', marginBottom:'10px'}} value="practicas" onClick={handleChange}>
                    <Link to="/admin/inactivas" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <GoFileDirectory style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>
                            Prácticas Inactivas
                        </span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginTop:'20px', marginBottom:'10px'}} value="estudiantes" onClick={handleChange}>
                    <Link to="/admin/estudiantes" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <MdPeople style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'500', fontSize:'18px', marginLeft:'10px'}} >Estudiantes</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginTop:'20px', marginBottom:'10px'}} value="funcionarios" onClick={handleChange}>
                    <Link to="/admin/administradores" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <IoKeySharp style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'500', fontSize:'18px', marginLeft:'10px'}}>Funcionarios</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginTop:'20px', marginBottom:'10px'}} value="gestionar_p" onClick={handleChange}>
                    <Link to="/admin/ofertas" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <GiPin style={{fontWeight:'500', fontSize:'20px',minWidth:25}}/>
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>Gestionar Práctica</span>
                    </Link>
                </MenuItem>
                <MenuItem style={{marginTop:'20px', marginBottom:'10px'}} value="gestionar_p" onClick={handleChange}>
                    <Link to="/admin/documentos" style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <IoDocumentText style={{fontWeight:'500', fontSize:'20px',minWidth:25}} />
                        <span className="text" style={{fontWeight:'600', fontSize:'18px', marginLeft:'10px'}}>Documentos</span>
                    </Link>
                </MenuItem>
               
            </Menu>

        </ProSidebar>
    )
}

export default SidePro