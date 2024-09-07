/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { RecordInputProps } from './interfaces';
import RecordInputContainer from './RecordInputContainer';
import { isEqual } from 'lodash';

const RecordInput = <T, P>(props: RecordInputProps<T, P>) => {
  const {
    mapIn,
    mapOut,
    value: valueProp,
    mapItemPropsFromList,
    checkItemValid,
    onChange,
    children,
    defaultValue,
    validator,
    onError,
  } = props;

  const [value, setValue] = React.useState(mapIn(valueProp ?? defaultValue));
  const valueRef = React.useRef(value);
  const valuePropsRef = React.useRef(valueProp ?? defaultValue);
  React.useEffect(() => {
    if (value !== valueRef.current) {
      valueRef.current = value;
      valuePropsRef.current = mapOut(value);
      onChange?.(valuePropsRef.current);
    }
  }, [value]);

  React.useEffect(() => {
    let v = valueProp ?? defaultValue;
    if (!isEqual(v, valuePropsRef.current)) {
      valuePropsRef.current = v;
      let vv = mapIn(v);
      if (!isEqual(valueRef.current, vv)) {
        valueRef.current = vv;
        setValue(vv);
      }
    }
  }, [valueProp, defaultValue]);

  return (
    <RecordInputContainer
      list={value}
      onChange={setValue}
      validator={validator}
      checkItemValid={checkItemValid}
      mapItemPropsFromList={mapItemPropsFromList}
      onError={onError}
    >
      {children}
    </RecordInputContainer>
  );
};

export default RecordInput;
