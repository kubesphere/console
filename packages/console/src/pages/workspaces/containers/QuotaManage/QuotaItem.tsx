/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { cpuFormat, memoryFormat, Constants, Icon } from '@ks-console/shared';

import { Quota, Item, Title, Description, BarItem, StyledBar } from './QuotaItem.styles';
import { isUndefined } from 'lodash';

const { ICON_TYPES } = Constants;

interface QuotaItemProps {
  name: string;
  total: string | undefined;
  used: number;
}

export function QuotaItem({ name, total, used }: QuotaItemProps) {
  let displayTotal = total;
  let displayUsed: number | string = used;
  let displayRatio = 0;

  if (name === 'limits.cpu' || name === 'requests.cpu') {
    if (total) {
      displayTotal = `${cpuFormat(total)} Core`;
      displayUsed = `${cpuFormat(used)} Core`;
      displayRatio = Number(cpuFormat(used)) / Number(cpuFormat(total));
    }
  } else if (name === 'limits.memory' || name === 'requests.memory') {
    if (total) {
      displayTotal = `${memoryFormat(total, 'Gi')} Gi`;
      displayUsed = `${memoryFormat(used, 'Gi')} Gi`;
      displayRatio = Number(memoryFormat(used)) / Number(memoryFormat(total));
    }
  } else if (total) {
    displayRatio = Number(used) / Number(total);
  }

  displayRatio = Math.min(Math.max(displayRatio, 0), 1);

  const labelName = name.indexOf('gpu') > -1 ? 'gpu' : name;
  const labelText = labelName === 'gpu' ? `${labelName}.limit` : labelName;

  const items = [
    {
      title: t(labelText.replace(/[. ]/g, '_').toUpperCase()),
      description: t('RESOURCE_TYPE_SCAP'),
    },
    { title: displayUsed, description: t('USED') },
    {
      title: isUndefined(displayTotal) ? t('NO_LIMIT') : displayTotal,
      description: t('RESOURCE_LIMIT'),
    },
  ];

  return (
    <Quota>
      <Icon name={ICON_TYPES[labelName] || 'resource'} size={40} />
      {items.map(({ title, description }, index) => (
        <Item key={index}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Item>
      ))}
      <BarItem>
        <Title>{t('USAGE')}</Title>
        <StyledBar
          value={displayRatio}
          text={t('USED_PERCENT', {
            percent: Number((displayRatio * 100).toFixed(2)),
          })}
          rightText={!displayTotal ? t('NO_LIMIT') : ''}
        />
      </BarItem>
    </Quota>
  );
}
