import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Input, Select } from '@kubed/components';

const TimeInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

type Props = {
  value?: any;
  hideSeconds?: boolean;
  onChange?: (value: any) => void;
};

enum TimeToS {
  s = 1,
  m = 60,
  h = 3600,
}

function getValue(val: number): {
  unit: 's' | 'm' | 'h';
  value: number;
} {
  if (val >= 3600 && !(val % 3600)) {
    return {
      unit: 'h',
      value: val / 3600,
    };
  }
  if (val >= 60 || !(val % 60)) {
    return {
      unit: 'm',
      value: val / 60,
    };
  }
  return {
    unit: 's',
    value: val,
  };
}

function TimeInput({ value, onChange, hideSeconds }: Props): JSX.Element {
  const data = getValue(value);
  const [unit, setUnit] = useState<'s' | 'm' | 'h'>(data.unit);
  const [interval, setInterval] = useState<string>(data.value.toString());
  const timeOptions = [
    {
      label: t('MINUTES'),
      value: 'm',
    },
    {
      label: t('HOURS'),
      value: 'h',
    },
  ];
  if (!hideSeconds) {
    timeOptions.unshift({
      label: t('SECONDS'),
      value: 's',
    });
  }

  function getSeconds(timeStr: string): number {
    return +timeStr * TimeToS[unit];
  }

  function handleChangeValue({ target }: ChangeEvent<HTMLInputElement>): void {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    setInterval(target.value);
    // TODO 此处接口单位 s
    onChange?.(getSeconds(target.value));
  }

  function handleChangeUnit(unitStr: any): void {
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
