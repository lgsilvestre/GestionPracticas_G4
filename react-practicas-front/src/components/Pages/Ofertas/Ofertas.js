import React, { useState} from 'react';
import FormPractica from '../../FormPractica/FormPractica'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import {Table, Typography, TableContainer, TableHead, TableBody, TableRow, Button, TableCell, Paper} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { motion } from "framer-motion"


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
      <div className="animate__animated animate__fadeIn animate__faster">
        <div style={{marginTop:'20px', marginBottom:'30px'}}>
        <div className={classes.encabezado}>
           <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} > <Typography variant="h3" className={classes.titulo}  >Gestionar Practicas</Typography></motion.div>
          
         </div>
         <Button className={classes.boton} onClick={handleClickOpen}>         Agregar Practica          </Button>
        <br />      
        <br />
        <hr/> 
          
   
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
          <Paper className={classes.root}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Carrera</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripcion </TableCell>
                    <TableCell>Documento </TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(practica=>(
                    <TableRow key={practica.id}>
                      <TableCell>{practica.nombre}</TableCell>
                      <TableCell>{practica.descripcion}</TableCell>
                      <TableCell>{practica.documento}</TableCell>
                      <TableCell>
                        <Edit className={classes.iconos} />
                        &nbsp;&nbsp;&nbsp;
                        <Delete  className={classes.iconos} />
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div> 
      </div>
    )
}

export default Ofertas
