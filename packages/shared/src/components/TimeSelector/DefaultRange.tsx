/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import classNames from 'classnames';
import { getLastTimeStr, getStep, getTimeOptions, getTimes, ValueType } from './utils';
import { List, Title, Item } from './styles';

interface Props {
  step?: string;
  times?: number;
  onChange: (value: ValueType) => void;
  timeOps?: string[];
}

const DEFAULT_TIME_OPTIONS = [
  '10m',
  '20m',
  '30m',
  '1h',
  '2h',
  '3h',
  '5h',
  '12h',
  '1d',
  '2d',
  '3d',
  '7d',
];

function DefaultRange({
  step = '10m',
  times = 30,
  onChange,
  timeOps = DEFAULT_TIME_OPTIONS,
}: Props) {
  const options = getTimeOptions(timeOps);
  const lastTimeStr = getLastTimeStr(step, times);
  const handleClick = (value: string) => {
    if (value) {
      let selfTimes = times;
      let selfStep = getStep(value, selfTimes);
      const stepNum = parseInt(selfStep, 10);

      if (stepNum <= 60) {
        selfTimes = 10;
        selfStep = getStep(value, selfTimes);
      }

      if (stepNum > 60) {
        selfStep = '60m';
        selfTimes = getTimes(value, selfStep);
      }

      onChange({
        step: selfStep,
        times: selfTimes,
        start: '',
        end: '',
        lastTime: value,
      });
    }
  };
  return (
    <div>
      <Title>{t('SELECT_TIME_RANGE')}</Title>
      <List>
        {options.map(({ label, value }) => (
          <Item
            key={value}
            data-value={value}
            className={classNames({
              cur: value === lastTimeStr,
            })}
            onClick={() => handleClick(value)}
          >
            {t('LAST_TIME', { value: label })}
          </Item>
        ))}
      </List>
    </div>
  );
}

export default DefaultRange;
