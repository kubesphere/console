/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { AreaChartProps } from '@kubed/charts';
import { get, last } from 'lodash';
import React from 'react';
import SimpleArea, { Props as SimpleAreaProps } from '../SimpleArea';
import { Label, Title, Wrapper } from './styles';

function MediumArea({
  title,
  titleNode,
  data,
  dataKey = 'time',
  unit,
  ...rest
}: SimpleAreaProps & Omit<AreaChartProps, 'height' | 'dataKey'>) {
  const series = Object.keys(data?.[0] || {}).filter(key => key !== dataKey);
  const key = get(series, [0], '');
  const lastValue = last(data)?.[key] ?? 0;

  const renderTitle = () => {
    if (titleNode) return titleNode;

    return (
      <Title>
        <Label>
          <strong>{lastValue}</strong> {t(unit || '')}
        </Label>
        {lastValue !== 1 && !unit ? t(`${title}_PL`) : t(title || '')}
      </Title>
    );
  };

  return (
    <Wrapper>
      <SimpleArea
        {...rest}
        padding={0}
        data={data}
        dataKey={dataKey}
        unit={unit}
        titleNode={renderTitle()}
        showXAxis={false}
        showYAxis={false}
        showLegend={false}
        showGridLines={false}
        margin={{ top: 45, left: 0, right: 0, bottom: 0 }}
      />
    </Wrapper>
  );
}

export default MediumArea;
