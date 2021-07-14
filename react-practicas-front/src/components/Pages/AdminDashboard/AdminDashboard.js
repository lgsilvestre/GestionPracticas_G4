import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { BiNetworkChart } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { BiTask } from "react-icons/bi";
import PracticasRegion from '../Graficos/PracticasRegion'
import PracticasAnio from '../Graficos/PracticasAnio';
import PracticasCarrera from '../Graficos/PracticasCarrera'
import Divider from '@material-ui/core/Divider';
import ReactExport from "react-export-excel";

import useStyles from './styles';


export const AdminDashboard = () => {

    const classes = useStyles();

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const practica = [
        {
            estudiante: '',
            nro_matricula: '',
            carrera: '',
            anho: '',
            etapa: '',
            estado: ''
        },        
    ];
    
    var estudiantes = [
        {
                nombre: '',
                carrera: '',
                correo_ins: '',
                password: '',
                matricula: '',
                cod_carrera: '',
                rut: '',
                fecha_nac: '',
                plan: '',
                anho_ingreso: '',
                sit_actual_periodo: '',
                nivel: '',
                nivel_99_aprobado: '',
            
        },
        
    ];
    var usuarios = [
        {
            id_usuario: '',
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            tipo: '',
            permisos: '',
            estado: '',
            refcarrera: '',
        },
    ];
    var documentos = [
        {
            id_documento: '',
            nombre: '',
            etapa: '',
            requerido: '',
            link: ''
        },
    ];

    return (
        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
            <Grid container>
                <Grid item sm={12}>
                <div className={classes.encabezado}>
                <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h3" className={classes.titulo}  >Inicio</Typography></motion.div>
                
                </div>
                </Grid>
                <Grid item sm={12}>
                    <Grid container>
                    <Grid item sm={4}>
                        <Card className={classes.root} style={{height:'100%'}}>
                            <CardActionArea className={classes.area}>
                                <CardContent className={classes.cardContent}>
                                <IconContext.Provider value={{ size: "5em" , color: "#5E8B7E"}} className={classes.icono}>
        
                                    <BiNetworkChart  />
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                        Proceso
                                    </Typography>                                   
                                    
                                </IconContext.Provider>                                    
                                        
                                </CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                                        4
                                    </Typography> 
                            </CardActionArea>
                            <Divider variant="middle" light={true} />
                            <CardActions className={classes.areaBoton}>
                                <Button className={classes.boton} size="small" color="primary">
                                    Ver prácticas
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                    <Card className={classes.root} style={{height:'100%'}}>
                            <CardActionArea className={classes.area}>
                                <CardContent className={classes.cardContent}>
                                <IconContext.Provider value={{ size: "5em" , color: "#47597E"}} className={classes.icono}>
        
                                    <CgFileDocument  />
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                        Solicitudes
                                    </Typography>                                   
                                    
                                </IconContext.Provider>                                    
                                        
                                </CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                                        2
                                    </Typography> 
                            </CardActionArea>
                            <Divider variant="middle" light={true} />
                            <CardActions className={classes.areaBoton}>
                                <Button className={classes.boton} size="small" color="primary">
                                    Ver solicitudes
                                </Button>
                            </CardActions>
                        </Card>
                      
                    </Grid>
                    <Grid item sm={4}>
                    <Card className={classes.root} style={{height:'100%'}}>
                            <CardActionArea className={classes.area}>
                                <CardContent className={classes.cardContent}>
                                <IconContext.Provider value={{ size: "5em" , color: "#D8B384"}} className={classes.icono}>
        
                                    <BiTask  />
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.label}>
                                        Finalizando
                                    </Typography>                                   
                                    
                                </IconContext.Provider>                                    
                                        
                                </CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cantidad} >
                                        6
                                    </Typography> 
                            </CardActionArea>
                            <Divider variant="middle" light={true} />
                            <CardActions className={classes.areaBoton}>
                                <Button className={classes.boton} size="small" color="primary">
                                    Ver finalizando
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    </Grid>
                    <Grid container  direction="row"  justify="space-around"   alignItems="center">
                    <Grid item xs={6} className={classes.carreras}>     
                        < PracticasCarrera/>                                      
                    </Grid>
                    <Grid item xs={4} className={classes.regiones} >           
                        <PracticasRegion  />                                  
                    </Grid>
                    <Grid item xs={12}>
                        <PracticasAnio />       
                    </Grid>
                    <br/>
                        <Grid item xs={12}>
                            <div>
                                <ExcelFile element={<Button style={{ marginTop: '20px', marginBottom: '30px', backgroundColor: '#344fa1', color: '#fff'}} >decargar los datos</Button>} color="primary" filename="Datos Gestion de Practicas">
                                    <ExcelSheet data={practica} name="practicas">
                                        <ExcelColumn label="Estudiante" value="estudiante"/>
                                        <ExcelColumn label="Nro_matricula" value="nro_matricula"/>
                                        <ExcelColumn label="Carrera" value="carrera"/>
                                        <ExcelColumn label="Año" value="anho"/>
                                        <ExcelColumn label="Etapa" value="etapa"/>
                                        <ExcelColumn label="Estado" value="estado"/> 
                                     </ExcelSheet>

                                    <ExcelSheet data={estudiantes} name="Estudiantes">
                                        <ExcelColumn label="nombre" value="nombre"/>
                                        <ExcelColumn label="Carrera" value="carrera"/>
                                        <ExcelColumn label="Correo_ins" value="correo_ins"/>
                                        <ExcelColumn label="Password" value="password"/>
                                        <ExcelColumn label="Matricula" value="matricula"/>
                                        <ExcelColumn label="Cod_carrera" value="cod_carrera"/>
                                        <ExcelColumn label="Rut" value="rut"/> 
                                        <ExcelColumn label="Fecha_nac" value="fecha_nac"/>  
                                        <ExcelColumn label="Plan" value="plan"/>
                                        <ExcelColumn label="Anho_ingreso" value="anho_ingreso"/>
                                        <ExcelColumn label="Sit_actual_periodo" value="sit_actual_periodo"/>
                                        <ExcelColumn label="Nivel" value="nivel"/>
                                        <ExcelColumn label="Nivel_99_aprobado" value="nivel_99_aprobado"/>
                                    </ExcelSheet>

                                    <ExcelSheet data={usuarios} name="Usuarios">
                                        <ExcelColumn label="Id_usuario" value="id_usuario"/>
                                        <ExcelColumn label="Nombre" value="nombre"/>
                                        <ExcelColumn label="Apellido" value="apellido"/>
                                        <ExcelColumn label="Email" value="email"/>
                                        <ExcelColumn label="Password" value="password"/>
                                        <ExcelColumn label="Tipo" value="tipo"/>                                      
                                        <ExcelColumn label="Permisos" value="permisos"/> 
                                        <ExcelColumn label="Estado" value="estado"/>  
                                        <ExcelColumn label="Ref_Carrera" value="refcarrera"/>
                                    </ExcelSheet>

                                    <ExcelSheet data={documentos} name="Documentos">
                                        <ExcelColumn label="id_documento" value="id_documento"/>
                                        <ExcelColumn label="etapa" value="etapa"/>
                                        <ExcelColumn label="nombre" value="nombre"/>
                                        <ExcelColumn label="requerido" value="requerido"/>
                                        <ExcelColumn label="link" value="link"/>
                                    </ExcelSheet>
                                </ExcelFile> 
                            </div>
                        </Grid>
                        <br/>
                    </Grid>
                </Grid>
            </Grid>
           

        </div>
    );
}