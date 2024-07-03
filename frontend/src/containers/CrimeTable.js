import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { fetchAllCrimes } from '../api/home';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Popover, Select, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export default function DemoTable() {
    const places = useSelector(state => state.home.places)
    const types = useSelector(state => state.home.types)
    const [placesList, setPlacesList] = React.useState([])
    const [typesList, setTypeList] = React.useState([])
    React.useEffect(() => {
        if (places) {
            setPlacesList(places)
        }
    }, [places])
    React.useEffect(() => {
        setTypeList(types)
    }, [types])
    const columns = [
        { id: 'crimeId', label: 'ID', minWidth: 10, format: (value) => <Link to={`/incident/${value}`}>{value}</Link> },
        { id: 'reportedTimestamp', label: 'Reported Time', minWidth: 100, format: (value) => moment(value).format('LLL') },
        {
            id: 'reportedByFirstName',
            label: 'Reported Name',
            minWidth: 120,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'crimeAddress',
            label: 'Crime Address',
            minWidth: 120,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'crimeType',
            label: 'Crime Type',
            minWidth: 120,
            align: 'right',
        },
        {
            id: 'weaponsUsed',
            label: 'Weapons',
            minWidth: 120,
            align: 'left',

        },
        {
            id: 'Filter',
            label:
                (<IconButton aria-label="fingerprint" onClick={(e) => handleClick(e)} >
                    <FilterAltIcon />
                </IconButton>)
            ,
            minWidth: 20,
            align: 'right',

        },
    ];

    const [page, setPage] = React.useState(0);
    const defaultFilterData = {
        crimeType: "",
        crimeLocation: ""
    }
    const [filter, setFilter] = React.useState(0);
    const [filterDateLeft, setFilterDateLeft] = React.useState(moment())
    const [filterDateRight, setFilterDateRight] = React.useState(moment())
    const [filterState, setFilterState] = React.useState(defaultFilterData)


    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const crimeData = useSelector(state => state.home.crimes)
    React.useEffect(() => {
        setData(crimeData)

    }, [crimeData])


    //for popup
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleValueChange = (e) => {
        let newState = { ...filterState }
        newState[e.target.name] = e.target.value
        setFilter(true)
        setFilterState(newState)
    }
    const accFilters = () => {
        let data = {}
        if (filter) data.filter = 1
        if (filterDateLeft) data.dateLeft = filterDateLeft.format('yyyy-MM-DD HH:mm:ss')
        if (filterDateRight) data.dateRight = filterDateRight.format('yyyy-MM-DD HH:mm:ss')
        if (filterState.crimeLocation) data.crimeLocation = filterState.crimeLocation
        if (filterState.crimeType) data.crimeType = filterState.crimeType
        return data

    }
    const handleChangePage = (event, newPage) => {
        fetchAllCrimes(newPage + 1, rowsPerPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        fetchAllCrimes(1, rowsPerPage + event.target.value)
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const submitHandler = () => {
        let extraFilters = accFilters()
        fetchAllCrimes(1, rowsPerPage, extraFilters)

    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '15px' }}>
            <TableContainer sx={{ maxHeight: '75vh' }}>
                <Popover
                    id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}


                >

                    <Grid container width={220} spacing={2} style={{ margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Grid item xs={6}>
                            <FormControl variant="filled" sx={{ minWidth: 200, width: '100%' }}>
                                <InputLabel id="select-crimeType">Crime Type</InputLabel>
                                <Select
                                
                                    size='small'
                                    fullWidth
                                    labelId="select-crimeType"
                                    id="crimeType"
                                    name="crimeType"
                                    label="Crime Type"
                                    value={filterState.crimeType}
                                    onChange={(e) => handleValueChange(e)}
                                >
                                    <MenuItem value={''}>Select</MenuItem>
                                    {typesList && typesList.map(item => (
                                        <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="filled" sx={{ minWidth: 200, width: '100%' }}>
                                <InputLabel id="select-crimeLocation">Place Type</InputLabel>
                                <Select
                                    size='small'
                                    labelId="select-crimeLocation"
                                    id="crimeLocation"
                                    name="crimeLocation"
                                    label="Place Type"
                                    value={filterState.crimeLocation}
                                    onChange={(e) => handleValueChange(e)}
                                >
                                    <MenuItem value={''}>Select</MenuItem>
                                    {placesList && placesList.map(item => (
                                        <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <DatePicker label="Start Date"
                                value={filterDateLeft}
                                name="dateL"
                                onChange={(v) => setFilterDateLeft(v)}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <DatePicker label="End Date"
                                value={filterDateRight}
                                name="dateR"
                                onChange={(v) => setFilterDateRight(v)}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={() => submitHandler()}
                            >
                                {'Filter'}
                            </Button>
                        </Grid>
                    </Grid>
                </Popover>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}