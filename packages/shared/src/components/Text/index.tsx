/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isFunction, isUndefined } from 'lodash';
import classNames from 'classnames';

import { TextWrapper } from './styles';
import Icon from '../Icon';

interface Props {
  [propName: string]: any;
}

function Text({ icon, title, description, className, ellipsis, extra, onClick }: Props) {
  return (
    <TextWrapper
      className={classNames({ ['clickable']: !!onClick, ['ellipsis']: ellipsis }, className)}
      onClick={onClick}
    >
      {icon && (isFunction(icon) ? icon() : <Icon name={icon} size={40} />)}
      <div className={'text'}>
        <div>{isFunction(title) ? title() : isUndefined(title) || title === '' ? '-' : title}</div>
        <div>{description}</div>
      </div>
      {extra}
    </TextWrapper>
  );
}
export default Text;
