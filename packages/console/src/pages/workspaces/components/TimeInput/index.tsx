/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Input, Select } from '@kubed/components';

const TimeInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

type Props = {
  value?: any;
  onChange?: (value: any) => void;
};

function TimeInput({ value, onChange }: Props): JSX.Element {
  const [unit, setUnit] = useState<string>(value?.slice(-1));
  const [interval, setInterval] = useState<string>(value?.slice(0, 1));
  const timeOptions = [
    {
      label: t('SECONDS'),
      value: 's',
    },
    {
      label: t('MINUTES'),
      value: 'm',
    },
    {
      label: t('HOURS'),
      value: 'h',
    },
  ];

  function handleChangeValue({ target }: ChangeEvent<HTMLInputElement>): void {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    setInterval(target.value);
    onChange?.(target.value ? `${target.value}${unit}` : target.value);
  }

  function handleChangeUnit(unitStr: string): void {
    setUnit(unitStr);
  }

  return (
    <TimeInputWrapper className="time-input">
      <Input value={interval} onChange={handleChangeValue} />
      <Select value={unit} options={timeOptions} onChange={handleChangeUnit} />
    </TimeInputWrapper>
  );
}

export default TimeInput;
