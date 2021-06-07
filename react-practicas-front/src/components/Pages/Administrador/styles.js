import {makeStyles, withStyles} from '@material-ui/core/styles';
import { TableCell, TableRow} from '@material-ui/core';

export default makeStyles((theme) => ({

  root:{
    height:'83vh',
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
      display: 'inline-flex',
      alignSelf: 'center'
    }, 
    encabezado:{
<<<<<<< Updated upstream
      marginTop: '10vh',
      marginTop: '10vh',
=======
      marginLeft:'9vh',
      marginTop: '9vh',
>>>>>>> Stashed changes
      display: 'flex',
      alignItems: 'center'
    },
    titulo:{
      marginLeft:'10%',
      display: 'inline-block',
      color: '#3d84b8',
      fontFamily: 'Righteous, serif',
     fontSize: '4em',
     textShadow: '.05em .05em 0 #3f3697',
    },
    inputMaterial:{
      width: '100%',
      marginTop:'15px'
    },
    table: {
      width:'90vw',
      height:'75vh',
      margin: '0 auto',
      marginBottom: '40px',
      display: 'center',
      border: '1px grey',
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
  
  export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#fafafa',
      color: theme.palette.common.black,
      padding: '6px'
    },
    body: {
      fontSize: '0.875rem',
      padding: '6px'
    },
  }))(TableCell);
  
  export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
  
    },
  }))(TableRow);