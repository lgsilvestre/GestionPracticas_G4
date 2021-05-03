import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { darken, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';

function createData(carrera, cod_carrera, matricula, rut, correo_ins, sexo, fecha_nac,plan, anho_ingreso, via_ingreso, 
  sit_actual, sit_actual_anho, sit_actual_periodo, periodo, comuna_origen, region, regular, nivel, porc_avance, ult_punt_prio, al_dia, nivel_99_aprobado) {
  return { carrera, cod_carrera, matricula, rut, correo_ins, sexo, fecha_nac,plan, anho_ingreso, via_ingreso, 
    sit_actual, sit_actual_anho, sit_actual_periodo, periodo, comuna_origen, region, regular, nivel, porc_avance, ult_punt_prio, al_dia, nivel_99_aprobado };
}

const rows = [
  createData('Cupcake', 'Donut', 'Donut', 'Donut', 'Donut', 
  'Donut',  'Donut', 'Donut', 'Donut', 'Donut', 'Donut','Donut', 
  'Donut', 'Donut', 'Donut', 'Donut','Donut', 'Donut', 'Donut', 'Donut', 'Donut'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'carrera', numeric: false, disablePadding: true, label: 'Carrera' },
  { id: 'cod_carrera', numeric: true, disablePadding: false, label: 'Codigo Carrera' },
  { id: 'matricula', numeric: true, disablePadding: false, label: 'Matricula' },
  { id: 'rut', numeric: false, disablePadding: false, label: 'RUT' },
  { id: 'correo_ins', numeric: false, disablePadding: false, label: 'Correo' },
  { id: 'sexo', numeric: false, disablePadding: false, label: 'Sexo' },
  { id: 'fecha_nac', numeric: false, disablePadding: false, label: 'Nacimiento' },
  { id: 'plan', numeric: false, disablePadding: false, label: 'Plan' },
  { id: 'anho_ingreso', numeric: false, disablePadding: false, label: 'Ingreso' },
  { id: 'via_ingreso', numeric: false, disablePadding: false, label: 'Via Ingreso' },
  { id: 'sit_actual', numeric: false, disablePadding: false, label: 'Situacion Actual' },
  { id: 'sit_actual_anho', numeric: false, disablePadding: false, label: 'Sit Actual Anio' },
  { id: 'sit_actual_periodo', numeric: false, disablePadding: false, label: 'Sit Actual Periodo' },
  { id: 'periodo', numeric: false, disablePadding: false, label: 'Periodo' },
  { id: 'comuna_origen', numeric: false, disablePadding: false, label: 'Comuna Origen' },
  { id: 'region', numeric: false, disablePadding: false, label: 'Region' },
  { id: 'regular', numeric: false, disablePadding: false, label: 'Regular' },
  { id: 'nivel', numeric: false, disablePadding: false, label: 'Nivel' },
  { id: 'porc_avance', numeric: false, disablePadding: false, label: 'Porcentaje' },
  { id: 'ult_punt_prio', numeric: false, disablePadding: false, label: 'Ult Punt Prio' },
  { id: 'al_dia', numeric: false, disablePadding: false, label: 'Al Dia' },
  { id: 'nivel_99_aprobado', numeric: false, disablePadding: false, label: 'Nivel 99' },

];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(127,183,182)',
    color: '#000',

  },
}))(TableCell);

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.encabezado}>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    
  },
  highlight:
    theme.palette.type === 'dark'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: darken(theme.palette.secondary.dark, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

  },
}))(TableRow);

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Administradores
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div></div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {

      display: 'flex',
      flexWrap: 'wrap',
      padding: 'none',
  
  },
  encabezado:{
    backgroundColor: '#7FB7B6',
  },
  
  table: {
    width:'50vh',
    height:'75vh',
    margin: '0 auto',
    marginBottom: '40px',
    display: 'center',
    border: '2px solid rgba(0,111,110,1)',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              className={classes.encabezado}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                    {row.carrera}
                </StyledTableCell>
                <StyledTableCell align="right">{row.cod_carrera}</StyledTableCell>
                <StyledTableCell align="right">{row.matricula}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">{row.rut}</StyledTableCell>                
                <StyledTableCell align="right">{row.correo_ins}</StyledTableCell>
                <StyledTableCell align="right">{row.sexo}</StyledTableCell>
                <StyledTableCell align="right">{row.fecha_nac}</StyledTableCell>
                <StyledTableCell align="right">{row.plan}</StyledTableCell>
                <StyledTableCell align="right">{row.anho_ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.via_ingreso}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_anho}</StyledTableCell>
                <StyledTableCell align="right">{row.sit_actual_periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.comuna_origen}</StyledTableCell>
                <StyledTableCell align="right">{row.region}</StyledTableCell>
                <StyledTableCell align="right">{row.regular}</StyledTableCell>
                <StyledTableCell align="right">{row.nivel}</StyledTableCell>
                <StyledTableCell align="right">{row.porc_avance}</StyledTableCell>
                <StyledTableCell align="right">{row.ult_punt_prio}</StyledTableCell>
                <StyledTableCell align="right">{row.al_dia}</StyledTableCell>
                <StyledTableCell align="right">{row.nivel_99_aprobado}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
