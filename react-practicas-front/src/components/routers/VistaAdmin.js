import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SideBar from '../ui/SideBar/SideBar';
import SideBarSt from '../ui/SideBar/SideBarSt';
import { Footer } from '../ui/Footer/Footer';
import Estudiante from '../Pages/Estudiante/Estudiante';
import Postulaciones from '../Pages/Postulaciones';
import Ofertas from '../Pages/Ofertas/Ofertas';
import Administrador from '../Pages/Administrador/Administrador';
import { EstadoPracticas } from '../Pages/EstadoPracticas';
import { Estadisticas } from '../Pages/Estadisticas';
import { TablaEstados } from '../Pages/Administrador/EstadoPracticas/TablaEstados';
import TablePracticas from './componentes/TablePracticas';
import Plan from '../Pages/Plan/Plan';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AdminDashboard } from '../Pages/AdminDashboard/AdminDashboard';

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

const VistaAdmin = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2} sm={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10} sm={10}>
                    <div className="container">
                        <Switch>
                            <Route path='/admin/practicas' component={TablaEstados} />
                            <Route path='/admin/administradores' component={Administrador} />
                            <Route path='/admin/estudiantes' component={Estudiante} />
                            <Route path='/admin/postulaciones' component={Postulaciones} />
                            <Route path='/admin/ofertas' component={Ofertas} />
                            <Route path='/admin/plan' component={Plan} />
                            <Route path='/admin/estadisticas' component={Estadisticas} />
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

export default VistaAdmin
