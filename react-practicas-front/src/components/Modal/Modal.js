import React from 'react';
import Modal from '@material-ui/core/Modal';
import Formulario from '../Formulario/Formulario';
import { Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import Button from '@material-ui/core/Button';





export default function SimpleModal(props) {
  const classes = useStyles();


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.container}>
     
     
    <main className={classes.layout}>
      <Paper className={classes.paper}>
      <div className="container">
    <Typography variant="h6" className={classes.titulo} gutterBottom>{props.titulo}</Typography>
      <Formulario  onClose={handleClose}/>
      <Button className={classes.botonCancelar} type="button"  onClick={handleClose}>
            Cancelar
          </Button>
    </div>
    
        </Paper>
      </main>
    </div>
 
  );

  return (
    <div>
      <Button className={classes.boton} type="button" onClick={handleOpen}>
        Anadir
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
       
      </Modal>
    </div>
  );
}
