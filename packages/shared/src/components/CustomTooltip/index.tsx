/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get, isEmpty, isNaN } from 'lodash';

import { coreUnitTS } from '../../utils';
import { ICON_TYPES } from '../../constants/common';
import { Exclamation } from '@kubed/icons';

import { TooltipDivStyle, ItemStyle, LabelStyle } from './styles';

interface Props {
  renderLabel?: (res: unknown) => {};
  active?: boolean;
  payload?: Record<string, any>[];
  usageData: { [x: string]: string | number | null }[];
  totalData: { [x: string]: string | number | null }[];
  tailText?: string;
  alert?: Record<string, any>;
  isTranslate?: boolean;
  label?: string;
  unit?: string;
}

const CustomToolTip = (props = {} as Props) => {
  if (!props.payload) return null;

  const { renderLabel, payload, usageData, totalData, tailText, alert, isTranslate = true } = props;
  const data = payload || [];
  const timeStr = props.label || get(data, '[0].payload.time') || '';
  const unit = get(data, '[0].unit') || props.unit || '';
  // @ts-ignore
  const unitText = unit === 'default' ? '' : unit === '%' ? '%' : `${t(unit)}`;

  const labelContent = renderLabel ? renderLabel(props) : timeStr;

  const transformAlertName = (name: string) => {
    const alertName: string = name.indexOf('gpu') > -1 ? 'gpu' : name;
    const alertText = alertName === 'gpu' ? `${alertName}.limit` : alertName;
    const alertContent = ICON_TYPES[alertName]
      ? t(alertText.replace(/[. ]/g, '_').toUpperCase())
      : alertText;

    return alertContent;
  };

  return (
    <TooltipDivStyle>
      {alert && (
        <ItemStyle>
          <Exclamation />
          {`${t(transformAlertName(alert.name || ''))}：${
            alert.unit === 'core'
              ? t('VALUE_CORES', { value: alert.value })
              : t('VALUE_UNIT', { ...alert })
          }`}
        </ItemStyle>
      )}
      <LabelStyle style={{ marginTop: `${alert ? '8px' : '0px'}` }}>
        <span>{labelContent}</span>
        {tailText && <span>{tailText}</span>}
      </LabelStyle>
      <div>
        {data.map(item => {
          const { dataKey, name, value = 0 } = item;

          if (isNaN(Number(value))) return null;

          const color = get(item, 'stroke');

          let ratio = '';
          if (!isEmpty(usageData) && !isEmpty(totalData)) {
            const usage =
              get(
                usageData.find(_item => _item.time === timeStr),
                name,
              ) || 0;

            const total =
              get(
                totalData.find(_item => _item.time === timeStr),
                name,
              ) || 0;
            ratio = ` (${usage}/${total})`;
          }

          const itemUnit = coreUnitTS(value, unitText);
          return (
            <ItemStyle key={dataKey}>
              <i style={{ background: color }} />
              {isTranslate ? t(name) : name}: {value}
              {` ${t(itemUnit)}`}
              {ratio}
            </ItemStyle>
          );
        })}
      </div>
    </TooltipDivStyle>
  );
};

export default CustomToolTip;
