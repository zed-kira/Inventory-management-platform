import { useState } from "react";

// Handling Dates
import { format } from 'fecha';

// MUI Components
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Tremor
import { DateRangePicker } from "@tremor/react";
import { TextInput } from '@tremor/react';
import { Badge, Col, ColGrid } from "@tremor/react";
import { Card, Flex, Icon, Block, BadgeDelta, ProgressBar, Text, Metric } from "@tremor/react";

// Heroicons
import { BeakerIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'


// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

// From Tables
import { EnhancedTableHead } from "../../../components/tables";
import { getComparator } from "../../../components/tables";
import { stableSort } from "../../../components/tables";

function createOrder(id, date, customer, item, cost, amount, status) {
    return {
        id,
        date,
        customer,
        item,
        cost,
        amount,
        status,
    };
}

const ordersheadCells = [
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'date',
    },
    {
        id: 'customer',
        numeric: true,
        disablePadding: false,
        label: 'customer',
    },
    {
        id: 'item',
        numeric: true,
        disablePadding: false,
        label: 'item',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'amount',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'status',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'actions',
    }
];

const orders = [
    createOrder("OR-ergwe234", new Date(2023, 1, 27), 'Anika Visser', 'Cupcake', 105, 134.99, ['cancelled', 'red']),
    createOrder("OR-dgwqe345", new Date(2023, 1, 28), 'John Smith', 'Donut', 150, 212.99, ['paid', 'green']),
    createOrder("OR-asdfg456", new Date(2023, 1, 29), 'Emily Johnson', 'Croissant', 50.50, 55.99, ['pending', 'cyan']),
    createOrder("OR-zxcvb567", new Date(2023, 1, 30), 'Michael Brown', 'Bagel', 20.20, 23.99, ['paid', 'green']),
    createOrder("OR-qwerty678", new Date(2023, 1, 31), 'Jessica Davis', 'Muffin', 248.50, 252.99, ['cancelled', 'red']),
    createOrder("OR-uiop789", new Date(2023, 1, 2), 'Ashley Miller', 'Pie', 22.50, 28.99, ['paid', 'green']),
    createOrder("OR-rewq890", new Date(2023, 2, 2), 'David Garcia', 'Cake', 50,99, 55.99, ['pending', 'cyan']),
    createOrder("OR-tyuio901", new Date(2023, 2, 3), 'Sarah Martinez', 'Brownie', 29.40, 55.99, ['paid', 'green']),
    createOrder("OR-asdfg902", new Date(2023, 2, 4), 'Andrew Robinson', 'Cookie', 15.20, 25.99, ['cancelled', 'red']),
    createOrder("OR-zxcvb903", new Date(2023, 2, 5), 'Joshua Clark', 'Bread', 30.34, 45.99, ['paid', 'green']),
    createOrder("OR-lkrt43", new Date(2023, 2, 27), 'Anika Visser', 'Cupcake', 122.25, 166.99, ['paid', 'green']),
];

