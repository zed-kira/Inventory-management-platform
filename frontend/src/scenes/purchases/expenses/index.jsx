// Material UI
import { Button } from '@mui/material';
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

// Handling Dates
import { format } from 'fecha';

// React
import { useState } from "react";

// Icons
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

// From Tables
import { EnhancedTableHead } from "../../../components/tables";
import { getComparator } from "../../../components/tables";
import { stableSort } from "../../../components/tables";

// Tremor
import { Card, Title, DonutChart, Metric, Flex, Block } from '@tremor/react';
import { Legend, Divider, Bold } from "@tremor/react";
import { Text, Icon } from "@tremor/react";
import { DateRangePicker } from "@tremor/react";
import { TextInput } from '@tremor/react';
import { Badge, Col, ColGrid } from "@tremor/react";

// Nivo Charts
import { ResponsivePie } from '@nivo/pie';


// Material UI Icons
import AddIcon from '@mui/icons-material/Add';

// Heroicons
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/react/24/solid';

// Custom Css
import './index.css';


const transactions = [
    {
        id: 1,
        name: 'Buy BTC',
        date: 'February 18th, 2023',
        icon: ArrowUpRightIcon,
        amount: '$4,805.00',
        difference: '+ 0.1337 BTC',
        color: 'green',
    },
    {
        id: 2,
        name: 'Sell BTC',
        date: 'February 18th, 2023',
        icon: ArrowDownRightIcon,
        amount: '$2,344.00',
        difference: '- 0.2105 BTC',
        color: 'red',
    },
    {
        id: 3,
        name: 'Buy BTC',
        date: 'February 18th, 2023',
        icon: ArrowUpRightIcon,
        amount: '$4,805.00',
        difference: '+ 0.1337 BTC',
        color: 'green',
    },
]

function createExpense(id, date, category, amount, vendor) {
    return {
        id,
        date,
        category,
        amount,
        vendor,
    };
}

const expenses = [
    createExpense("egj32eosij", new Date(2023, 2, 5), 'Cost Of Goods & Services', 1200, 'Jack Mallen'),
    createExpense("kowfh37gmc", new Date(2023, 1, 20), 'Advertising & Marketing', 500, 'Jane Doe'),
    createExpense("oia837rgbf", new Date(2023, 2, 8), 'Debt', 700, 'John Doe'),
    createExpense("iwi834bgft", new Date(2023, 1, 2), 'Cost Of Goods & Services', 800, 'Tom Cruise'),
    createExpense("pwoekjt34g", new Date(2023, 3, 15), 'Taxes', 900, 'Kate Winslet'),
    createExpense("awoigkjw32", new Date(2023, 4, 10), 'Advertising & Marketing', 400, 'Brad Pitt'),
    createExpense("awwogj233g", new Date(2023, 2, 11), 'Debt', 600, 'Emma Watson'),
    createExpense("kwow2g3j4g", new Date(2023, 1, 23), 'Taxes', 500, 'Robert Downey Jr.'),
    createExpense("fowjmkhg32", new Date(2023, 4, 30), 'Cost Of Goods & Services', 400, 'Margot Robbie'),
    createExpense("kawofjmgw2", new Date(2023, 5, 1), 'Advertising & Marketing', 600, 'Leonardo DiCaprio')
];

const expensesheadCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'id',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'date',
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'category',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'amount',
    },
    {
        id: 'vendor',
        numeric: true,
        disablePadding: true,
        label: 'vendor',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'actions',
    }
];

const valueFormatter = (number) => (
    `$ ${Intl.NumberFormat('us').format(number).toString()}`
);

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
                        Expenses
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

const Expenses = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ data, setData] = useState(expenses);

    const calc_sum = (category) => {
        let sum = 0;
        if(category === 'all'){
            expenses.forEach(expense => {
                sum += expense.amount;
            });
            return sum;
        } else {
            expenses.forEach(expense => {
                if (expense.category === category) {
                    sum += expense.amount;
                }
            });
            return sum;
        }
    }

    const categories = [
        {
            id: 1,
            category: 'Cost Of Goods & Services',
            amount: calc_sum('Cost Of Goods & Services'),
        },
        {
            id: 2,
            category: 'Advertising & Marketing',
            amount: calc_sum('Advertising & Marketing'),
        },
        {
            id: 3,
            category: 'Debt',
            amount: calc_sum('Debt'),
        },
        {
            id: 4,
            category: 'Taxes',
            amount: calc_sum('Taxes'),
        },
    ];

    const handleNew = () => {

    }

    const handleEdit = (row) => {

    }

    const handleDateFilter = (range) => {
        const [startDate, endDate] = range;

        const filteredResults = endDate === null ? 
            data.filter(expense => expense.date === startDate)
            : 
            data.filter(expense => expense.date >= startDate && expense.date <= endDate)

        setData(filteredResults);
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = [...new Set([
            ...data.filter((expense) => format(expense.date, 'dddd MMMM Do, YYYY').toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((expense) => expense.id.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((expense) => expense.category.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((expense) => expense.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((expense) => expense.vendor.toLowerCase().includes(searchTerm.toLowerCase())),
        ])];
        setData( searchTerm === '' ? expenses : filteredResults);
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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (

        <>
            <section>

                <div className="container expenses-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Expenses</h1>
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
                                New Expense
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container expenses-insights" style={{ marginTop: 20 }}>
                    <div className="row">
                        <div className="col-xxl-8 offset-xxl-0">
                            <Card marginTop='mt-4'>
                                <Title>Total expenses by category</Title>
                                <div className="row">

                                    <div className="col-xxl-4">
                                        <DonutChart
                                            data={ categories }
                                            category="amount"
                                            dataKey="category"
                                            valueFormatter={ valueFormatter }
                                            marginTop="mt-6"
                                            colors={["teal", "violet", "red", "amber"]}
                                        />
                                    </div>

                                    <div className="col" style={{ marginTop: 35 }}>
                                        <Text>Total Amount</Text>
                                        <Metric marginTop='mt-2'>{formatter.format(calc_sum('all'))}</Metric>
                                        <p style={{ color: 'rgb(108, 115, 127)', marginTop: 20 }}>Categories</p>
                                        <Legend
                                            categories={[
                                                "Cost of Goods/Services", 
                                                "Advertising & Marketing",
                                                "Debt",
                                                "Taxes",
                                            ]}
                                            colors={["teal", "violet", "red", "amber"]}
                                            marginTop="mt-5"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col">
                            <Card marginTop='mt-5'>
                                <Title>Transactions</Title>
                                <Block spaceY="space-y-6" marginTop='mt-6'>
                                    {transactions.map(transaction => {
                                            return (
                                                <Flex key={transaction.id} justifyContent="justify-start" spaceX="space-x-4" truncate={ true }>
                                                    <Icon variant="light" icon={ transaction.icon } size="md" color={transaction.color} />
                                                    <Block truncate={ true }>
                                                        <Text truncate={ true }><Bold>{transaction.name}</Bold></Text>
                                                        <Text truncate={ true }>{transaction.date}</Text>
                                                    </Block>
                                                    <div>
                                                        <Text color={transaction.color}>{transaction.difference}</Text>
                                                        <Text truncate={ true }>{transaction.amount}</Text>
                                                    </div>
                                                </Flex>
                                            );
                                        })
                                    }
                                </Block>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className='container expenses-table' style={{ marginTop: 50, marginBottom: 50 }}>
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
                                    headCells={expensesheadCells}
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
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{format(row.date,'dddd MMMM Do, YYYY')}</TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                            <TableCell align="right">{formatter.format(row.amount)}</TableCell>
                                            <TableCell align="right">{row.vendor}</TableCell>
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

export default Expenses;