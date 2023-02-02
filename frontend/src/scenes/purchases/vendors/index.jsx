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
import Avatar from '@mui/material/Avatar';

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
import { Card, Title, Metric, Flex, Block, BadgeDelta, LineChart } from '@tremor/react';
import { Text } from "@tremor/react";
import { TextInput } from '@tremor/react';
import { Col, ColGrid, Bold } from "@tremor/react";


// Material UI Icons
import AddIcon from '@mui/icons-material/Add';

// Custom Css
import './index.css';

// Images
import productImage1 from "../../../assets/images/product-1.png";
import productImage2 from "../../../assets/images/product-2.png";
import productImage3 from "../../../assets/images/product-3.png";
import productImage4 from "../../../assets/images/product-4.png";

export const supplies = [
  {
    id: 1,
    image: productImage1,
    title: "Jane Doe",
    company: "Acme Inc.",
    amount: 500,
    color: 'slate',
  },
  {
    id: 2,
    image: productImage2,
    title: "John Smith",
    company: "XYZ Corp.",
    amount: 399,
    color: 'slate',
  },
  {
    id: 3,
    image: productImage3,
    title: "Jane Smith",
    company: "ABC Enterprises",
    amount: 160,
    color: 'slate',
  },
  {
    id: 4,
    image: productImage4,
    title: "John Doe",
    company: "Def Corp",
    amount: 1200,
    color: 'slate',
  },
  {
    id: 5,
    image: productImage1,
    title: "Jim Clark",
    company: "Efg Enterprises",
    amount: 1590,
    color: 'slate',
  },
  {
    id: 6,
    image: productImage4,
    title: "Jasmine Lee",
    company: "Wxy Inc.",
    amount: 320,
    color: 'slate',
  },
  {
    id: 7,
    image: productImage1,
    title: "James Anderson",
    company: "Nop Corp.",
    amount: 125,
    color: 'slate',
  },
];

export const payables = [
    { date: format(new Date(2022, 11, 1), 'MMMM Do, YYYY'), payables: 1500 },
    { date: format(new Date(2022, 12, 1), 'MMMM Do, YYYY'), payables: 1200 },
    { date: format(new Date(2023, 1, 1), 'MMMM Do, YYYY'), payables: 1700 },
    { date: format(new Date(2023, 2, 1), 'MMMM Do, YYYY'), payables: 1300 },
    { date: format(new Date(2023, 3, 1), 'MMMM Do, YYYY'), payables: 900 },
    { date: format(new Date(2023, 4, 1), 'MMMM Do, YYYY'), payables: 1100 },
    { date: format(new Date(2023, 5, 1), 'MMMM Do, YYYY'), payables: 1700 },
    { date: format(new Date(2023, 6, 1), 'MMMM Do, YYYY'), payables: 1400 },
    { date: format(new Date(2023, 7, 1), 'MMMM Do, YYYY'), payables: 1600 },
    { date: format(new Date(2023, 8, 1), 'MMMM Do, YYYY'), payables: 1500 },
    { date: format(new Date(2023, 9, 1), 'MMMM Do, YYYY'), payables: 800 },
    { date: format(new Date(2023, 10, 1), 'MMMM Do, YYYY'), payables: 300 },
];

function createRow(id, contact, company, payables, terms) {
    return {
        id,
        contact, 
        company, 
        payables, 
        terms,
    };
}

export const vendors = [
    createRow("jwi832", "Jane Doe", "Acme Inc.", 1500, "Net 30"),
    createRow("idj999", "John Smith", "XYZ Corp.", 800, "Net 15"),
    createRow("aid111", "Jane Smith", "ABC Enterprises", 1700, "Net 60"),
    createRow("mno120", "John Doe", "Def Corp.", 1300, "Net 45"),
    createRow("jwe224", "Jim Brown", "Mno Inc.", 900, "Net 30"),
    createRow("esk103", "Janet Wilson", "Lmn Corp.", 1100, "Net 15"),
    createRow("kdh100", "Jim Clark", "Efg Enterprises", 1700, "Net 60"),
    createRow("bnm320", "Jasmine Lee", "Wxy Inc.", 1400, "Net 45"),
    createRow("cde323", "James Anderson", "Nop Corp.", 1600, "Net 30"),
    createRow("efg124", "Janice Davis", "Stu Enterprises", 1500, "Net 45"),
    createRow("ghi523", "James Wilson", "Vwx Inc.", 1300, "Net 60"),
];

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'id',
    },
    {
        id: 'contact',
        numeric: true,
        disablePadding: false,
        label: 'contact name',
    },
    {
        id: 'company',
        numeric: true,
        disablePadding: false,
        label: 'company',
    },
    {
        id: 'payables',
        numeric: true,
        disablePadding: false,
        label: 'payables',
    },
    {
        id: 'terms',
        numeric: true,
        disablePadding: true,
        label: 'payment terms',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'actions',
    }
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
                        {props.header}
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
                    <Col numColSpan={1} numColSpanLg={3}>
                        <TextInput
                            icon={ SearchIcon }
                            placeholder="Search..."
                            onChange={(event) => OnSearch(event)}
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

