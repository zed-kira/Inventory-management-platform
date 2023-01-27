import { Title, Text, Block, Divider, Card } from "@tremor/react";
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

import { createServices } from "../../scenes/inventory";

import './index.css';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const status = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'draft',
      label: 'Draft',
    },
];

export const UpdateService = (props) => {

    const { data, setData, service } = props;

    const [isDisabled, setDisabled] = useState(false);
    const [spinner, setSpinner] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleUpdate = () => {
        
        setDisabled(!isDisabled);
        setSpinner(<CircularProgress style={{ marginRight: "10px" }} />);

        const name = document.getElementById("service_name").value;
        const sku = document.getElementById("service_sku").value;
        const cost = document.getElementById("service_cost").value;
        const price = document.getElementById("service_price").value;
        const status = document.getElementById("service_status").innerText;
        const deltaType = status === 'Active' ? "increase" : "decrease";
        const value = deltaType === "increase" ? 2 : 3;

        const new_service = createServices(name, sku, cost, price, status, deltaType, value);

        const fresh_data = data.slice().filter(object => object.sku !== service.sku);

        fresh_data.push(new_service);

        setData(fresh_data);

        setTimeout(() => {
            setDisabled(isDisabled);
            setSpinner(null);
            setOpen(true);
        }, 2000);

    }

    return (
        <div className="service-create">
            <Block>
                <Title>Update Service</Title>
                <Text>
                    All fields are required *
                </Text>
            </Block>
            <Card className="service-form"
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
                            id="service_name"
                            className="service-textField"
                            label="Name"
                            defaultValue={service.name}
                        />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            required
                            id="service_sku"
                            className="service-textField"
                            label="Product SKU"
                            defaultValue={service.sku}
                        />
                    </Col>
                </ColGrid>

                {/* Service Cost */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Cost</InputLabel>
                            <FilledInput
                                id="service_cost"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                defaultValue={service.cost}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Service Price */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
                            <FilledInput
                                id="service_price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                defaultValue={service.price}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Service Status */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <TextField
                            fullWidth
                            id="service_status"
                            select
                            label="Status"
                            defaultValue={service.status}
                            helperText="Please select service status"
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
                    <Button marginTop="mt-10" disabled={isDisabled} onClick={handleUpdate} variant="contained">Update Service</Button>
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

const Service = (props) => {

    const { data, setData } = props;

    const [isDisabled, setDisabled] = useState(false);
    const [spinner, setSpinner] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleSave = () => {

        setDisabled(!isDisabled);
        setSpinner(<CircularProgress style={{ marginRight: "10px" }} />);

        const name = document.getElementById("service_name").value;
        const sku = document.getElementById("service_sku").value;
        const cost = document.getElementById("service_cost").value;
        const price = document.getElementById("service_price").value;
        const status = document.getElementById("service_status").innerText;
        const deltaType = status === 'Active' ? "increase" : "decrease";
        const value = deltaType === "increase" ? 2 : 3;

        const new_service = createServices(name, sku, cost, price, status, deltaType, value);
        data.push(new_service);
        setData(data);

        setTimeout(() => {
            setDisabled(isDisabled);
            setSpinner(null);
            setOpen(true);
        }, 2000);

    }

    return (
        <div className="service-create">
            <Block>
                <Title>Create New Service</Title>
                <Text>
                    All fields are required *
                </Text>
            </Block>
            <Card className="service-form"
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
                            id="service_name"
                            className="service-textField"
                            label="Name"
                        />
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            required
                            id="service_sku"
                            className="service-textField"
                            label="Product SKU"
                        />
                    </Col>
                </ColGrid>

                {/* Service Cost */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Cost</InputLabel>
                            <FilledInput
                                id="service_cost"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Service Price */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={1} numColsLg={1} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
                            <FilledInput
                                id="service_price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Col>
                </ColGrid>

                {/* Service Status */}
                <ColGrid marginTop="mt-10" numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col>
                        <TextField
                            fullWidth
                            id="service_status"
                            select
                            label="Status"
                            defaultValue="active"
                            helperText="Please select service status"
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

export default Service;