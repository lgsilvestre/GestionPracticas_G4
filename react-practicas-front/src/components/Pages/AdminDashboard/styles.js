import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      borderRadius: '25px',
      height: '78%'   
    },
    media: {
      height: 140,
    },
    encabezado:{
        marginLeft: "-100px",
        marginBottom: "3vh"
      },
      titulo:{
       color: '#1b2d4f',
      },
      regiones:{
        marginTop:'8%'
      },
      icono:{
      flex:' 0 0 43.333333%',
      maxWidth: '43.333333%',
      alignSelf: 'left'
      },
      label: {
        boxSizing: 'border-box',
        display: 'block',      
        marginRight:'1em',
        textAlign: 'right',
        color: '#9A9A9A',
        fontSize: '23px',
        lineHeight: '1.4em'
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      cantidad: {
        textAlign: 'right',
        fontSize: '2em',
        marginRight: '2em',
        marginTop: '-2em',
        fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif'
      },
      area : {
          padding: '0'
      },
      boton: {
        backgroundColor: '#fff',
        color: '#f1A2B4Bff',  
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
        '&:hover': {
        backgroundColor: '#f0ebcc',
          color: '#000'
        }
      }, 
      areaBoton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }));