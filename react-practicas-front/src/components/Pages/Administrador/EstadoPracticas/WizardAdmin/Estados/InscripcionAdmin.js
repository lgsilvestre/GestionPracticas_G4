import React from 'react'
import { 
    Box,
    Grid,  
    IconButton,  
    List,  
    ListItem,  
    ListItemIcon,  
    ListItemSecondaryAction,  
    ListItemText,  
    makeStyles,
    TextField} from '@material-ui/core'
import { VscFilePdf } from 'react-icons/vsc';
import { MdFileDownload } from 'react-icons/md';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useForm } from '../../../../../../hooks/useForm';
import { AiOutlineSearch } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    mainbox:{
        marginTop:'10px', 
        marginBottom:'30px', 
        borderRadius:'20px', 
        backgroundColor:'#fafafa'
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
export const InscripcionAdmin = () => {
    const clasesEstilo = useStyles();
    const dataEmpresa = {
        empresa: "Universidad de Talca",
        supervisor: "Juan Perez",
        fechainicio: "21/07/2021",
        fechatermino: "21/10/2021",
    }
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
        <div>       
            {/*Datos de Empresa  */}
            <Box className={clasesEstilo.mainbox} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Datos Empresa</h4>
                <hr/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" >                         
                    <Grid item xs>
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[0]}
                            </Box>
                            <Box>
                                {dataEmpresa.empresa}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={clasesEstilo.box}>
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
                        <Box className={clasesEstilo.box}>
                            <Box fontWeight="fontWeightMedium">
                                {infoLabelsEmpresa[2]}
                            </Box>
                            <Box>
                                {dataEmpresa.fechainicio}
                            </Box>
                        </Box> 
                    </Grid>
                    <Grid item xs >
                        <Box className={clasesEstilo.box}>
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
            <Box className={clasesEstilo.mainbox} boxShadow={1}>
                <h4 style={{paddingTop:'20px',paddingLeft:'20px'}}>Documentos Subidos</h4>
                <hr/>
                
                <List  className= {clasesEstilo.filebox}>
                    {
                        archivosEstudiante.map( (file,index) => (

                            <ListItem key={index}>

                                <ListItemIcon style={{color:'#f69b2e'}}>
                                    <VscFilePdf className={clasesEstilo.icon}/>
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
