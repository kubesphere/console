/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants, cpuFormat, Icon, memoryFormat, Bar } from '@ks-console/shared';
import { Entity as KEntity, Field as KField } from '@kubed/components';
import { get, isUndefined } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

const BarBox = styled(Bar)`
  width: 100%;
  height: 20px;
  border-radius: 2px;
`;

const Field = styled(KField)(props => {
  const { flex } = props;
  return {
    flex: flex || '1 1',
    minWidth: 160,
  };
});

const Entity = styled(KEntity)`
  padding: 20px;
  border-radius: 0;
  background-color: #f9fbfd;
  &:hover {
    background-color: #eff4f9;
  }
`;

const FlexItem = styled.div<{ flex: string | number }>(props => {
  const { flex } = props;
  return {
    flex: flex || '1 1',
    minWidth: 160,
  };
});

export interface IQuotaProps {
  key: string;
  name: string;
  total?: string;
  used?: number;
  left?: number | string;
}

const { ICON_TYPES } = Constants;

const Unit = {
  Ti: 1024 ** 4,
  Gi: 1024 ** 3,
  Mi: 1024 ** 2,
  Ki: 1024,
  TB: 1000 ** 4,
  GB: 1000 ** 3,
  MB: 1000 ** 2,
  KB: 1000,
  T: 1000 ** 4,
  G: 1000 ** 3,
  M: 1000 ** 2,
  K: 1000,
  Bytes: 1,
  B: 1,
};

const getNumberUnit = (value: string) => {
  const matchUnit = /[0-9]+([a-zA-Z]+)/;
  const unitsMaps = Object.keys(Unit);
  let unit1 = get(value.match(matchUnit), '1', '');

  unitsMaps.forEach(unit => {
    if (unit1.indexOf(unit) > -1) {
      unit1 = unit;
      return false;
    }
  });
  return unit1;
};

const getNumberValue = (unit: keyof typeof Unit, value: string, name: string): [string, number] =>
  unit
    ? [unit, parseFloat(value) * (ICON_TYPES[name] || !Unit[unit] ? 1 : Unit[unit])]
    : ['', parseFloat(value)];

const handleNumberValue = (value: string, name: string) =>
  getNumberValue(getNumberUnit(value), value, name);

const getData = (name: string, totalOld: string, usedOld: any) => {
  let ratio = 0,
    used = usedOld,
    total = totalOld,
    usedUnit = '',
    totalUnit = '';
  if (name === 'limits.cpu' || name === 'requests.cpu') {
    if (totalOld) {
      ratio = Number(cpuFormat(usedOld)) / Number(cpuFormat(totalOld));
      used = `${cpuFormat(usedOld)} Core`;
      total = `${cpuFormat(totalOld)} Core`;
    }
  } else if (name === 'limits.memory' || name === 'requests.memory') {
    if (totalOld) {
      ratio = Number(memoryFormat(usedOld)) / Number(memoryFormat(totalOld));
      used = `${memoryFormat(usedOld, 'Gi')} Gi`;
      total = `${memoryFormat(totalOld, 'Gi')} Gi`;
    }
  } else if (totalOld) {
    const [usedUnit1, used1] = handleNumberValue(usedOld, name);
    const [totalUnit1, total1] = handleNumberValue(totalOld, name);
    usedUnit = usedUnit1;
    totalUnit = totalUnit1;
    ratio = used1 / total1;
  }
  return {
    ratio: Math.min(Math.max(ratio, 0), 1),
    used,
    total,
    usedUnit,
    totalUnit,
  };
};

const QuotaItem = (props: IQuotaProps) => {
  let { name, total: totalOld, used: useOld } = props;

  const { ratio, used, total, usedUnit, totalUnit } = React.useMemo(() => {
    return getData(name, totalOld!, useOld);
  }, [name, totalOld, useOld]);

  const { labelName, type } = React.useMemo(() => {
    const labelName1 = name.indexOf('gpu') > -1 ? 'gpu' : name;
    const labelText = labelName1 === 'gpu' ? `${labelName1}.limit` : labelName1;
    return {
      labelName: labelName1,
      type: ICON_TYPES[labelName1] ? t(labelText.replace(/[. ]/g, '_').toUpperCase()) : labelText,
    };
  }, [name]);

  const useValue = React.useMemo(() => {
    if (totalUnit && !usedUnit) {
      const unitValue = ICON_TYPES[name] || !Unit[totalUnit as 'B'] ? 1 : Unit[totalUnit as 'B'];
      return `${used / unitValue}${used > 0 ? totalUnit : ''}`;
    }

    return used;
  }, [totalUnit, usedUnit, used, name]);

  return (
    <Entity bordered={false}>
      <Field
        avatar={<Icon name={Constants.ICON_TYPES[labelName] || 'resource'} size={40} />}
        label={t('RESOURCE_TYPE')}
        value={type}
      />
      <Field label={t('USED')} value={useValue} />
      <Field label={t('QUOTA')} value={isUndefined(total) ? t('NO_LIMIT_TCAP') : total} />
      <FlexItem flex={3}>
        <div>{t('USAGE')}</div>
        <BarBox
          value={ratio}
          rightText={!total ? t('NO_LIMIT') : ''}
          text={t('USED_PERCENT', {
            percent: Number((ratio * 100).toFixed(2)),
          })}
        />
      </FlexItem>
    </Entity>
  );
};

export default QuotaItem;
