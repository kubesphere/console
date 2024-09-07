/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PieChart } from '@kubed/charts';
import classNames from 'classnames';
import { get } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { getColorByName } from '../../../utils/monitoring';
import { addColorAlpha } from '@kubed/components';
import { Center, Chart, Item, Label, TooltipWrapper } from './styles';

interface Props {
  theme?: 'light' | 'dark';
  width?: string | number;
  height?: string | number;
  title?: string;
  categories?: string[];
  colors?: string[];
  value?: string | number;
  total?: string | number;
  unit?: string;
  areaColors?: string[];
  showCenter?: boolean;
  showRate?: boolean;
  showRatio?: boolean;
  active?: boolean;
  showName?: boolean;
  rateNum?: number;
  isShowTotalTooltip?: boolean;
  renderCustomCenter?: (args: any) => ReactNode;
}

const AreaColors = ['green'];

function SimpleCircle({
  theme = 'light',
  width = 100,
  height = 100,
  title = '',
  colors = AreaColors,
  categories = ['USED', 'TOTAL'],
  value = 0,
  total = 0,
  unit = '',
  showCenter = true,
  showRate,
  showRatio = true,
  active,
  rateNum = 0,
  showName,
  isShowTotalTooltip = true,
  renderCustomCenter,
}: Props) {
  const selfValue = useMemo(() => {
    const $value = parseFloat(value.toString());
    return $value > 0 ? $value : 0;
  }, [value]);

  const selfTotal = useMemo(() => parseFloat(total.toString()), [total]);

  const remain = useMemo(() => {
    const $remain = selfTotal - selfValue;
    return selfTotal === 0 ? 1 : $remain;
  }, [selfTotal, selfValue]);

  const getRate = (num = 1) => (selfTotal ? ((selfValue / selfTotal) * 100).toFixed(num) : 0);

  const getPrimaryColor = () => {
    const rate = getRate(rateNum);
    let colorName = get(colors, [0], '#fff');

    if (showRate) {
      if (active) {
        colorName = 'white';
      }
      if (rate >= 80) {
        colorName = 'yellow';
      }
      if (rate >= 90) {
        colorName = 'red';
      }
    }
    return colorName;
  };

  const data = [
    { name: categories[0], value: selfValue },
    { name: 'Remaining', value: remain },
  ];

  const renderCenter = () => {
    const colorName = getPrimaryColor();
    const extra = showRate
      ? {
          standard: true,
        }
      : showRatio
        ? {
            mid: value > 99 || total > 99,
            mini: value > 999 || total > 999,
          }
        : {};
    const content = showRate ? (
      `${getRate(rateNum)}%`
    ) : showRatio ? (
      <p>
        <strong>{value}</strong>
        <span>/</span>
        {total}
      </p>
    ) : null;

    return (
      <Center
        className={classNames(colorName, extra, {
          white: theme === 'dark',
        })}
      >
        {showName && <p className="show-name">{categories[0]}</p>}
        {renderCustomCenter ? renderCustomCenter({ value, total }) : content}
      </Center>
    );
  };

  const { activeFill } = useMemo(() => {
    const $activeFill = {
      fill: getColorByName(getPrimaryColor()),
    };
    const colorName = colors[1] || $activeFill.fill;
    const $totalFill = active
      ? {
          fill: '#fff',
          fillOpacity: 0.4,
        }
      : {
          fill: getColorByName(colorName),
          fillOpacity: colors[1] ? 1 : 0.2,
        };
    return { activeFill: $activeFill, totalFill: $totalFill };
  }, [colors, active]);

  const $colors = useMemo(() => {
    const activeColor = getColorByName(getPrimaryColor());
    const colorName = colors[1] || activeColor;
    const totalColor = active
      ? 'rgba(255,255,255,0.4)'
      : addColorAlpha(getColorByName(colorName), colors[1] ? 1 : 0.2);
    return [activeColor, totalColor];
  }, [colors, active]);

  const renderTooltip = () => {
    const unitText = unit === '%' ? '%' : ` ${unit}`;
    const rateText = showRate && ` (${getRate(rateNum)}%)`;
    return (
      <TooltipWrapper>
        <Label>{t(title)}</Label>
        <div>
          <Item>
            <i
              style={{
                background: activeFill.fill,
              }}
            />
            <label>{t(categories[0])}:</label>
            <p>
              {value}
              {unitText}
              {rateText}
            </p>
          </Item>
          {isShowTotalTooltip && (
            <Item>
              <i style={{ background: '#fff' }} />
              <label>{t(categories[1])}:</label>
              <p>
                {total}
                {unitText}
              </p>
            </Item>
          )}
        </div>
      </TooltipWrapper>
    );
  };

  return (
    <Chart style={{ width, height }}>
      {showCenter && renderCenter()}
      <PieChart
        data={data}
        dataKey="name"
        category="value"
        colors={$colors}
        stroke="transparent"
        customTooltip={renderTooltip}
      />
    </Chart>
  );
}

export default SimpleCircle;
