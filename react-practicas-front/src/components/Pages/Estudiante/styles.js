import {makeStyles, withStyles} from '@material-ui/core/styles';
import { TableCell, TableRow} from '@material-ui/core';

export default makeStyles((theme) => ({
  root:{
    width: '100%'
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
    // table: {
    //   width:'90vw',
    //   height:'75vh',
    //   margin: '0 auto',
    //   marginBottom: '40px',
    //   display: 'center',
    //   border: '2px solid #000',
    // },
    boton: {
      marginRight:'20px',
      float:'right',
      // marginTop:'60px',
      // margin: '35px',
      backgroundColor: 'grey',
      color: 'white',  
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
      backgroundColor: '#f69b2e',
        color: '#fff'
        }
    },  
  botonCancelar: {
    marginRight:'20px',
    // marginTop:'60px',
    float:'right',
    // margin: '35px',
    backgroundColor: 'grey',
    color: 'white',  
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
    '&:hover': {
    backgroundColor: 'red',
      color: '#fff',
  
  
    },  
  }
  
  }));
  
  // export const StyledTableCell = withStyles((theme) => ({
  //   head: {
  //     backgroundColor: '#f69b2e',
  //     color: theme.palette.common.black,
  //     padding: '6px'
  //   },
  //   body: {
  //     fontSize: 12,
  //     padding: '6px'
  //   },
  // }))(TableCell);
  
  // export const StyledTableRow = withStyles((theme) => ({
  //   root: {
  //     '&:nth-of-type(odd)': {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  
  //   },
  // }))(TableRow);