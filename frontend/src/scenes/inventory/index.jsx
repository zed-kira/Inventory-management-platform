import { Block, Dropdown, DropdownItem, Flex, ColGrid, Tab, TabList, Title } from "@tremor/react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { Card, Text, Metric } from "@tremor/react";

import * as React from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '@tremor/react';

import { useState, useEffect } from "react";

import { BadgeDelta } from "@tremor/react";

import Product from '../.././components/products';
import Service from '../.././components/services';

import { UpdateProduct } from "../.././components/products";
import { UpdateService } from "../.././components/services";

// From Tables
import { EnhancedTableHead } from "../../components/tables";
import { getComparator } from "../../components/tables";
import { stableSort } from "../../components/tables";

import './index.css';

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export function EnhancedTableToolbar(props) {
    const { onClick, numSelected, headerdata, onNewClick, OnSearch } = props;

    const filters = headerdata.filters;
  
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
                        {headerdata.general.header}
                    </Typography>
                )}
                <div className="inventory-topbar">
                    <Dropdown
                        onValueChange={ (value) => onClick(value) }
                        placeholder="filter..."
                    >
                        { filters.map( filter => {
                            return (
                                <DropdownItem
                                    key={filter.id}
                                    value={filter.value}
                                    text={filter.text}
                                    icon={ undefined }
                                />
                            );
                        } ) }
                    </Dropdown>
                </div>
                <Button onClick={() => onNewClick()} variant="contained" startIcon={<AddIcon />}>
                    New
                </Button>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => props.OnBulkDelete()}>
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

export function createProducts(name, sku, cost, price, stock, status, deltaType, value) {
    return {
      name,
      sku,
      cost,
      price,
      stock,
      status,
      deltaType,
      value,
    };
}

export function createServices(name, sku, cost, price, status, deltaType, value) {
    return {
        name,
        sku,
        cost,
        price,
        status,
        deltaType,
        value,
    };
}

const productFilters = {
    general: {
        header: "Products",
    },
    filters: [
        {
            id: "all",
            text: "All Products",
            value: 1,
        },
        {
            id: "active",
            text: "Active",
            value: 2,
        },
        {
            id: "low",
            text: "Low Stock",
            value: 3,
        },
    ]
    
}

export const products = [
    createProducts('Cupcake', 'gefg53rg', 10.00, 34.99, 90, 'active', 'increase', 2),
    createProducts('Donut', 'ege34ger', 45.00, 80.90, 2, 'low stock', 'decrease', 3),
    createProducts('Eclair', 'gerg34e', 2.00, 12.05, 160, 'active', 'increase', 2),
    createProducts('Frozen yoghurt', 'rerh34', 100.00, 350.00, 6, 'low stock', 'decrease', 3),
    createProducts('Gingerbread', 'gert35g', 12.00, 15.00, 130, 'active', 'increase', 2),
    createProducts('Honeycomb', 'wer4ger3', 3.90, 5.50, 331, 'active', 'increase', 2),
    createProducts('Ice cream sandwich', 'wetr432', 30.00, 20.25, 70, 'active', 'increase', 2),
    createProducts('Jelly Bean', 'jrt2er', 300.00, 550.90, 280, 'active', 'increase', 2),
    createProducts('KitKat', 'fhe34ts', 0.50, 2.30, 8, 'low stock', 'decrease', 3),
    createProducts('Lollipop', 'gwt343', 49.00, 55.00, 320, 'active', 'increase', 2),
    createProducts('Marshmallow', 'we24tr', 20.00, 24.50, 900, 'active', 'increase', 2),
    createProducts('Nougat', 'hr423fge', 69.00, 75.99, 100, 'active', 'increase', 2),
    createProducts('Oreo', 'ky2fg', 12.00, 15.50, 900, 'active', 'increase', 2),
];

const serviceFilters = {
    general: {
        header: "Services",
    },
    filters: [
        {
            id: "all",
            text: "All Services",
            value: 1,
        },
        {
            id: "active",
            text: "Active",
            value: 2,
        },
        {
            id: "draft",
            text: "Draft",
            value: 3,
        },
    ]
}

