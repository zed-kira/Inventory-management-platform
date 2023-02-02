import { Title, Text, Block, Card } from "@tremor/react";
import TextField from '@mui/material/TextField';

import { useState } from "react";

import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ColGrid, Col } from "@tremor/react";

import { createProducts } from "../../scenes/inventory";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './index.css';

const status = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'low',
      label: 'Low Stock',
    },
];

const Modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const UpdateProduct = (props) => {

    const { data, setData, product } = props;

    const [isDisabled, setDisabled] = useState(false);
    const [spinner, setSpinner] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleUpdate = () => {
        
        setDisabled(!isDisabled);
        setSpinner(<CircularProgress style={{ marginRight: "10px" }} />);

        const name = document.getElementById("product_name").value;
        const sku = document.getElementById("product_sku").value;
        const cost = document.getElementById("product_cost").value;
        const price = document.getElementById("product_price").value;
        const stock = document.getElementById("product_stock").value;
        const status = document.getElementById("product_status").innerText;
        const deltaType = status === 'Active' ? "increase" : "decrease";
        const value = deltaType === "increase" ? 2 : 3;

        const fresh_data = data.slice().filter(object => object.sku !== product.sku);
        const new_product = createProducts(name, sku, cost, price, stock, status, deltaType, value);

        fresh_data.push(new_product);

        setData(fresh_data);

    }

    return (
        <div className="product-create">
            <Block>
                <Title>Update Product</Title>
                <Text>
                    All fields are required *
                </Text>
            </Block>
            <Card className="product-form"
                maxWidth="max-w-none"
                hFull={false}
                shadow={true}
                decoration="left"
                decorationColor="blue"
                marginTop="mt-6"
            >

                {/* Name + SKU */}
                <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <TextField
                            fullWidth
                            required
                            id="product_name"
                            className="product-textField"
                            label="Name"
                            defaultValue={product.name}
                        />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            required
                            id="product_sku"
                            className="product-textField"
                            label="Product SKU"
                            defaultValue={product.sku}
                        />
                    </Col>
                </ColGrid>

                {/* Product Cost */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Cost</InputLabel>
                            <FilledInput
                                id="product_cost"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                defaultValue={product.cost}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Product Price */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
                            <FilledInput
                                id="product_price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                defaultValue={product.price}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Stock + Status */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                    <TextField
                        fullWidth
                        id="product_stock"
                        label="Stock On Hold"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        defaultValue={product.stock}
                    />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            id="product_status"
                            select
                            label="Status"
                            defaultValue={product.status}
                            helperText="Please select product status"
                            >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Col>
                </ColGrid>

                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                    {spinner}
                    <Button marginTop="mt-10" disabled={isDisabled} onClick={handleUpdate} variant="contained">Update Product</Button>
                    <Button marginTop="mt-10" color="error" style={{ marginLeft: "10px" }} disabled={isDisabled} onClick={() => window.location.href="/inventory"} variant="outlined">
                        Cancel
                    </Button>
                </Box>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Modal_style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Note
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Server-Side implementation will be added soon!
                </Typography>
                </Box>
            </Modal>
        </div>
    );

}

const Product = (props) => {

    /* name, sku, cost, price, stock, status, deltaType, value */

    const { data, setData } = props;

    const [isDisabled, setDisabled] = useState(false);
    const [spinner, setSpinner] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleSave = () => {

        setDisabled(!isDisabled);
        setSpinner(<CircularProgress style={{ marginRight: "10px" }} />);

        const name = document.getElementById("product_name").value;
        const sku = document.getElementById("product_sku").value;
        const cost = document.getElementById("product_cost").value;
        const price = document.getElementById("product_price").value;
        const stock = document.getElementById("product_stock").value;
        const status = document.getElementById("product_status").innerText;
        const deltaType = status === 'Active' ? "increase" : "decrease";
        const value = deltaType === "increase" ? 2 : 3;

        const new_product = createProducts(name, sku, cost, price, stock, status, deltaType, value);
        data.push(new_product);
        setData(data);

        setTimeout(() => {
            setDisabled(isDisabled);
            setSpinner(null);
            setOpen(true);
        }, 2000);

    }

    return (
        <div className="product-create">
            <Block>
                <Title>Create New Product</Title>
                <Text>
                    All fields are required *
                </Text>
            </Block>
            <Card className="product-form"
                maxWidth="max-w-none"
                hFull={false}
                shadow={true}
                decoration="left"
                decorationColor="blue"
                marginTop="mt-6"
            >

                {/* Name + SKU */}
                <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <TextField
                            fullWidth
                            required
                            id="product_name"
                            className="product-textField"
                            label="Name"
                        />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            required
                            id="product_sku"
                            className="product-textField"
                            label="Product SKU"
                        />
                    </Col>
                </ColGrid>

                {/* Product Cost */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Cost</InputLabel>
                            <FilledInput
                                id="product_cost"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Product Price */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
                            <FilledInput
                                id="product_price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Stock + Status */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                    <TextField
                        fullWidth
                        id="product_stock"
                        label="Stock On Hold"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            id="product_status"
                            select
                            label="Select"
                            defaultValue="active"
                            helperText="Please select product status"
                            >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Col>
                </ColGrid>

                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                    {spinner}
                    <Button marginTop="mt-10" disabled={isDisabled} onClick={handleSave} variant="contained">Create Service</Button>
                    <Button marginTop="mt-10" color="error" style={{ marginLeft: "10px" }} disabled={isDisabled} onClick={() => window.location.href="/inventory"} variant="outlined">
                        Cancel
                    </Button>
                </Box>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Modal_style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Note
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Server-Side implementation will be added soon!
                </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Product;