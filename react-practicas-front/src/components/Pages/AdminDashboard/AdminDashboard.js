import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      borderRadius: '25px',
      height: '78%'
   
    },
    media: {
      height: 140,
    },
    encabezado:{
        marginLeft: "-100px",
        marginBottom: "3vh"
      },
      titulo:{
       fontSize: '4em',
       color: '#1A2B4B',
       alignSelf: 'right'
      },
      icono:{
      flex:' 0 0 43.333333%',
      maxWidth: '43.333333%',
      alignSelf: 'left'
      },
      label: {
        boxSizing: 'border-box',
        display: 'block',
      
        marginRight:'1em',
        textAlign: 'right',
        color: '#9A9A9A',
        fontSize: '23px',
        lineHeight: '1.4em'
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      cantidad: {
        textAlign: 'right',
        fontSize: '2em',
        marginRight: '2em',
        marginTop: '-2em',
        fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif'
      },
      area : {
          padding: '0'
      },
      boton: {
        backgroundColor: '#fff',
        color: '#f1A2B4Bff',  
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
        '&:hover': {
        backgroundColor: '#f0ebcc',
          color: '#000'
        }
      }, 
      areaBoton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
  });

export const AdminDashboard = () => {

    const classes = useStyles();

    return (
        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
            <Grid container>
                <Grid item sm={12}>
                <div className={classes.encabezado}>
                <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h2" className={classes.titulo}  >Gestionar Documentos</Typography></motion.div>
                
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
                </Grid>
            </Grid>

        </div>
    );

}