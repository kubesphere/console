/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import { last } from 'lodash';
import { AreaChart, AreaChartProps } from '@kubed/charts';
import { ChartWrapper, Title } from './styles';

interface TinyAreaProps extends Omit<AreaChartProps, 'width' | 'height'> {
  width?: number | string;
  height?: number | string;
  title?: string;
  unit?: string;
  data?: Record<string, string | number | null>[];
  bgColor?: string;
  areaColors?: any[];
  titleNode?: ReactNode;
  areaNode?: ReactNode;
  darkMode?: boolean;
}

function TinyArea({
  width = 180,
  height = 56,
  title = 'Title',
  dataKey = 'time',
  unit = '',
  data = [],
  categories,
  bgColor,
  titleNode,
  darkMode,
  showLegend = false,
  showTooltip = false,
  showXAxis = false,
  showYAxis = false,
  showGridLines = false,
  ...rest
}: TinyAreaProps) {
  const series = useMemo(
    () => Object.keys(data[0] || {}).filter(key => key !== dataKey),
    [dataKey, data],
  );

  const lastValue = useMemo(
    () => (series.length === 1 ? `${last(data)?.[series[0]]} ${unit}` : ''),
    [data, unit],
  );

  const titleContent = useMemo(() => {
    if (titleNode) return titleNode;
    return <Title darkMode={darkMode}>{`${t(title)} ${lastValue}`}</Title>;
  }, [title, titleNode]);

  return (
    <ChartWrapper
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {titleContent}
      <AreaChart
        data={data}
        dataKey={dataKey}
        categories={categories}
        showLegend={showLegend}
        showTooltip={showTooltip}
        showXAxis={showXAxis}
        showYAxis={showYAxis}
        showGridLines={showGridLines}
        {...rest}
      />
    </ChartWrapper>
  );
}

export default TinyArea;
