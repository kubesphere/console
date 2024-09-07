/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty, get, isUndefined, merge } from 'lodash';
import { Button, FormItem } from '@kubed/components';
import Item from './Item';
import { StyledFooter, StyledDesc } from './styles';

interface IProps<T> {
  name?: string;
  value?: any[];
  onChange?: (value: any[]) => void;
  itemType?: 'string' | 'object';
  id?: string;
  checkItemValid?: (item: T) => void;
  desc?: string;
  addText: string;
  children: React.ReactElement;
  extraAdd?: React.ReactElement;
}

function ArrayInput<T>(propsData: IProps<T>) {
  const defaultProps = {
    name: '',
    value: [''],
    onChange() {},
    addText: t('ADD'),
    itemType: 'string',
  };

  const props = merge(defaultProps, propsData);

  const { desc, addText } = props;

  const getDefaultValue = () => {
    const { itemType } = props;

    if (itemType === 'object') {
      return {};
    }

    return '';
  };

  const isAddEnable = () => {
    const { value, checkItemValid } = props;

    if (checkItemValid) {
      return value?.every(checkItemValid);
    }

    return value?.every(item => !isEmpty(item) && Object.values(item).every(_value => _value));
  };

  const handleAdd = () => {
    const { value, onChange } = props;

    onChange?.([...(value || []), getDefaultValue()]);
  };

  const handleChange = (index: number, childValue: any) => {
    const { value, onChange } = props;
    const itemValue = get(childValue, 'currentTarget.value', childValue);

    let newValues = [];

    if (isUndefined(value?.[index])) {
      value![index] = itemValue;
      newValues = [...(value || [])];
    } else {
      newValues = (value || []).map((item, _index) => (_index === index ? itemValue : item));
    }

    onChange?.(newValues);
  };

  const handleDelete = (index: number) => {
    const { value, onChange } = props;

    onChange?.(value!.filter((_, _index) => _index !== index));
  };

  const renderItems = () => {
    const { value, children, id } = props;

    if (id && id.includes("metadata.annotations['kubesphere.io/")) {
      return value?.map((item, index) => (
        <FormItem key={index}>
          <Item
            name={`${id}[${index}]`}
            index={index}
            value={item || getDefaultValue()}
            arrayValue={value}
            component={children}
            onChange={(childValue: any) => handleChange(index, childValue)}
            onDelete={() => handleDelete(index)}
          />
        </FormItem>
      ));
    }

    return value?.map((item, index) => (
      <Item
        key={index}
        name={`${id}[${index}]`}
        index={index}
        value={item || getDefaultValue()}
        arrayValue={value}
        component={children}
        onChange={(childValue: any) => handleChange(index, childValue)}
        onDelete={() => handleDelete(index)}
      />
    ));
  };

  return (
    <div>
      {renderItems()}
      <StyledFooter>
        <StyledDesc>{desc}</StyledDesc>
        <div>
          <Button onClick={handleAdd} disabled={!isAddEnable()}>
            {addText}
          </Button>
          {props.extraAdd}
        </div>
      </StyledFooter>
    </div>
  );
}

export default ArrayInput;
