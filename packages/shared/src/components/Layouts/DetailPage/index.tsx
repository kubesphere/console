/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useImperativeHandle, forwardRef, Ref } from 'react';
import { Loading } from '@kubed/components';
import { Outlet, useParams } from 'react-router-dom';

import DetailPageSide from '../DetailPageSide';
import DetailNav, { Tab } from './DetailNav';
import type { PathParams } from '../../../types';
import SideBar, { SideBarProps } from './SideBar';
import { DetailPageContext, useDetailPage } from './DetailPageContext';

import { MainContent } from './styles';
import { isEmpty, isUndefined } from 'lodash';

export { DetailPageContext, useDetailPage };

export interface DetailPageProps<T> {
  tabs?: Tab[];
  nav?: ReactNode;
  sideProps: SideBarProps<T>;
  store: any;
  data?: T;
  params?: PathParams;
  isLoading?: boolean;
  authKey?: string;
}

export type DetailPageRef<T> = {
  detail: T;
  refetch: () => void;
};

const DetailPage = forwardRef(
  <T extends Record<string, any>>(
    { sideProps = {}, tabs, nav, data, params, store, isLoading, authKey }: DetailPageProps<T>,
    ref?: Ref<DetailPageRef<T>>,
  ) => {
    const reqParams = { ...useParams(), ...params } as PathParams;

    let detail: T;
    let refetch: any;

    const {
      data: $data = {},
      refetch: $refetch,
      isLoading: $isLoading,
    } = store.useGetMutation(reqParams, {
      enabled: isEmpty(data) || isUndefined(data),
    });

    if (data) {
      detail = data;
    } else {
      detail = $data;
      isLoading = $isLoading;
      refetch = $refetch;
    }

    useImperativeHandle(ref, () => ({
      refetch: refetch,
      detail: detail,
    }));

    if (isLoading) {
      return <Loading className="page-loading" />;
    }

    return (
      <DetailPageContext.Provider value={{ detail, params: reqParams, refetch, store, authKey }}>
        <DetailPageSide>
          <SideBar<T> {...sideProps} />
        </DetailPageSide>
        <MainContent>
          <DetailNav tabs={tabs} nav={nav} />
          <Outlet />
        </MainContent>
      </DetailPageContext.Provider>
    );
  },
);

export default DetailPage;
