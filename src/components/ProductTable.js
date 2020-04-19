import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from "@material-ui/styles";

// import Toolbar from '@material-ui/core/Toolbar';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Typography from '@material-ui/core/Typography';
// import Checkbox from '@material-ui/core/Checkbox';
// import Tooltip from '@material-ui/core/Tooltip';
// import Switch from '@material-ui/core/Switch';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import {TextField} from "@material-ui/core";

// function createData(name, category, price, unit, quantity) {
//     return { name, category, price, unit, quantity };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

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
    { id: 'name', numeric: false, disablePadding: false, label: 'Nom' },
    { id: 'category', numeric: false, disablePadding: true, label: 'Categorie' },
    { id: 'unitPrice', numeric: true, disablePadding: false, label: "Prix a l'unité" },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantité' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Prix' },
];

function ProductTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const classes = useStyles()

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

ProductTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
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

class ProductTable extends Component {

    constructor (props) {
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            rows: this.props.rows,
        }
    }


    handleRequestSort = (event, property) => {
        const isAsc = this.orderBy === property && this.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = this.state.rows.map((n) => n.name);
            this.setState({selected: newSelecteds});
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
        // } else if (selectedIndex === this.state.selected.length - 1) {
        //     newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected});
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    };

    deleteFromList = (row, index) => {
        console.log(this.state.rows)
        this.props.removeFromCart(row)
        let newRows = this.state.rows.filter(r => r.id !== row.id)
        const { rows } = this.state
        rows.splice(index, 1)
        this.setState({rows}, () => {
            console.log(this.state.rows, newRows)
            this.render()
        })
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    };

    render () {
        console.log("---------------")
        const isSelected = (name) => this.state.selected.indexOf(name) !== -1;
        const {classes} = this.props;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
        console.log(this.state)

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                        >
                            <ProductTableHead
                                classes={classes}
                                numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.state.rows.length}
                            />
                            <TableBody>
                                {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                                    .slice(
                                        this.state.page * this.state.rowsPerPage,
                                        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
                                    ).map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                {/*<TableCell padding="checkbox">*/}
                                                {/*<Checkbox*/}
                                                {/*checked={isItemSelected}*/}
                                                {/*inputProps={{ 'aria-labelledby': labelId }}*/}
                                                {/*/>*/}
                                                {/*</TableCell>*/}
                                                <TableCell component="th" id={labelId} scope="row" >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.category}</TableCell>
                                                <TableCell align="right">{`${row.unitPrice} €/${row.unit}`}</TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{`${row.price} €`}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="enhanced table"
                                                                onClick={() => {this.deleteFromList(row, index)}}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        labelRowsPerPage={"Lignes par pages:"}
                        labelDisplayedRows={({ from, to, count }) => {return `Total ${count} page`}}
                    />
                </Paper>
            </div>
        );
    }

}

export default withStyles(useStyles)(ProductTable)
