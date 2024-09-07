/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { get, isUndefined, set } from 'lodash';
import { Wrapper } from './styles';

interface Props {
  name?: string;
  value?: Record<string, any>;
  defaultValue?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
  [propName: string]: any;
}

function ObjectInput({
  value = {},
  defaultValue = {},
  onChange,
  children,
  onChangeNew,
}: PropsWithChildren<Props>) {
  const [selfValue, setSelfValue] = useState<Record<string, any>>(defaultValue ?? value ?? {});

  useEffect(() => {
    onChangeNew?.(selfValue);
  }, [selfValue]);

  const getValue = (name: string, childDefaultValue: any) => {
    if (!isUndefined(get(selfValue, name))) {
      return get(selfValue, name);
    }

    if (!isUndefined(childDefaultValue)) {
      const newValue = {
        ...selfValue,
      };
      set(newValue, name, childDefaultValue);
      setSelfValue(newValue);
    }

    return childDefaultValue;
  };

  const childNodes = Children.map(children, child =>
    isValidElement(child)
      ? cloneElement(child, {
          ...child.props,
          className: classNames(child.props.className, 'item'),
          value: isUndefined(selfValue)
            ? child.props.value
            : getValue(child.props.name, child.props.defaultValue),
          onChange: (val: any) => {
            const childValue = get(val, 'currentTarget.value', val);
            const newValue = {
              ...selfValue,
            };
            set(newValue, child.props.name, childValue);
            setSelfValue(newValue);
            onChange?.(newValue);
            child.props?.onChange?.(childValue);
          },
        })
      : child,
  );

  return <Wrapper>{childNodes}</Wrapper>;
}

export default ObjectInput;
