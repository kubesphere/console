/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { has, isEmpty } from 'lodash';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import PropertyItem, { Props as ItemProps } from './item';
import { AddButton, Wrapper } from './styles';

interface Props {
  name?: string;
  value?: Record<string, any>;
  hiddenKeys?: string[];
  readOnlyKeys?: string[];
  onChange?: (value: Record<string, any>) => void;
  onError?: (error?: { message?: string }) => void;
  itemProps?: Partial<ItemProps>;
  addText?: ReactNode;
}

interface ValueType {
  key: string;
  value?: any;
}

function PropertiesInput({
  value,
  hiddenKeys = [],
  readOnlyKeys = [],
  onChange,
  onError,
  itemProps,
  addText = t('ADD'),
}: Props) {
  const [selfValue, setSelfValue] = useState<Record<string, any>>(value ?? {});
  const [hiddenValues, setHiddenValues] = useState<ValueType[]>([]);
  const [readOnlyValues, setReadOnlyValues] = useState<ValueType[]>([]);
  const [arrayValues, setArrayValues] = useState<ValueType[]>([]);

  useEffect(() => {
    if (value) {
      setSelfValue(value);
    }
  }, [value]);

  useEffect(() => {
    const newHiddenValues: ValueType[] = [];
    const newReadOnlyValues: ValueType[] = [];
    const newArrayValues: ValueType[] = [];

    Object.keys(selfValue).forEach(key => {
      if (hiddenKeys.some(hiddenKey => new RegExp(hiddenKey).test(key))) {
        newHiddenValues.push({
          key,
          value: selfValue[key],
        });
      } else if (readOnlyKeys.some(readOnlyKey => new RegExp(readOnlyKey).test(key))) {
        newReadOnlyValues.push({
          key,
          value: selfValue[key],
        });
      } else {
        newArrayValues.push({
          key,
          value: selfValue[key],
        });
      }
    });

    if (isEmpty(newArrayValues) && isEmpty(newReadOnlyValues)) {
      newArrayValues.push({ key: '' });
    }

    setArrayValues(newArrayValues);
    setHiddenValues(newHiddenValues);
    setReadOnlyValues(newReadOnlyValues);
  }, [selfValue]);

  const handleAdd = () => {
    setArrayValues([...arrayValues, { key: '' }]);
  };

  const triggerChange = (values: ValueType[]) => {
    let existedKey = false;
    let emptyKeyValue = false;

    onError?.();
    const valuePairs = [...hiddenValues, ...readOnlyValues, ...values];
    const newValue = valuePairs.reduce((prev, cur) => {
      cur.key = cur.key || '';

      // when add new line, do not change value
      if (isEmpty(cur.key) && isEmpty(cur.value)) {
        emptyKeyValue = true;
      }

      // has duplicate keys
      if (has(prev, cur.key)) {
        existedKey = true;
        return prev;
      }

      return {
        ...prev,
        [cur.key]: cur.value || '',
      };
    }, {});

    setArrayValues(values);

    const hasEmptyKey = Object.keys(newValue).some(key => isEmpty(key));
    if (hasEmptyKey) {
      onError?.({ message: t('EMPTY_KEY') });
    } else if (existedKey) {
      onError?.({ message: t('DUPLICATE_KEYS') });
    } else {
      onError?.();
    }

    if (emptyKeyValue) {
      return;
    }
    if (!existedKey) {
      onChange?.(newValue);
    }
  };

  const handleItemChange = (index: number, val: ValueType) => {
    arrayValues[index] = val;
    triggerChange([...arrayValues]);
  };

  const handleItemDelete = (index: number) => {
    triggerChange([...arrayValues.filter((_, _index) => _index !== index)]);
  };

  const isAddEnable = useMemo(
    () => arrayValues.every(item => !(isEmpty(item) || (!item.key && !item.value))),
    [arrayValues],
  );

  return (
    <Wrapper>
      {readOnlyValues.map((item, index) => (
        <PropertyItem
          index={index}
          key={`readonly-${item.key}`}
          value={item}
          defaultValue={item}
          readOnly
          {...itemProps}
        ></PropertyItem>
      ))}
      {arrayValues.map((item, index) => (
        <PropertyItem
          key={`array-${index}-${arrayValues.length}`}
          index={index}
          value={item || {}}
          defaultValue={item || {}}
          onChange={handleItemChange}
          onDelete={handleItemDelete}
          {...itemProps}
        />
      ))}
      <div style={{ textAlign: 'right' }}>
        <AddButton onClick={handleAdd} disabled={!isAddEnable}>
          {addText}
        </AddButton>
      </div>
    </Wrapper>
  );
}

export default PropertiesInput;
