import {makeStyles, withStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({

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
    input: {
        display: 'none',
        float:'right',
        margin: '15px',
        backgroundColor: '#344fa1',
        color: '#fff', 
    },
      
}));
    