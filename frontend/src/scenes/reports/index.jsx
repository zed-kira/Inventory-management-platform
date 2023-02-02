// React 
import { useState } from "react";

// MUI Components
import { Button } from "@mui/material";

// Ant Design
import { Collapse, Space } from 'antd';

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';

// Heroicons
import { UsersIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/react/24/solid';

// Custom CSS
import './index.css';

// tremor
import { ColGrid, Card, DonutChart, Flex, Icon, Text, Metric, Title, Bold, Footer } from "@tremor/react";
import { Block, BadgeDelta } from "@tremor/react";
import { Legend } from "@tremor/react";

const Products = () => {

    function createProducts(name, sku, cost, price, stock, status, deltaType, value) {
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

    const products = [
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

    const [ data, setData] = useState(products);

    const price_formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const costs = data.map(object => object.cost * object.stock).reduce((acc, value) => acc + value, 0);
    const estimated_sales = data.map(object => object.price * object.stock).reduce((acc, value) => acc + value, 0);

    return (
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
    );
    
};

const Customers = () => {

    function createCustomer(name, email, id, region, orders, spent, image) {
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

    const customers = [
        createCustomer("Carson Darrin", 'carson@gmail.coom', 'rge4535', 'Berkeley, California, USA', 60, 590, 0),
        createCustomer("Fran Perez", 'Fran@gmail.coom', 'er3dger45', 'Carson City, Nevada, USA', 75,  3000, 1),
        createCustomer("Jie Yan Song", 'Jie@gmail.coom', 'gerw453', 'Los Angeles, California, USA', 1890, 200, 2),
        createCustomer("Anika Visser", 'Anika@gmail.coom', 'her43', 'Madrid, Madrid, Spain', 20, 310, 3),
        createCustomer("Miron Vitold", 'Miron@gmail.coom', 'eert353', 'San Diego, California, USA', 45000, 3500, 4),
        createCustomer("Penjani Inyene", 'Penjani@gmail.coom', 'hrw5345', 'Atlanta, Georgia, USA', 350, 235, 5),
        createCustomer("Omar Darobe", 'Omar@gmail.coom', 'rthe343', 'Cleveland, Ohio, USA', 90,  2100, 6),
    ];

    const [ data, setData] = useState(customers);

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
        <div className="container customers-insights" style={{ marginBottom: 20 }}>
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
    );

};

const Orders = () => {

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
    
    const [ data, setData] = useState(orders);

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
        <div className="container orders-insights" style={{ marginBottom: 20 }}>
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
    );

};

const Expenses = () => {

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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const valueFormatter = (number) => (
        `$ ${Intl.NumberFormat('us').format(number).toString()}`
    );

    return (

        <>
        
            <div className="container expenses-insights" style={{ marginBottom: 20 }}>
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
        
        </>

    );

};

const reports = [
    {
        id: "235h3fj",
        component: <Orders />,
        title: "Orders",
    },
    {
        id: "fjer3r4",
        component: <Customers />,
        title: "Customers",
    },
    {
        id: "hwer4tdh",
        component: <Expenses />,
        title: "Expenses",
    },
    {
        id: "shregdg463",
        component: <Products />,
        title: "Products",
    },
];


const Reports = () => {

    const handleNew = () => {

    }

    const [data, setData] = useState(reports);

    const { Panel } = Collapse;

    return (
        <>

            <section>

                <div className="container reports-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Reports</h1>
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
                                New Report
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container report-accordions" style={{ marginTop: 50, marginBottom: 50 }}>
                    <div className="row">
                        <Space direction="vertical">
                            {data.map(item => {
                                return (
                                    <Collapse key={item.id} collapsible="header" defaultActiveKey={['1']}>
                                        <Panel header={item.title} key="1">
                                            {item.component}
                                        </Panel>
                                    </Collapse>
                                );
                            })}
                        </Space>  
                    </div>
                </div>
            
            </section>
        </>
    );
};

export default Reports;