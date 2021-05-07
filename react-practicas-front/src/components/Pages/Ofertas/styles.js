import {makeStyles, withStyles} from '@material-ui/core/styles';
import { TableCell, TableRow} from '@material-ui/core';

export default makeStyles((theme) => ({
 
    root:{
        height:'83vh',
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
      color: '#fff',

   
  },  
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  },formControl: {
    marginBottom: '15px',
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
label: {
  width: '100%',
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
},
},
table: {
    width:'90vw',
    height:'75vh',
    margin: '0 auto',
    marginBottom: '40px',
    display: 'center',
    border: '2px solid rgba(0,111,110,1)',
  },

}));
export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgba(0,111,110,1)',
      color: theme.palette.common.white,
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