const Vendors = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ data, setData ] = useState(vendors);
    
    const calc_payables = () => {
        let sum = 0;
        vendors.forEach(vendor => {
            sum += vendor.payables;
        });
        return sum;
    }

    const handleNew = () => {

    }

    const handleEdit = (row) => {

    }

    const handleDateFilter = (range) => {
        const [startDate, endDate] = range;

        const filteredResults = endDate === null ? 
            data.filter(item => item.date === startDate)
            : 
            data.filter(item => item.date >= startDate && item.date <= endDate)

        setData(filteredResults);
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = [...new Set([
            ...data.filter((item) => item.contact.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((item) => item.company.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((item) => item.payables.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter((item) => item.terms.toLowerCase().includes(searchTerm.toLowerCase())),
        ])];
        setData( searchTerm === '' ? vendors : filteredResults);
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

    const valueFormatter = (number) => (
        `$ ${Intl.NumberFormat('en').format(number).toString()}`
    );

    return (
        <>

            <section>

                <div className="container vendors-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Vendors</h1>
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
                                New Vendor
                            </Button>
                        </div>
                    </div>
                </div>


                <div className="container vendors-insights" style={{ marginTop: 20 }}>
                    <div className="row">
                        <div className="col-xxl-8 offset-xxl-0">
                            <ColGrid numColsMd={ 2 } numColsLg={ 2 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                                <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                                    <Flex>
                                        <Block>
                                            <Text>Vendors</Text>
                                            <Metric>{data.length}</Metric>
                                        </Block>
                                        <BadgeDelta deltaType="increase" text="20%" />
                                    </Flex>
                                </Card>
                                <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                                    <Flex>
                                        <Block>
                                            <Text>Payables</Text>
                                            <Metric>{valueFormatter(calc_payables())}</Metric>
                                        </Block>
                                        <BadgeDelta deltaType="decrease" text="7%" />
                                    </Flex>
                                </Card>
                            </ColGrid>
                            <Card marginTop='mt-4'>
                                <Title>Payables</Title>
                                <LineChart
                                    data={payables}
                                    dataKey="date"
                                    categories={["payables"]}
                                    colors={["blue"]}
                                    valueFormatter={valueFormatter}  
                                    marginTop="mt-6"         
                                    yAxisWidth="w-12"
                                />
                            </Card>
                        </div>
                        <div className="col">
                            <Card marginTop='mt-7'>
                                <Title>Supplies Breakdown</Title>
                                {supplies.map(supply => {
                                    return (
                                        <Block key={supply.id} spaceY="space-y-6" marginTop='mt-6'>
                                            <Flex justifyContent="justify-start" spaceX="space-x-4" truncate={ true }>
                                                {/* <Icon variant="light" icon={supply.icon} size="md" color={supply.color} /> */}
                                                <Avatar alt={supply.title} src={supply.image} />
                                                <Block truncate={ true }>
                                                    <Text truncate={ true }><Bold>{supply.title}</Bold></Text>
                                                    <Text truncate={ true }>{supply.company}</Text>
                                                </Block>
                                                <div>
                                                    <Text color='red'>- {valueFormatter(supply.amount)}</Text>
                                                </div>
                                            </Flex>
                                        </Block>
                                    );
                                })}
                            </Card>
                        </div>
                    </div>
                </div>


                <div className='container vendors-table' style={{ marginTop: 50, marginBottom: 50 }}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar  
                                numSelected={selected.length}
                                OnBulkDelete={handleDeleteBulk}
                                OnSearch={handleSearch}
                                OnDateFilter={handleDateFilter}
                                header="Vendors"
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
                                    headCells={headCells}
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
                                                #{row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.contact}</TableCell>
                                            <TableCell align="right">{row.company}</TableCell>
                                            <TableCell align="right">{valueFormatter(row.payables)}</TableCell>
                                            <TableCell align="right">{row.terms}</TableCell>
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

export default Vendors;