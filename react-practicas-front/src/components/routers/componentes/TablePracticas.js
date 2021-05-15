import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
  createData('Luciano García', 'Ingeniería Civil en Computación', 'En proceso' , '25/04/2021' , '25/06/2021'),
  createData('Felipe Fuenzalida', 'Ingeniería Civil en Computación', 'En proceso' , '25/04/2021', '25/06/2021'),
  createData('Camilo Villalobos', 'Ingeniería Civil Industrial', 'En proceso' ,'25/04/2021', '25/06/2021'),
  createData('Cristobal Henriquez', 'Ingeniería Civil Industrial', 'En proceso' ,'25/04/2021', '25/06/2021'),
  createData('Josefina Ortiz', 'Ingeniería Civil Industrial', 'Documentación Aprobada' , '1/06/2021', '25/08/2021'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TablePracticas() {
  const classes = useStyles();

  return (
      <div style={{paddingLeft: "40px", paddingRight: "40px", marginTop: "15px"}}>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Alumno</StyledTableCell>
            <StyledTableCell align="right">Carrera</StyledTableCell>
            <StyledTableCell align="right">Estado</StyledTableCell>
            <StyledTableCell align="right">Fecha Inicio</StyledTableCell>
            <StyledTableCell align="right">Fecha Término</StyledTableCell>
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
      </div>
  );
}
