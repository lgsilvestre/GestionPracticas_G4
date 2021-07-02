import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
 
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
  input: {
    display: 'none',
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
  


}));