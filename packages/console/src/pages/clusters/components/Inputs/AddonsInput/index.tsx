/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import classNames from 'classnames';
import { Wrapper, TextWrapper } from './styles';

interface IProps {
  prefix?: any;
  suffix?: any;
  name?: string;
  value?: any;
  children: React.ReactElement;
  onChange?: any;
}

const AddonsInput = ({ prefix, suffix, children, ...rest }: IProps) => {
  const childNode = React.cloneElement(children, {
    ...children.props,
    className: classNames(
      {
        'ks-input-addons-prefix': !!prefix,
        'ks-input-addons-suffix': !!suffix,
      },
      children.props.className,
    ),
    ...rest,
  });

  return (
    <Wrapper>
      {prefix && <TextWrapper>{prefix}</TextWrapper>}
      {childNode}
      {suffix && <TextWrapper>{suffix}</TextWrapper>}
    </Wrapper>
  );
};

export default AddonsInput;
