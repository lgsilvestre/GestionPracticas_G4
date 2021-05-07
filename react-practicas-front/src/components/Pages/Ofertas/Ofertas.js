import React, { useState} from 'react';
import FormPractica from '../../FormPractica/FormPractica'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import {StyledTableCell, StyledTableRow} from './styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, Button} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const Ofertas = () => {
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
          Agregar Practica 
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Datos Practica</DialogTitle>
          <DialogContent>
            <FormPractica />
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

        <TableContainer>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <StyledTableCell>Carrera</StyledTableCell>
             <StyledTableCell>Nombre</StyledTableCell>
             <StyledTableCell>Empresa</StyledTableCell>
             <StyledTableCell>Descripcion </StyledTableCell>
             <StyledTableCell>Documento </StyledTableCell>
             <StyledTableCell>Acciones</StyledTableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(practica=>(
             <StyledTableRow key={practica.id}>
               <StyledTableCell>{practica.nombre}</StyledTableCell>
               <StyledTableCell>{practica.empresa}</StyledTableCell>
               <StyledTableCell>{practica.descripcion}</StyledTableCell>
               <StyledTableCell>{practica.documento}</StyledTableCell>
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
     
      </div>
    )
}

export default Ofertas
