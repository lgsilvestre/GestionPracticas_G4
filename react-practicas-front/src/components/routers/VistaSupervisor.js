import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SidePro from '../ui/SidebarSupervisor/SidePro';
import Estudiante from '../Pages/Estudiante/Estudiante';
import Postulaciones from '../Pages/Postulaciones';
import Ofertas from '../Pages/Ofertas/Ofertas';
import Documentos from '../Pages/Documentos/Documentos';
import Administrador from '../Pages/Administrador/Administrador';
import { TablaEstados } from '../Pages/Administrador/EstadoPracticas/TablaEstados';
import Grid from '@material-ui/core/Grid';
import {PracticasInactivas} from '../Pages/PracticasInactivas/PracticasInactivas'
import { makeStyles } from '@material-ui/core/styles';
import { SupervisorDashboard } from '../Pages/SupervisorDashboard/SupervisorDashboard';
import NavBarr from './componentes/NavBar';
import './AppRouterStyle.css';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const VistaSupervidor = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div ></div>
            <Grid container>
                <Grid item xs={2} sm={2}>
                    {/* <SideBar/> */}
                    <SidePro />
                </Grid>
                <Grid item xs={10} sm={10} className="Container Scroll">
                    {/* <NavBarr /> */}
                    <Divider variant="middle" light={true} />  
                    <div className="container">
                        <Switch>
                            <Route path='/supervisor/practicas' component={TablaEstados} />
                            <Route path='/supervisor/inactivas' component={PracticasInactivas} />
                            <Route path='/supervisor/administradores' component={Administrador} />
                            <Route path='/supervisor/estudiantes' component={Estudiante} />
                            <Route path='/supervisor/postulaciones' component={Postulaciones} />
                            <Route path='/supervisor/ofertas' component={Ofertas} />
                            <Route path='/supervisor/documentos' component={Documentos} />
                            <Route path="/supervisor">
                                <SupervisorDashboard />
                            </Route>

                        </Switch>

                    </div>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default VistaSupervidor
