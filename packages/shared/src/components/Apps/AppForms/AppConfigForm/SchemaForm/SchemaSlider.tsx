import React, { useState } from 'react';
import { InputNumber, Row, Slider } from '@kubed/components';

import { FirstCol, SecondCol } from './styles';

type Props = {
  max: number;
  min: number;
  unit: string;
  marks: any[];
  defaultValue?: string;
  onChange?: (val: string) => void;
};

function SchemaFormSliderItem({
  max,
  min,
  marks,
  unit,
  defaultValue = `0${unit}`,
  onChange,
}: Props): JSX.Element {
  const [currentNum, setCurrentNum] = useState<number>(parseFloat(defaultValue));

  function handleSliderChange(num: number): void {
    setCurrentNum(num);
    onChange?.(`${num}${unit}`);
  }

  function handleInputChange(num: any): void {
    setCurrentNum(num);
    onChange?.(`${num}${unit}`);
  }

  return (
    <Row>
      <FirstCol span={10}>
        <Slider
          max={max}
          min={min}
          marks={marks}
          value={currentNum}
          onChange={handleSliderChange}
        />
      </FirstCol>
      <SecondCol span={2}>
        <InputNumber value={currentNum} max={max} min={min} onChange={handleInputChange} />
        <span>{unit}</span>
      </SecondCol>
    </Row>
  );
}

export default SchemaFormSliderItem;
