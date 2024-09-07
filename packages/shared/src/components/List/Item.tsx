/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Button } from '@kubed/components';
import { Pen, Trash } from '@kubed/icons';

import { IndicatorWrapper, ListItem, IconWrapper, TextsDiv } from './styles';
import Icon from '../Icon';

interface Props {
  icon?: string;
  image?: string;
  [propName: string]: any;
}

function Item({
  icon,
  image,
  title,
  status,
  description,
  extras,
  details,
  operations,
  onDelete,
  onEdit,
  onClick,
  className,
  titleClass,
  ...rest
}: PropsWithChildren<Props>) {
  const renderDetail = () => {
    return details.map((detail: any, index: number) => (
      <div key={index} className={classNames('text', detail.className)}>
        <div className={'title'}>{detail.title}</div>
        {detail.description && <div className={'description'}>{detail.description}</div>}
      </div>
    ));
  };

  return (
    <ListItem
      className={classNames(
        'item',
        {
          ['withIcon']: icon || image,
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      <div className={'wrapper'}>
        <IconWrapper className={'icon'}>
          {image ? <img src={image} alt="" /> : icon && <Icon name={icon} size={40} />}
          {status ? <IndicatorWrapper type={status} /> : null}
        </IconWrapper>
        <TextsDiv className={'texts'}>
          <div className={classNames('text', titleClass)}>
            <div className={'title'}>{title}</div>
            <div className={'description'}>{description}</div>
          </div>
          {details && renderDetail()}
        </TextsDiv>
        {operations || (
          <div className="buttons">
            {onDelete && (
              <Button variant="text" onClick={onDelete}>
                <Trash />
              </Button>
            )}
            {onEdit && (
              <Button variant="text" onClick={onEdit}>
                <Pen />
              </Button>
            )}
          </div>
        )}
      </div>
      {extras}
    </ListItem>
  );
}

export default Item;
