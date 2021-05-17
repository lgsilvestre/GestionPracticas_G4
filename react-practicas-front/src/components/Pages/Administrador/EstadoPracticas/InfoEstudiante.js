import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { VscFilePdf } from "react-icons/vsc";
import { MdFileDownload } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { shadows } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
      padding: theme.spacing(2),
      textAlign: "left"
    },
    filebox:{
        minWidth:"450px",
        maxWidth:"450px"
       
    },
    icon:{
        width:"30px", 
        height:"30px"
    }
  }));
export const InfoEstudiante = ({handleChangeStateBack}) => {
    const classes = useStyles();
    const dataEstudiante = {
        nombre: "Camilo Villalobos",
        carrera: "Ingenieria Civil en Computacion",
        edad: "18 años",
        sexo: "Masculino",
        rut:"12345678-9",
        matricula:"12345679"
    }
    
    const dataEmpresa = {
        empresa: "Universidad de Talca",
        supervisor: "Juan Perez",
        fechainicio: "21/07/2021",
        fechatermino: "21/10/2021",
    }
    const infoLabelsEstudiante = ["Nombre:", "Carrera:", "Edad:", "Sexo:", "Rut:", "Matrícula:"]
    const infoLabelsEmpresa = ["Nombre Empresa:", "Nombre de Supervisor:", "Fecha de Inicio:", "Fecha de término:"]
    const archivosEstudiante =[
        {
            nombre:"Carta de presentación"
        },{
            nombre:"Currículo Plan"
        },{
            nombre: "Consentimiento Informado"
        },{
            nombre: "Protocolo Covid"
        },{
            nombre: "Módulos de desempeño integrado"
        }]
    return (
        <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
            <Button variant="outlined" startIcon={<IoIosArrowBack/>} onClick={handleChangeStateBack} style={{marginBottom:'10px', color:'#f69b2e'}}>
                Atras
            </Button>
            {/* Datos de Estudiante */}
            <Box style={{marginTop:'10px', marginBottom:'30px', borderRadius:'20px', backgroundColor:'#fafafa'}} boxShadow={1}>
                <h4 style={{paddingTop:'20px', paddingLeft:'20px'}}>Datos Estudiante</h4>
                <hr/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[0]}
                            </Box>
                            <Box>
                                {dataEstudiante.nombre}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[1]}
                            </Box>
                            <Box>
                                {dataEstudiante.carrera}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">                    
                    <Grid item xs >
                        <Box  className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[2]}
                            </Box>
                            <Box>
                                {dataEstudiante.edad}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[3]}
                            </Box>
                            <Box>
                                {dataEstudiante.sexo}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">                    
                    <Grid item xs >
                        <Box  className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[4]}
                            </Box>
                            <Box>
                                {dataEstudiante.rut}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEstudiante[5]}
                            </Box>
                            <Box>
                                {dataEstudiante.matricula}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
            </Box>   

             {/*Datos de Empresa  */}
            <Box style={{marginTop:'10px', marginBottom:'30px', borderRadius:'20px', backgroundColor:'#fafafa'}} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Empresa</h4>
                <hr/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[0]}
                            </Box>
                            <Box>
                                {dataEmpresa.empresa}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[1]}
                            </Box>
                            <Box>
                                {dataEmpresa.supervisor}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[2]}
                            </Box>
                            <Box>
                                {dataEmpresa.fechainicio}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={classes.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[3]}
                            </Box>
                            <Box>
                                {dataEmpresa.fechatermino}
                            </Box>
                        </Box>
                    </Grid>                                               
                </Grid>
            </Box>    
            {/* Archivos */}
            <Box style={{marginTop:'10px', marginBottom:'10px', borderRadius:'20px', backgroundColor:'#fafafa'}} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Documentos Subidos</h4>
                <hr/>
               
                <List  className= {classes.filebox}>
                    {
                        archivosEstudiante.map( (file,index) => (

                            <ListItem key={index}>

                                <ListItemIcon style={{color:'#f69b2e'}}>
                                    <VscFilePdf className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.nombre}
                                />                                     
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" style={{color:'#f69b2e'}}>
                                        <MdFileDownload />
                                    </IconButton>
                                    <IconButton edge="end" >
                                        <FcCheckmark />
                                    </IconButton>
                                    <IconButton edge="end" >
                                        <FcCancel />
                                    </IconButton>
                                </ListItemSecondaryAction>                      
                            
                            </ListItem>
                        ))
                    }
                </List>            
                    
            </Box>
        </div>
    )
}
