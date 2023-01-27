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

import './index.css';

const kpiData = [
  {
      title: 'Sales',
      metric: '$ 12,699',
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
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];
  
  const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

export default function Dashboard() {
    
    return (
      <>
      
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
              <Title>Newsletter revenue over time (USD)</Title>
              <AreaChart
                  data={chartdata}
                  categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                  dataKey="date"
                  height="h-72"
                  colors={["indigo", "cyan"]}
                  valueFormatter={dataFormatter}
                  marginTop="mt-4"
              />
          </Card>
        </div>

      </>
    );
}