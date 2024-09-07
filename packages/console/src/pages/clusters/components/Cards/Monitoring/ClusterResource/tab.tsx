/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { getSuitableUnit, getValueByUnit, SimpleCircle } from '@ks-console/shared';
import { Info, InfoTitle, Tab } from '../styles';

interface Props {
  active?: boolean;
  name?: string;
  used?: number | string;
  total?: number | string;
  unit?: string;
  unitType?: string;
}

export default function TabItem({
  active,
  name = '',
  used = 0,
  total = 0,
  unit,
  unitType = '',
}: Props) {
  const nameText = t(name);
  const $unit = getSuitableUnit((total || used)?.toString(), unitType) || unit;
  const $used = getValueByUnit(used, $unit);
  const $total = getValueByUnit(total, $unit);

  return (
    <Tab>
      <SimpleCircle
        width={40}
        height={40}
        title={nameText}
        value={parseFloat($used.toString())}
        total={parseFloat($total.toString())}
        unit={$unit}
        showCenter={false}
        showRate={true}
        active={active}
      />
      <Info active={!!active}>
        <InfoTitle>
          {nameText} {t($unit || '')}
        </InfoTitle>
        <p title={`${$used}/${$total}`}>
          {$used}
          <span>/{$total}</span>
        </p>
      </Info>
    </Tab>
  );
}
