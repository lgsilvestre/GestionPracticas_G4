import React, { useState} from 'react';
import FormPlan from '../../FormPlan/FormPlan'
import Dialog from '@material-ui/core/Dialog';
import Grow from '@material-ui/core/Grow';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {StyledTableCell, StyledTableRow} from './styles';
import {Edit, Delete} from '@material-ui/icons';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: "50%",
  },
  logosearch :{
    width:"25px", 
    height:"25px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  botonPerso: {
    color:'#f69b2e'
  },
  botonFiltro: {
    background:"#f69b2e",
    color:"white"
  } 
}));

export const Plan = ({history}) =>   {

  /*const clasesEstilo = useStyles();*/

  // Columnas para la tabla de estados
  const columns = [
    { id: 'nombre', label: 'Documento', minWidth: "25%" },
    { id: 'etapa', label: 'Etapa', minWidth: "25%" },
    { id: 'carrera', label: 'Carrera', minWidth: "25%" },
    { id: 'acciones', label: 'Acciones', minWidth: "25%",},
  ];

  const getDocumentos = () => {
    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getDocumentos",
    )
      .then(response => {
        
        console.log("respuesta: ", response.data);

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  };

    return (
      <div style={{marginTop:'20px', marginBottom:'30px'}}>
        <h4 style={{marginBottom:'10px'}}>
            Admin &gt; Gestionar Documentos
        </h4>
      </div>
    )
}
