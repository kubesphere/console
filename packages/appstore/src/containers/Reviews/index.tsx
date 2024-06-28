import React from 'react';
import { SafeNotice } from '@kubed/icons';
import { Banner, NavItem, Navs } from '@kubed/components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import ReviewsTable from './ReviewsTable';

function Reviews(): JSX.Element {
  const { type } = useParams();
  const navigate = useNavigate();
  const navs: NavItem[] = [
    {
      value: 'unprocessed',
      label: t('NEW_SUBMIT'),
    },
    {
      value: 'processed',
      label: t('COMPLETED'),
    },
    {
      value: 'all',
      label: t('ALL'),
    },
  ];

  return (
    <>
      <Banner
        className="mb12"
        icon={<SafeNotice />}
        title={t('APP_REVIEW')}
        description={t('APP_REVIEW_DESC')}
      >
        <Navs data={navs} value={type} onChange={navigate} />
      </Banner>
      <Outlet></Outlet>
      {type && <ReviewsTable type={type} />}
    </>
  );
}

export default Reviews;
