import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonLanding from './Button/Button';
import Card from './Card/Card'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: '45px',
      marginTop: '20px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Landing = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4" gutterBottom align="center">Ofertas de Practicas</Typography>
            <Grid  container  direction="row"  justify="center"  alignItems="center">
               <ButtonLanding carrera="Computacion" />
               <ButtonLanding carrera="Electrica" />
               <ButtonLanding carrera="Industrial" />
               <ButtonLanding carrera="Mecanica" />
               <ButtonLanding carrera="Mecatronica" />
               <ButtonLanding carrera="Minas" />
               <ButtonLanding carrera="Obras Civiles" />
            </Grid>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item >
                        <Card className={classes.paper}/>
                    </Grid>
                    <Grid item >
                        <Card className={classes.paper}/>
                    </Grid>
                    <Grid item >
                        <Card className={classes.paper}/>
                    </Grid>
                    <Grid item >
                        <Card className={classes.paper}/>
                    </Grid>
                    <Grid item >
                        <Card className={classes.paper}/>
                    </Grid>
                </Grid>
            </div>
               
           
        </div>
    )
}

export default Landing
