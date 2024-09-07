/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import Icon from '../Icon';

interface Props {
  description?: string;
  [propName: string]: any;
}

import { AddWrapper, TextDiv } from './styles';

function Add({ icon, image, title, description, onClick, type }: PropsWithChildren<Props>) {
  return (
    <AddWrapper
      className={classNames('add', { ['withIcon']: icon || image }, type)}
      onClick={onClick}
    >
      <div className={'icon'}>
        {image ? <img src={image} alt="" /> : icon && <Icon name={icon} size={40} />}
      </div>
      <TextDiv className={'text'}>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
      </TextDiv>
    </AddWrapper>
  );
}

export default Add;
