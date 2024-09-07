/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
