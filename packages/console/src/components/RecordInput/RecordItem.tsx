/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEqual } from 'lodash';
import * as React from 'react';
import { RecordItemProps } from './interfaces';
import { RecordItemWrapper } from './styles';

const RecordItem = (props: RecordItemProps) => {
  const { children, list = [], itemProps, error, value: valueProp, onChange } = props;
  const [value, setValue] = React.useState(valueProp ?? {});
  const valueRef = React.useRef(value);
  React.useEffect(() => {
    let v = valueProp ?? {};
    if (!isEqual(v, value)) {
      setValue(v);
    }
  }, [valueProp]);

  React.useEffect(() => {
    if (!isEqual(value, valueRef.current)) {
      valueRef.current = value;
      onChange?.(value);
    }
  }, [value]);

  return (
    <RecordItemWrapper $len={React.Children.count(children)}>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ...child.props,
          ...(itemProps?.[child.props.name] ?? {}),
          ...(child.props.$getProps?.({ list, item: value }) ?? {}),
          value: value[child.props.name],
          $error: error,
          onChange: (e: any) => {
            const setV = child.props.$setValue ?? ((d: any) => d);
            const v = setV(e);
            child.props.onChange?.(v);
            setValue((value1: any) => {
              return {
                ...value1,
                [child.props.name]: v,
              };
            });
          },
        });
      })}
    </RecordItemWrapper>
  );
};

export default RecordItem;
