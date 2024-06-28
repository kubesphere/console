import React from 'react';
import { Icon } from '@ks-console/shared';
import { Button } from '@kubed/components';

import type { ListItem, ListItemDetail } from './types';

import { ListItemWrapper, ItemContent, ItemText, OperationsWrapper } from './styles';

type Props = {
  item: ListItem;
  className?: string;
  onClick?: (item: ListItem) => void;
  onDelete?: (item: ListItem) => void;
  onEdit?: (item: ListItem) => void;
};

function Item({ item, className, onDelete, onEdit, onClick }: Props): JSX.Element {
  const { title, details, description, titleClass, operations, ...rest } = item;

  return (
    <ListItemWrapper className={className} onClick={() => onClick?.(item)} {...rest}>
      <ItemContent>
        <ItemText className={titleClass}>
          <div className="ellipsis title">{title}</div>
          <div className="ellipsis description">{description}</div>
        </ItemText>
        {details?.map((detail: ListItemDetail, index: number) => (
          <ItemText key={index} className={detail.className}>
            <div className="ellipsis title">{detail.title}</div>
            {detail.description && <div className="ellipsis description">{detail.description}</div>}
          </ItemText>
        ))}
      </ItemContent>
      {operations || (
        <OperationsWrapper className="btns">
          {onDelete && (
            <Button
              className="button-flat"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(item);
              }}
            >
              <Icon name="trash" />
            </Button>
          )}
          {onEdit && (
            <Button
              className="button-flat"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(item);
              }}
            >
              <Icon name="pen" />
            </Button>
          )}
        </OperationsWrapper>
      )}
    </ListItemWrapper>
  );
}

export default Item;
