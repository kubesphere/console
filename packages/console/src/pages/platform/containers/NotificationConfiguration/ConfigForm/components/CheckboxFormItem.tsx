import React, { ChangeEvent } from 'react';
import { Checkbox } from '@kubed/components';

type Props = {
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

function CheckboxFormItem({ label, value, onChange }: Props): JSX.Element {
  function handleChange({ target }: ChangeEvent<HTMLInputElement>): void {
    onChange?.(target.checked);
  }

  return <Checkbox label={label} checked={value} onChange={handleChange} />;
}

export default CheckboxFormItem;
