
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
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";

// Tremor
import { TextInput } from '@tremor/react';
import { ColGrid } from "@tremor/react";
import { Card, Flex, Icon, Block, BadgeDelta, Text, Metric } from "@tremor/react";

// Heroicons
import { UsersIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

// MUI Icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

// From Tables
import { EnhancedTableHead } from "../../../components/tables";
import { getComparator } from "../../../components/tables";
import { stableSort } from "../../../components/tables";

// Images
import customerImage0 from "../../../assets/images/customer-1.jpg";
import customerImage1 from "../../../assets/images/customer-2.jpg";
import customerImage2 from "../../../assets/images/customer-3.jpg";
import customerImage3 from "../../../assets/images/customer-4.png";
import customerImage4 from "../../../assets/images/customer-5.png";
import customerImage5 from "../../../assets/images/customer-6.png";
import customerImage6 from "../../../assets/images/customer-7.png";

const images = [
    customerImage0,
    customerImage1,
    customerImage2,
    customerImage3,
    customerImage4,
    customerImage5,
    customerImage6,
];

export function createCustomer(name, email, id, region, orders, spent, image) {
    return {
        name,
        email,
        id,
        region,
        orders,
        spent,
        image,
    };
}

const customerheadCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'name',
      },
      {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'email',
      },
      {
        id: 'region',
        numeric: true,
        disablePadding: false,
        label: 'region',
      },
      {
        id: 'orders',
        numeric: true,
        disablePadding: false,
        label: 'orders',
      },
      {
        id: 'spent',
        numeric: false,
        disablePadding: false,
        label: 'spent',
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'actions',
      }
];

export const customers = [
    createCustomer("Carson Darrin", 'carson@gmail.coom', 'rge4535', 'Berkeley, California, USA', 60, 590, 0),
    createCustomer("Fran Perez", 'Fran@gmail.coom', 'er3dger45', 'Carson City, Nevada, USA', 75,  3000, 1),
    createCustomer("Jie Yan Song", 'Jie@gmail.coom', 'gerw453', 'Los Angeles, California, USA', 1890, 200, 2),
    createCustomer("Anika Visser", 'Anika@gmail.coom', 'her43', 'Madrid, Madrid, Spain', 20, 310, 3),
    createCustomer("Miron Vitold", 'Miron@gmail.coom', 'eert353', 'San Diego, California, USA', 45000, 3500, 4),
    createCustomer("Penjani Inyene", 'Penjani@gmail.coom', 'hrw5345', 'Atlanta, Georgia, USA', 350, 235, 5),
    createCustomer("Omar Darobe", 'Omar@gmail.coom', 'rthe343', 'Cleveland, Ohio, USA', 90,  2100, 6),
];

export function EnhancedTableToolbar(props) {
    const { numSelected, OnBulkDelete, OnSearch } = props;
  
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
                        Customers
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
                <TextInput
                    icon={ SearchIcon }
                    placeholder="Search..."
                    onChange={(event) => OnSearch(event)}
                />
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


const Customers = (props) => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ data, setData] = useState(customers);

    const handleNew = () => {

    }

    const handleEdit = (row) => {

    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setData( searchTerm === '' ? customers : filteredResults);
    }

    const handleDeleteItem = (id, name) => {
        const new_data = data.slice().filter(object => object.id !== id);
        const new_selected = selected === [] ? [] : selected.slice().filter(item => item !== name); 
        setSelected(new_selected);
        setData(new_data);
    }

    const handleDeleteBulk = () => {
        const filteredData = data.filter(object => !selected.includes(object.name));
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
            const newSelected = data.map((n) => n.name);
            setSelected(newSelected);
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


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const sum = (type) => {
        if(type === 'spent') {
            let sum = 0;
            data.forEach(item => {
                sum += item.spent;
            });
            return sum;
        } else if(type === 'orders') {
            let sum = 0;
            data.forEach(item => {
                sum += item.orders;
            });
            return sum;
        }
    }

    const insights = [
        {
            id: 'ew3r',
            title: 'Total Customers',
            metric: data.length,
            progress: 15.9,
            delta: '13.2%',
            icon : UsersIcon,
            color: 'red',
            type: 'number',
            deltaType: 'moderateIncrease',
        },
        {
            id: 'gsese',
            title: 'Total Spent',
            metric: sum('spent'),
            progress: 36.5,
            delta: '23.9%',
            icon : CurrencyDollarIcon,
            color: 'emerald',
            type: 'currency',
            deltaType: 'increase',
        },
        {
            id: 'hrwf',
            title: 'Total Orders Placed',
            metric: sum('orders'),
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
                
                <div className="container customers-header" style={{ marginTop: 50 }}>
                    <div className="row">
                    <div className="col">
                        <h1>Customers</h1>
                        <div>
                            <IconButton
                                size="small"
                                color="primary" 
                                aria-label="Import" 
                                component="label"
                                style={{ marginRight: 10, borderRadius: 1, color: "rgb(59 130 246 / 0.5)" }}
                            >
                                <FileDownloadIcon />
                                Import
                            </IconButton>
                            <IconButton 
                                size="small"
                                color="primary" 
                                aria-label="Import" 
                                component="label"
                                style={{ borderRadius: 1, color: "rgb(59 130 246 / 0.5)" }}
                            >
                                <FileUploadIcon />
                                Export
                            </IconButton>
                        </div>
                    </div>
                    <div className="col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end">
                        <Button 
                            onClick={handleNew}
                            variant="contained" 
                            startIcon={<AddIcon />}
                            style={{
                                marginTop: 20,
                            }}
                        >
                            Add Customer
                        </Button>
                    </div>
                    </div>
                </div>

                <div className="container customers-insights" style={{ marginTop: 50 }}>
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

                <div className='container customers-table' style={{ marginTop: 50 }}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar  
                                numSelected={selected.length}
                                OnBulkDelete={handleDeleteBulk}
                                OnSearch={handleSearch}
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
                                    headCells={customerheadCells}
                                />
                                <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
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
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <Avatar alt={row.name} src={images[row.image]} />
                                                    <div style={{ marginLeft: 10 }}>
                                                        {row.name}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.region}</TableCell>
                                            <TableCell align="right">{row.orders}</TableCell>
                                            <TableCell align="left">${row.spent}</TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleDeleteItem(row.id, row.name)} 
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

export default Customers;