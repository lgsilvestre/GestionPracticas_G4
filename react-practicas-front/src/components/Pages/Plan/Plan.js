import React, { useState} from 'react';
import FormPlan from '../../FormPlan/FormPlan'
import Dialog from '@material-ui/core/Dialog';
import Grow from '@material-ui/core/Grow';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import {StyledTableCell, StyledTableRow} from './styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, Button} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const Plan = () => {
  const [data, setData]= useState([]);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className={classes.root}>
        <Button className={classes.boton} variant="outlined" color="primary" onClick={handleClickOpen}>
          Agregar Plan 
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Datos Plan</DialogTitle>
          <DialogContent>
            <FormPlan />
          </DialogContent>
          <DialogActions>
            <Button className={classes.botonCancelar} onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button className={classes.boton} onClick={handleClose} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
        <Grow  in={true}  style={{ transformOrigin: '0 0 0' }}   {...(true ? { timeout: 1000 } : {})}    >
        <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <StyledTableCell>Carrera</StyledTableCell>
             <StyledTableCell>Codigo</StyledTableCell>
             <StyledTableCell>Fecha </StyledTableCell>
             <StyledTableCell>Acciones</StyledTableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(practica=>(
             <StyledTableRow key={practica.id}>
               <StyledTableCell>{practica.carrera}</StyledTableCell>
               <StyledTableCell>{practica.fecha}</StyledTableCell>
               <StyledTableCell>
                 <Edit className={classes.iconos} />
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={classes.iconos} />
                 </StyledTableCell>
             </StyledTableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     </Grow>
     
      </div>
    )
}

export default Plan
