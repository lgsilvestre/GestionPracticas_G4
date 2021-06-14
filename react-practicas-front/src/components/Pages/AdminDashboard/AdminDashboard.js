import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { motion } from "framer-motion"

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
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
       color: '#1A2B4B'
      },
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
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Prácticas en proceso: 16
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Revisa las prácticas que están siendo rendidas.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Ver prácticas
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className={classes.root} style={{height:'100%'}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Solicitudes de práctica: 4
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Revisa las solicitudes de práctica pendientes.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Ver solicitudes
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                    <Card className={classes.root} style={{height:'100%'}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Prácticas por terminar: 6
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Prácticas que terminarán en un período de 7 días o menos.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Ver prácticas
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