export function EnhancedTableToolbar(props) {
    const { numSelected, OnBulkDelete, OnSearch, OnDateFilter } = props;
  
    return (
        <>
            <Toolbar
                sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Orders
                    </Typography>
                )}
                <div className="inventory-topbar">
                    
                </div>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => OnBulkDelete()}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            <div style={{ padding: 20, background: 'rgb(248, 249, 250)' }}>
                <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <TextInput
                            icon={ SearchIcon }
                            placeholder="Search..."
                            onChange={(event) => OnSearch(event)}
                        />
                    </Col>
                    <Col>
                        <DateRangePicker 
                            enableDropdown={true} 
                            maxWidth="max-w-lg"
                            placeholder="Select Date..."
                            enableYearPagination={true}
                            onValueChange={(event) => OnDateFilter(event)}
                        />
                    </Col>
                </ColGrid>
            </div>
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const Orders = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ data, setData] = useState(orders);

    const handleNew = () => {

    }

    const handleEdit = (row) => {

    }

    const handleDateFilter = (range) => {
        const [startDate, endDate] = range;

        const filteredResults = endDate === null ? 
            orders.filter((order) => order.date === startDate)
            : 
            orders.filter((order) => order.date >= startDate && order.date <= endDate)

        setData(filteredResults);
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = [...new Set([
            ...data.filter((order) => format(order.date, 'dddd MMMM Do, YYYY').toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((order) => order.item.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((order) => order.customer.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((order) => order.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((order) => order.status[0].toLowerCase().includes(searchTerm.toLowerCase())),
        ])];
        setData( searchTerm === '' ? orders : filteredResults);
    }

    const handleDeleteItem = (id) => {
        const new_data = data.slice().filter(object => object.id !== id);
        const new_selected = selected.filter(item => item !== id); 
        setSelected(new_selected);
        setData(new_data);
    }

    const handleDeleteBulk = () => {
        const filteredData = data.filter(object => !selected.includes(object.id));
        setData(filteredData);
        setSelected([]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const sum = (type) => {
        if(type === 'sales') {
            let sum = 0;
            data.forEach(item => {
                if(item.status[0] === 'paid'){
                    sum += item.amount;
                }
            });
            return sum;
        } else if(type === 'profit') {
            let sum = 0;
            data.forEach(item => {
                if(item.status[0] === 'paid'){
                    let profit = item.amount - item.cost; 
                    sum += profit;
                }
            });
            return sum;
        }
    }

    const insights = [
        {
            id: 'wehfwef22',
            title: 'Sales',
            metric: sum('sales'),
            progress: 15.9,
            delta: '13.2%',
            icon : CurrencyDollarIcon,
            color: 'emerald',
            type: 'currency',
            deltaType: 'moderateIncrease',
        },
        {
            id: 'dfhw453',
            title: 'Profit',
            metric: sum('profit'),
            progress: 36.5,
            delta: '23.9%',
            icon : CurrencyDollarIcon,
            color: 'emerald',
            type: 'currency',
            deltaType: 'increase',
        },
        {
            id: 'rhw344',
            title: 'Orders',
            metric: data.length,
            progress: 53.6,
            delta: '10.1%',
            icon: ShoppingCartIcon,
            color: 'blue',
            type: 'integer',
            deltaType: 'moderateDecrease',
        },
    ];

    const valueFormatter = (number) => (
        `$ ${Intl.NumberFormat('en').format(number).toString()}`
    );

    return (
        <>
        
            <section>
                    
                <div className="container orders-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Orders</h1>
                        </div>
                        <div className="col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end">
                            <Button 
                                onClick={handleNew}
                                variant="contained" 
                                startIcon={<AddIcon />}
                                /* style={{
                                    marginTop: 5,
                                }} */
                            >
                                New Order
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container orders-insights" style={{ marginTop: 50 }}>
                    <ColGrid numColsMd={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                    { insights.map((item) => (
                        <Card key={ item.id }>
                            <Flex alignItems="items-center">
                                <div style={{ marginRight: 20 }}>
                                    <Icon
                                        icon={item.icon}
                                        color={item.color}
                                        variant="solid"
                                        tooltip="Sum of Sales"
                                        size="lg"
                                    />
                                </div>
                                <Block truncate={ true }>
                                    <Text>{ item.title }</Text>
                                    <Metric truncate={ true }>
                                        {
                                            item.type === 'currency' ?
                                            valueFormatter(item.metric)
                                            : item.metric 
                                        }
                                    </Metric>
                                </Block>
                                
                                <BadgeDelta deltaType={ item.deltaType } text={ item.delta } />
                            </Flex>
                            {/* <Flex marginTop="mt-4" spaceX="space-x-2">
                                <Text truncate={ true }>{ `${item.progress}% (${item.metric})` }</Text>
                            </Flex> */}
                        </Card>
                    )) }
                    </ColGrid>
                </div>

                <div className='container orders-table' style={{ marginTop: 50 }}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar  
                                numSelected={selected.length}
                                OnBulkDelete={handleDeleteBulk}
                                OnSearch={handleSearch}
                                OnDateFilter={handleDateFilter}
                            />
                            <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                /* size={dense ? 'small' : 'medium'} */
                                size='medium'
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data.length}
                                    headCells={ordersheadCells}
                                />
                                <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {
                                                    format(
                                                        row.date,
                                                        'dddd MMMM Do, YYYY'
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell align="right">{row.customer}</TableCell>
                                            <TableCell align="right">{row.item}</TableCell>
                                            <TableCell align="right">${row.amount}</TableCell>
                                            <TableCell align="left">
                                                <Badge
                                                    text={row.status[0]}
                                                    color={row.status[1]}
                                                    size="md"
                                                    icon={undefined}
                                                    tooltip=""
                                                    marginTop="mt-0" 
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleDeleteItem(row.id)} 
                                                    color="primary" 
                                                    aria-label="Delete Product" 
                                                    component="label"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleEdit(row)}
                                                    color="primary" 
                                                    aria-label="Update Product" 
                                                    component="label"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                        /* height: (dense ? 33 : 53) * emptyRows, */
                                    }}
                                    >
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div>

            </section>
        
        </>
    );
};

export default Orders;