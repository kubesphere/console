/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode } from 'react';

import { useGlobalStyles } from '../../../hooks/useGlobalStyles';

import { Root } from './styles';

interface ListPageSideProps {
  children: ReactNode;
}

export default function ListPageSide(props: ListPageSideProps) {
  const { globalStyles } = useGlobalStyles();
  const { pageHeaderHeight } = globalStyles;

  return <Root $pageHeaderHeight={pageHeaderHeight} {...props} />;
}
