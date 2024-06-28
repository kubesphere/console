import { ReactNode } from 'react';

export type ListItemDetail = {
  title: string;
  description: string;
  className?: string;
};

export type ListItem = {
  title: string;
  details?: ListItemDetail[];
  description?: string;
  titleClass?: string;
  operations?: ReactNode;
};
