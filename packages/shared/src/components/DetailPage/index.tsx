import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import DetailPageSide from '../Layouts/DetailPageSide';
import DetailNav, { Tab } from './DetailNav';
import DetailCard, { SideProps } from './DetailCard';

import { ContentWrapper } from './styles';

export interface DetailPageProps {
  tabs?: Tab[];
  nav?: ReactNode;
  cardProps: SideProps;
  refresh?: boolean;
}

export function DetailPagee({ cardProps = {}, tabs, nav, refresh = true }: DetailPageProps) {
  return (
    <>
      <DetailPageSide>
        <DetailCard {...cardProps} />
      </DetailPageSide>
      <ContentWrapper>
        <DetailNav tabs={tabs} nav={nav} />
        {refresh && <Outlet />}
      </ContentWrapper>
    </>
  );
}
