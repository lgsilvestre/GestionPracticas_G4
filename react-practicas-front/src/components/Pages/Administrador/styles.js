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
      cursor: 'pointer'
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
      border: '2px solid #000',
    },
    boton: {
      marginRight:'20px',
      marginTop:'60px',
      float:'right',
      margin: '35px',
      backgroundColor: '#fff',
      color: 'rgb(0, 0, 0)',  
      cursor: 'pointer',
      border: '2px solid rgba(0,111,110,1)',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor: 'rgba(0,111,110,1)',
        color: '#fff'
        }
    },  
  botonCancelar: {
    marginRight:'20px',
    marginTop:'60px',
    float:'right',
    margin: '35px',
    backgroundColor: '#fff',
    color: 'rgb(0, 0, 0)',  
    cursor: 'pointer',
    border: '2px solid #E62D05',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
    '&:hover': {
    backgroundColor: '#E62D05',
      color: '#fff',
  
  
    },  
  }
  
  }));
  
  export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#f7a440',
      color: theme.palette.common.black,
      padding: '6px'
    },
    body: {
      fontSize: 12,
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