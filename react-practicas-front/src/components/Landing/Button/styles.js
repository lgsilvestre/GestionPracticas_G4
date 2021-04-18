import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';



export  const ColorButton = withStyles((theme) => ({
    root: {
        margin: '10px',
        backgroundColor: '#fff',
        color: 'rgb(0, 0, 0)',  
        cursor: 'pointer',
        border: '2px solid #000',
        transition: 'all 0.4s cubic-bezier(0.42, 0, 0.58, 1)',
      '&:hover': {
	    backgroundColor: '#000',
        color: '#fff',

      }
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    }
  }))(Button);  