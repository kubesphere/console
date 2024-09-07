/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import { AreaChart, AreaChartProps } from '@kubed/charts';
import { getColorByName } from '../../../utils';
import { ChartWrapper, Title } from './styles';
import { isUndefined } from 'lodash';
import cx from 'classnames';

export interface Props {
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  dataKey?: string;
  title?: string;
  theme?: string;
  unit?: string;
  data?: Record<string, string | number | null>[];
  areaColors?: any[];
  titleNode?: ReactNode;
  areaNode?: ReactNode;
  renderTooltip?: (payload: Record<string, any>[]) => React.ReactNode;
}

function SimpleArea({
  // width = '100%',
  height = 200,
  padding = 0,
  title = 'Title',
  dataKey = 'time',
  theme = 'dark',
  unit = '',
  data = [],
  categories,
  titleNode,
  colors,
  showLegend,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  legendAlign = 'left',
  legendVerticalAlign = 'bottom',
  renderTooltip,
  ...rest
}: Props & Omit<AreaChartProps, 'height' | 'dataKey'>) {
  const $colors = colors?.map(t => getColorByName(t));
  const titleContent = useMemo(() => {
    if (titleNode) return titleNode;
    return (
      <Title>
        {t(title)} {unit && `(${unit})`}
      </Title>
    );
  }, [title, titleNode, unit]);

  const $showLegend = isUndefined(showLegend) ? categories.length > 1 : showLegend;
  const $margin = { top: 0, bottom: 12, left: 10, right: 0 };
  const legendFormatter = (l: { dataKey: string }) => t(l.dataKey);
  const valueFormatter = (v: string | number) => `${v} ${unit || ''}`;

  return (
    <ChartWrapper
      className={cx('chart_wrapper', {
        [`chart_${theme}`]: theme!,
        height_not_auto: height === '100%',
      })}
      style={{
        padding,
      }}
    >
      {titleContent}
      <div style={{ height }} className="chart_content">
        <AreaChart
          data={data}
          dataKey={dataKey}
          categories={categories}
          showLegend={$showLegend}
          margin={$margin}
          legendFormatter={legendFormatter}
          legendAlign={legendAlign}
          legendVerticalAlign={legendVerticalAlign}
          valueFormatter={valueFormatter}
          showTooltip={showTooltip}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showGridLines={showGridLines}
          xAxisProps={{
            minTickGap: 60,
          }}
          colors={$colors}
          yAxisProps={{
            width: 45,
            tickFormatter(value: any) {
              if (value <= 0) return '';
              if (value > 100000) return `${Math.round(value / 1000)}k`;
              return value;
            },
          }}
          customTooltip={renderTooltip ? renderTooltip : undefined}
          {...rest}
        />
      </div>
    </ChartWrapper>
  );
}
export default SimpleArea;
