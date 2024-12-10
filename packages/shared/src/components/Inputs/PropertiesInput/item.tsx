/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ComponentType } from 'react';
import { Input } from '@kubed/components';
import { Trash } from '@kubed/icons';
import ObjectInput from '../ObjectInput';
import { DeleteButton, Item } from './styles';

interface ValueType {
  id: string;
  key: string;
  value?: any;
}

export interface Props {
  index: number;
  value?: ValueType;
  defaultValue?: ValueType;
  readOnly?: boolean;
  keyProps?: { component?: ComponentType; [key: string]: any };
  valueProps?: { component?: ComponentType; [key: string]: any };
  onChange?: (index: number, value: any) => void;
  onDelete?: (index: number) => void;
}

function PropertyItem({
  index,
  readOnly,
  keyProps,
  valueProps,
  onChange,
  onDelete,
  ...rest
}: Props) {
  const { component: KeyInput = Input, ...keyInputProps } = keyProps || ({} as any);
  const { component: ValueInput = Input, ...valueInputProps } = valueProps || ({} as any);
  return (
    <Item>
      <ObjectInput {...rest} onChange={value => onChange?.(index, value)}>
        <KeyInput name="key" placeholder={t('KEY')} readOnly={readOnly} {...keyInputProps} />
        <ValueInput
          name="value"
          placeholder={t('VALUE')}
          readOnly={readOnly}
          {...valueInputProps}
        />
      </ObjectInput>
      {!readOnly && (
        <DeleteButton type="button" key="deleteButton" onClick={() => onDelete?.(index)}>
          <Trash />
        </DeleteButton>
      )}
    </Item>
  );
}

export default PropertyItem;
