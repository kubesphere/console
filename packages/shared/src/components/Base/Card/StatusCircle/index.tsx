/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import SimpleCircle from '../../../Charts/SimpleCircle';
import { Card, CardImage, Chart, Status, StatusDetail, StatusTitle } from './styles';

interface Props {
  themeName?: 'light' | 'dark';
  className?: string;
  name?: string;
  legend?: string[];
  used?: string | number;
  total?: string | number;
  unit?: string;
  showRate?: boolean;
  onClick?: () => void;
}

function StatusCircle({
  themeName = 'dark',
  className,
  name = 'Status',
  legend = ['USED', 'TOTAL'],
  used = 0,
  total = 0,
  unit = '',
  showRate = false,
  onClick,
}: Props) {
  const nameText = t(name);
  const usedText = t(get(legend, '[0]', ''));
  const totalText = t(get(legend, '[1]', ''));

  return (
    <Card
      className={classNames(className, themeName, {
        cursor: !!onClick,
      })}
      onClick={onClick}
    >
      <CardImage src="/assets/banner-icon-1.svg" />
      <Chart>
        <SimpleCircle
          theme={themeName}
          width="100%"
          height="100%"
          title={nameText}
          categories={legend}
          value={parseFloat(used.toString())}
          total={parseFloat(total.toString())}
          unit={unit}
          showRate={showRate}
        />
      </Chart>
      <Status>
        <StatusTitle>{nameText}</StatusTitle>
        <StatusDetail>
          <p>
            <label>{usedText}:</label> {used} {unit}
          </p>
          <p>
            <label>{totalText}:</label> {total} {unit}
          </p>
        </StatusDetail>
      </Status>
    </Card>
  );
}

export default StatusCircle;
