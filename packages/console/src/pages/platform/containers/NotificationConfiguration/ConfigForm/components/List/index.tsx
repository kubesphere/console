import React from 'react';

import Item from './ListItem';
import type { ListItem } from './types';

import { ListWrapper } from './styles';

type Props = {
  items: ListItem[];
  className?: string;
  itemClassName?: string;
  onClick?: (item: ListItem) => void;
  onDelete?: (item: ListItem) => void;
  onEdite?: (item: ListItem) => void;
};

function List({ items, className, itemClassName, onClick, onDelete, onEdite }: Props): JSX.Element {
  return (
    <ListWrapper className={className}>
      {items.map((item: ListItem, index) => (
        <Item
          key={`${item.title}_${index}`}
          item={item}
          className={itemClassName}
          onClick={onClick}
          onDelete={onDelete}
          onEdit={onEdite}
        />
      ))}
    </ListWrapper>
  );
}

export default List;
