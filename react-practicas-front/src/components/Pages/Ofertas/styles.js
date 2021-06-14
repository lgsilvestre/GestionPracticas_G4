import {makeStyles} from '@material-ui/core/styles';


export default makeStyles((theme) => ({
 
    
  root:{
    width: '100%'
  },
  encabezado:{
    marginLeft: "-100px"
  },
  titulo:{
   fontSize: '4em',
   color: '#1A2B4B'
  },
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    },
   
    boton: {
      marginRight:'20px',
      float:'right',
      margin: '15px',
      backgroundColor: '#344fa1',
      color: '#fff',  
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor: '#f0ebcc',
        color: '#000'
      }
    },  
    botonCancelar: {
      marginRight:'20px',
      float:'right',
      margin: '15px',
      backgroundColor: '#E62D05',
      color: '#fff',  
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor: '#f0ebcc',
        color: '#000',
    
    
      },  
    }
  
  }));

