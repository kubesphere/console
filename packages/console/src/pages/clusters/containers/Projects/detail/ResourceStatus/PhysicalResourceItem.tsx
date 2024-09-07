/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getAreaChartOps, getLocalTime } from '@ks-console/shared';
import { AreaChart } from '@kubed/charts';
import { LoadingOverlay } from '@kubed/components';
import { isEmpty } from 'lodash';

import * as React from 'react';
import styled from 'styled-components';

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const textAnchor = 'middle';

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} fill="#79879c" textAnchor={textAnchor}>
        {payload.value}
      </text>
    </g>
  );
};

interface Props {
  className?: string;
  type: string;
  title: string;
  metrics: any[];
  showDay?: boolean;
  isLoading?: boolean;
}

const PhysicalResourceItem = (props: Props) => {
  const { type, title, metrics, showDay, isLoading = false } = props;
  const config = getAreaChartOps({
    unitType: type,
    legend: [title],
    data: metrics,
    xFormatter: (value: string) =>
      getLocalTime((Number(value) * 1000).toString()).format(showDay ? 'MM-DD HH:mm' : 'HH:mm'),
  } as any);

  const dataKey = 'time';
  const { data = [] } = config;
  const series = Object.keys(data[0] || {}).filter(key => key !== dataKey);

  return (
    <div className={props.className}>
      <div className={'chart-name'}>
        <span>{title}</span>
      </div>
      <LoadingOverlay visible={isLoading} />
      {metrics && (
        <AreaChart
          {...config}
          dataKey={dataKey}
          categories={series}
          data={data}
          margin={{ top: 32, left: 16, right: 16, bottom: 0 }}
          xAxisProps={{
            dataKey: dataKey,
            tickLine: false,
            height: 30,
            interval: 'preserveStart',
            tick: <CustomizedAxisTick />,
            minTickGap: 20,
          }}
          yAxisProps={{
            hide: true,
            type: 'number',
            domain: [
              (dataMin: number) => 0 - Math.abs(dataMin),
              (dataMax: number) => dataMax * 1.6,
            ],
          }}
          showTooltip
          showLegend={false}
          showGridLines
        />
      )}
    </div>
  );
};

export default styled(PhysicalResourceItem)`
  position: relative;
  background-color: #242e42;
  border-radius: 4px;
  height: 120px;
  .chart-name {
    position: absolute;
    left: 12px;
    top: 6px;
    color: #fff;
    font-weight: 600;
    line-height: 20px;
  }
`;
