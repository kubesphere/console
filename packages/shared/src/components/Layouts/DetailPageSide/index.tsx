import React from 'react';
import type { ReactNode } from 'react';

import { useGlobalStyles } from '../../../hooks/useGlobalStyles';

import { Root } from './styles';

interface DetailPageSideProps {
  children: ReactNode;
}

export default function DetailPageSide(props: DetailPageSideProps) {
  const { globalStyles } = useGlobalStyles();
  const { pageHeaderHeight } = globalStyles;

  return <Root $pageHeaderHeight={pageHeaderHeight} {...props} />;
}
