import {makeStyles} from '@material-ui/core/styles';


export default makeStyles((theme) => ({

    encabezado:{
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputComponent: {
        height: '50%',
        width:  '20%',
        border: '1px solid #D3D4D0',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
    },
    footer: {
        height: '50px',
        marginTop: '-50px'
    },
    nota:{
        color: 'rgba(0,0,0,0.87)',
        fontSize: '16px',
        letterSpacing: '0.5px',
        lineHeight: '28px',
        textAlign: 'center',

    },empresa:{
        marginTop: '8%',   
    },
    global:{
      height: '100%',
      width: '100%',
      overflowY: 'scroll'
    },
    icono:{
        marginTop: '8%',
    },
    titulo:{
     marginLeft:'10%',
     marginTop: '10%',
     display: 'inline-block',
     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
     color: '#1b2d4f',
     fontSize: '3em',
     fontStyle: 'ligth'
    },
    buton:{
        marginTop: '1%', 
        display: 'flex',
        justifyContent: 'center',
         alignItems: 'center'
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
  