export const services = [
    createServices("Cleaning Service", 'gefg53rg', 40, 60, "active", "increase", 2),
    createServices("Lawn Maintenance", 'rth4', 50, 75, "draft", "decrease", 3),
    createServices("House Painting", 'ery32', 120, 180, "active", "increase", 2),
    createServices("Pool Maintenance", 'jerte3', 80, 120, "draft", "decrease", 3),
    createServices("Carpet Cleaning", 'jtt3', 30, 45, "draft", "decrease", 3),
    createServices("Window Washing", 'jthrt3r3', 20, 30, "active", "increase", 2),
    createServices("Pressure Washing", 'jluiudf4', 60, 90, "active", "increase", 2),
]; 

const productsHeadCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'SKU',
      numeric: true,
      disablePadding: false,
      label: 'SKU',
    },
    {
        id: 'cost',
        numeric: true,
        disablePadding: false,
        label: 'Cost',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
      id: 'Stock On Hand',
      numeric: true,
      disablePadding: false,
      label: 'Stock On Hand',
    },
    {
      id: 'Status',
      numeric: true,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'Actions',
      numeric: true,
      disablePadding: false,
      label: 'Actions',
    }
];

const servicesheadCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
      },
      {
        id: 'SKU',
        numeric: true,
        disablePadding: false,
        label: 'SKU',
      },
      {
        id: 'cost',
        numeric: true,
        disablePadding: false,
        label: 'Cost',
      },
      {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
      },
      {
        id: 'Status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
      },
      {
        id: 'Actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
      }
];

const Services = (props) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //const [ data, setData] = useState(services);
    const { onClick, onUpdate, data, setData } = props;

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setData( searchTerm === '' ? services : filteredResults);
    }

    const handleDeleteItem = (sku, name) => {
        const new_data = data.slice().filter(object => object.sku !== sku);
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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleFilter = (value) => {
        if(value === 1) {
            setData(services)
        } else {
            const filtered_data = services.filter(item => item.value === value);
            setData(filtered_data);
        }
    }

    return (
        <>
            {/* <div className="service-metrics">
                <ColGrid numColsMd={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Services</Text>
                                <Metric>{ data.length }</Metric>
                            </Block>
                            <BadgeDelta deltaType="increase" text="20%" />
                        </Flex>
                    </Card>
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Estimated Sales</Text>
                                <Metric>47,230</Metric>
                            </Block>
                            <BadgeDelta deltaType="decrease" text="7%" />
                        </Flex>
                    </Card>
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Services Cost</Text>
                                <Metric>22,400</Metric>
                            </Block>
                            <BadgeDelta deltaType="decrease" text="43%" />
                        </Flex>
                    </Card>
                </ColGrid>
            </div> */}

            <div className="services-list">

                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar 
                            onClick={handleFilter} 
                            numSelected={selected.length}
                            headerdata={serviceFilters}
                            onNewClick={onClick}
                            OnBulkDelete={handleDeleteBulk}
                            OnSearch={handleSearch}
                        />
                        <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={services.length}
                                headCells={servicesheadCells}
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
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.sku}</TableCell>
                                        <TableCell align="right">${row.cost}</TableCell>
                                        <TableCell align="right">${row.price}</TableCell>
                                        <TableCell align="right">
                                            <BadgeDelta text={ row.status } deltaType={ row.deltaType } />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton 
                                                onClick={() => handleDeleteItem(row.sku, row.name)} 
                                                color="primary" 
                                                aria-label="Delete Product" 
                                                component="label"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => onUpdate('service', row)}
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
                                    height: (dense ? 33 : 53) * emptyRows,
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
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>
            </div>
        </>
    );
}

