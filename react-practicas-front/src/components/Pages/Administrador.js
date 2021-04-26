import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import Grow from '@material-ui/core/Grow';


const useStyles = makeStyles({
  table: {
    minWidth: 200,
    display: 'center'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    border: '2px solid rgba(0,111,110,1)',
   
	}
  
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0,111,110,1)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  createData('Ferran Rubio', 'CRUD', '1/15/12', 'En Proceso', 'X'),
  
];

export default function Administrador() {
  const classes = useStyles();

  return (
      <div>


    <Grid container>
        <Grid item xs>
        <Grow   in={true} style={{ transformOrigin: '0 0 0' }}  {...(true ? { timeout: 1500 } : {})}    >
           <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
            <StyledTableCell >Nombre</StyledTableCell>
            <StyledTableCell align="right" >Permisos</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>      
            <StyledTableCell align="right">Correo</StyledTableCell>
            <StyledTableCell align="right">Contrasena</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        
        </Grow>
       </Grid>
        </Grid>
        </div>

    
  );
}
