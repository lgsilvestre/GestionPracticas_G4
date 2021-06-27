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
import Pie from '../Graficos/Pie'
import LineChart from '../Graficos/LineChart';
import VerticalBar from '../Graficos/VerticalBar'
import Divider from '@material-ui/core/Divider';

import useStyles from './styles';


export const AdminDashboard = () => {

    const classes = useStyles();

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
                                        16
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
                                        34
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
                                        16
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
                        <VerticalBar />                                      
                    </Grid>
                    <Grid item xs={4} className={classes.regiones} >           
                        <Pie  />                                  
                    </Grid>
                    <Grid item xs={12}>
                        <LineChart />       
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
           

        </div>
    );
}