const Products = (props) => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //const [ data, setData] = useState(products);

    const { onClick, onUpdate, data, setData } = props;

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setData( searchTerm === '' ? products : filteredResults);
    }

    const handleDeleteItem = (sku, name) => {
        const new_data = data.slice().filter(object => object.sku !== sku);
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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleFilter = (value) => {
        if(value === 1) {
            setData(products)
        } else {
            const filtered_data = products.filter(item => item.value === value);
            setData(filtered_data);
        }
    }
    
    const price_formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const costs = data.map(object => object.cost * object.stock).reduce((acc, value) => acc + value, 0);
    const estimated_sales = data.map(object => object.price * object.stock).reduce((acc, value) => acc + value, 0);

    return (
        <>
            <div className="product-metrics">
                <ColGrid numColsMd={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Products</Text>
                                <Metric>{ data.length }</Metric>
                            </Block>
                            <BadgeDelta deltaType="increase" text="20%" />
                        </Flex>
                    </Card>
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Estimated Sales</Text>
                                <Metric>{ price_formatter.format(estimated_sales) }</Metric>
                            </Block>
                            <BadgeDelta deltaType="decrease" text="7%" />
                        </Flex>
                    </Card>
                    <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                        <Flex>
                            <Block>
                                <Text>Products Cost</Text>
                                <Metric>{ price_formatter.format(costs) }</Metric>
                            </Block>
                            <BadgeDelta deltaType="decrease" text="43%" />
                        </Flex>
                    </Card>
                </ColGrid>
            </div>

            <div className="products-list">
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar 
                            onClick={handleFilter} 
                            numSelected={selected.length} 
                            headerdata={productFilters}
                            onNewClick={onClick}
                            OnBulkDelete={handleDeleteBulk}
                            OnSearch={handleSearch}
                        />
                        <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={products.length}
                                headCells={productsHeadCells}
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
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.sku}</TableCell>
                                        <TableCell align="right">${row.cost}</TableCell>
                                        <TableCell align="right">${row.price}</TableCell>
                                        <TableCell align="right">{row.stock}</TableCell>
                                        <TableCell align="right">
                                            <BadgeDelta text={ row.status } deltaType={ row.deltaType } />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton 
                                                onClick={() => handleDeleteItem(row.sku, row.name)} 
                                                color="primary" 
                                                aria-label="Delete Product" 
                                                component="label"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => onUpdate('product', row)}
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
                                    height: (dense ? 33 : 53) * emptyRows,
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
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>
            </div>
        </>
    );
}

const Inventory = (props) => {

    const [selectedView, setSelectedView] = useState(1);

    const [productComponent, setProduct] = useState(null); 
    const [serviceComponent, setService] = useState(null);

    const [productData, setProductData] = useState(props.products);
    const [serviceData, setServiceData] = useState(props.services);

    const handleUpdateClick = (type, row) => {
        if(type === 'product') {
            setProduct(<UpdateProduct data={productData} setData={setProductData} product={row} />)
        }
        if(type === 'service') {
            setService(<UpdateService data={serviceData} setData={setServiceData} service={row}/>)
        }
    }

    // Shows product create form
    const handleProductClick = () => {
        setProduct(<Product data={products} setData={setProductData} />);
    }

    // Shows service create form
    const handleServiceClick = () => {
        setService(<Service data={services} setData={setServiceData} />);
    }

    // Shows the products and services default listings
    useEffect( () => {
        setProduct(<Products onClick={handleProductClick} onUpdate={handleUpdateClick} data={productData} setData={setProductData} />);
        setService(<Services onClick={handleServiceClick} onUpdate={handleUpdateClick} data={serviceData} setData={setServiceData} />);
    }, [productData, serviceData]);

    return (
        <>
            <main className="bg-slate-50 p-6 sm:p-10 inventory-tabs">
                <Title>Inventory</Title>
                <Text>
                    Manage Your Products & Services With Ease.
                </Text>

                <TabList defaultValue={ 1 } onValueChange={ (value) => setSelectedView(value) } marginTop="mt-6">
                    <Tab value={ 1 } text="Products" />
                    <Tab value={ 2 } text="Services" />
                </TabList>

                { selectedView === 1 ? (
                    <>
                        {productComponent}
                    </>
                ) : (
                    
                    <>
                        {serviceComponent}
                    </>
                ) }
            </main>
        </>
    );

}

export default Inventory;