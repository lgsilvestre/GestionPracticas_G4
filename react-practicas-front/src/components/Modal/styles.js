import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: '5%',
    width: 'auto', 
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    position: 'absolute',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: '20px 0',
  },
  boton: {
      marginRight:'20px',
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
  },
  botonCancelar: {
    marginRight:'20px',
    float:'right',
    margin: '35px',
    backgroundColor: '#fff',
    color: 'rgb(0, 0, 0)',  
    cursor: 'pointer',
    border: '2px solid rgba(240, 52, 52, 1)',
    transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
  '&:hover': {
  backgroundColor: 'rgba(240, 52, 52, 1)',
    color: '#fff', 
},},
  titulo:{
    color: '#000',
    textAlign: 'center',
    marginBottom: '30px'
  }


}));