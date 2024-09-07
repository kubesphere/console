/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { CaretDown, CaretUp, ChevronDown, ChevronUp } from '@kubed/icons';
import { Control, Wrapper, Option, OptionsWrapper, Options } from './styles';
import { isNil, set } from 'lodash';
import { InfiniteScroll, InfiniteScrollProps } from '@ks-console/shared';
import { Empty } from '@kubed/components';

interface RecordSelectProps<T> {
  className?: string;
  disalbed?: boolean;
  options: T[];
  placeholder: React.ReactNode;
  renderOption: (option: T) => React.ReactNode;
  value?: T;
  icon?: React.ReactNode;
  onChange?: (value: T) => void;
  infiniteProps?: InfiniteScrollProps;
}

function RecordSelect<T extends Record<string, any>>(props: RecordSelectProps<T>) {
  const {
    className,
    disalbed,
    options,
    placeholder,
    renderOption,
    value: valueProp,
    onChange,
    icon,
    infiniteProps,
  } = props;

  const [showoptions, setShowOptions] = React.useState(false);
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (valueProp !== value) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleShow = () => {
    setShowOptions(!showoptions);
  };

  const renderControl = () => {
    const option = options.find(item => item.value === value);
    return (
      <Control hasIcon={isNil(icon)} onClick={handleShow}>
        {icon}
        <div>{option ? renderOption(option) : placeholder}</div>
        {showoptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Control>
    );
  };

  const renderOptions = () => {
    if (!showoptions) return null;
    const Cmp = infiniteProps ? InfiniteScroll : React.Fragment;
    if (options.length === 0) {
      return (
        <OptionsWrapper>
          <Options style={{ padding: 20 }}>
            <Empty />
          </Options>
        </OptionsWrapper>
      );
    }
    return (
      <OptionsWrapper>
        <Options>
          <Cmp {...infiniteProps!}>
            {options.map((item: any) => (
              <Option
                key={item.value}
                onClick={() => {
                  setValue(item.value);
                  onChange?.(item.value);
                  setShowOptions(false);
                }}
                hasIcon={!isNil(icon)}
              >
                {icon}
                {renderOption(item)}
              </Option>
            ))}
          </Cmp>
        </Options>
      </OptionsWrapper>
    );
  };

  return (
    <Wrapper className={className} disabled={disalbed}>
      {renderControl()}
      {renderOptions()}
    </Wrapper>
  );
}

export default RecordSelect;
