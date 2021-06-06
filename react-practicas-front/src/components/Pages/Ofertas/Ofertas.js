import React, { useState} from 'react';
import FormPractica from '../../FormPractica/FormPractica'
import Dialog from '@material-ui/core/Dialog';
import Grow from '@material-ui/core/Grow';
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
        <div className={classes.root} style={{marginTop:'20px', marginBottom:'30px'}}>
          <h4 style={{marginBottom:'10px'}}>
            Admin &gt; Gestionar Prácticas
          </h4>
     
      </div>
    )
}

export default Ofertas
