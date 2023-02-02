import { Card, Title, AreaChart } from "@tremor/react";
import {
  BadgeDelta,
  Block,
  ColGrid,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from '@tremor/react';

import { DonutChart } from '@tremor/react';
import { Legend, Bold } from "@tremor/react";
import { Icon } from "@tremor/react";

import './index.css';

import Avatar from '@mui/material/Avatar';

import { LineChart } from "@tremor/react";

// Heroicons
import { UsersIcon, DocumentTextIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

import { expenses, valueFormatter, transactions } from "../purchases/expenses";
import { vendors, payables } from "../purchases/vendors";
import { customers } from "../sales/customers";
import { invoices } from "../sales/invoices";

const kpiData = [
  {
      title: 'Sales',
      metric: '$ 120,699',
      progress: 15.9,
      target: '$ 80,000',
      delta: '13.2%',
      deltaType: 'moderateIncrease',
  },
  {
      title: 'Profit',
      metric: '$ 45,564',
      progress: 36.5,
      target: '$ 125,000',
      delta: '23.9%',
      deltaType: 'increase',
  },
  {
      title: 'Customers',
      metric: '1,072',
      progress: 53.6,
      target: '2,000',
      delta: '10.1%',
      deltaType: 'moderateDecrease',
  },
];


const chartdata = [
    {
      date: "Jan 22",
      Sales: 2890,
      "Profit": 2338,
    },
    {
      date: "Feb 22",
      Sales: 2756,
      "Profit": 2103,
    },
    {
      date: "Mar 22",
      Sales: 3322,
      "Profit": 2194,
    },
    {
      date: "Apr 22",
      Sales: 3470,
      "Profit": 2108,
    },
    {
      date: "May 22",
      Sales: 3475,
      "Profit": 1812,
    },
    {
      date: "Jun 22",
      Sales: 3129,
      "Profit": 1726,
    },
  ];
  
const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export default function Dashboard() {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const calc_payables = () => {
      let sum = 0;
      vendors.forEach(vendor => {
          sum += vendor.payables;
      });
      return sum;
    }

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

    const sum = (type) => {
      if(type === 'spent') {
          let sum = 0;
          customers.forEach(item => {
              sum += item.spent;
          });
          return sum;
      } else if(type === 'orders') {
          let sum = 0;
          customers.forEach(item => {
              sum += item.orders;
          });
          return sum;
      }
    }

    const insights = [
      {
          id: 'ew3r',
          title: 'Total Customers',
          metric: 23,
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
      {
        id: 'jresjyy6',
        title: 'Total Invoices',
        metric: invoices.length,
        progress: 15.9,
        delta: '13.2%',
        icon : DocumentTextIcon,
        color: 'cyan',
        type: 'number',
        deltaType: 'moderateIncrease',
      },
    ];
    
    return (
      <div className="dashboard-section">

        <div className="container-fluid dashboard-container" style={{ marginTop: 50 }}>
            <div style={{ marginRight: '20px', marginLeft: '20px', marginBottom: '50px' }}>
              <ColGrid numColsMd={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                { kpiData.map((item) => (
                    <Card key={ item.title }>
                        <Flex alignItems="items-start">
                            <Block truncate={ true }>
                                <Text>{ item.title }</Text>
                                <Metric truncate={ true }>{ item.metric }</Metric>
                            </Block>
                            <BadgeDelta deltaType={ item.deltaType } text={ item.delta } />
                        </Flex>
                        <Flex marginTop="mt-4" spaceX="space-x-2">
                            <Text truncate={ true }>{ `${item.progress}% (${item.metric})` }</Text>
                            <Text>{ item.target }</Text>
                        </Flex>
                        <ProgressBar percentageValue={ item.progress } marginTop="mt-2" />
                    </Card>
                )) }
              </ColGrid>
            </div>

            <div style={{ marginRight: '20px', marginLeft: '20px', marginBottom: '50px' }}>
              <Card>
                  <Title>Sales & Profit over time (USD)</Title>
                  <AreaChart
                      data={chartdata}
                      categories={["Sales", "Profit"]}
                      dataKey="date"
                      height="h-72"
                      colors={["indigo", "cyan"]}
                      valueFormatter={dataFormatter}
                      marginTop="mt-4"
                  />
              </Card>
            </div>
        </div>

        <section>

            <div className="container-fluid expenses-insights" style={{ marginTop: 20, marginBottom: 20 }}>
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

            <div className="container-fluid vendors-insights" style={{ marginTop: 20, marginBottom: 100 }}>
                <div className="row">
                    <div className="col-xxl-8 offset-xxl-0">
                        <ColGrid numColsMd={ 2 } numColsLg={ 2 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                            <Card maxWidth="max-w-lg" decoration="left" decorationColor="blue">
                                <Flex>
                                    <Block>
                                        <Text>Vendors</Text>
                                        <Metric>{vendors.length}</Metric>
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
                      { insights.map((item) => (
                          <Card key={ item.id } marginTop="mt-6">
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
                          </Card>
                      )) }
                    </div>
                </div>
            </div>

        </section>

      </div>
    );
}