/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import React from 'react';
import { safeAtob, safeBtoa } from '@ks-console/shared';

interface Props {
  onChange?: Function;
  name?: string;
  children?: any;
  value?: string;
}

function Base64Wrapper({ onChange, name, children, value }: Props) {
  const handleChange = (e: any) => {
    const newValue = get(e, 'target.value', e);

    return onChange && onChange(safeBtoa(newValue));
  };

  const node = React.cloneElement(children, {
    name,
    value: safeAtob(value || ''),
    onChange: handleChange,
  });
  return node;
}

export default Base64Wrapper;
