import React from 'react';
import { getSuitableUnit, getValueByUnit } from '@ks-console/shared';
import { PieChart } from '@kubed/charts';
import { Item, PieWrapper, StyledField } from './styles';

interface Props {
  name: string;
  unitType: string;
  used: number;
  total: number;
}

function ResourceItem({ name, unitType, used, total }: Props) {
  const $unit = getSuitableUnit(total, unitType);
  const $used = getValueByUnit(used, $unit);
  const $total = getValueByUnit(total, $unit) || used;

  const data = [
    {
      name: 'Used',
      value: $used,
    },
    {
      name: 'Left',
      value: $total - $used,
    },
  ];

  return (
    <Item>
      <PieWrapper>
        <PieChart
          data={data}
          dataKey="name"
          category="value"
          width={48}
          height={48}
          colors={['#329dce', '#c7deef']}
          stroke="transparent"
          innerRadius={60}
          outerRadius={100}
          showTooltip={false}
        />
      </PieWrapper>
      <StyledField value={`${Math.round(($used * 100) / $total)}%`} label={name} />
      <StyledField
        value={
          $unit ? ($used !== 1 && $unit === 'core' ? `${$used} cores` : `${$used} ${$unit}`) : $used
        }
        label={t('USED')}
      />
      <StyledField
        value={
          $unit
            ? $total !== 1 && $unit === 'core'
              ? `${$total} cores`
              : `${$total} ${$unit}`
            : $total
        }
        label={t('TOTAL')}
      />
    </Item>
  );
}

export default ResourceItem;
