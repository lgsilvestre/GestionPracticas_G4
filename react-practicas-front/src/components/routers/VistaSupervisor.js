import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SidePro from '../ui/SidebarSupervisor/SidePro';
import Estudiante from '../Pages/Estudiante/Estudiante';
import Postulaciones from '../Pages/Postulaciones';
import Ofertas from '../Pages/Ofertas/Ofertas';
import Administrador from '../Pages/Administrador/Administrador';
import { TablaEstados } from '../Pages/Administrador/EstadoPracticas/TablaEstados';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AdminDashboard } from '../Pages/AdminDashboard/AdminDashboard';
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
                    <NavBarr />
                    <Divider variant="middle" light={true} />  
                    <div className="container">
                        <Switch>
                            <Route path='/admin/practicas' component={TablaEstados} />
                            <Route path='/admin/administradores' component={Administrador} />
                            <Route path='/admin/estudiantes' component={Estudiante} />
                            <Route path='/admin/postulaciones' component={Postulaciones} />
                            <Route path='/admin/ofertas' component={Ofertas} />
                            <Route path="/admin">
                                <AdminDashboard />
                            </Route>

                        </Switch>

                    </div>
                    {/*
                    <div className="container">
                        <Footer />
                    </div>
                    */}
                </Grid>
            </Grid>
        </div>
    )
}

export default VistaSupervidor