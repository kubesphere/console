/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { isEmpty } from 'lodash';
import { useCacheStore as useStore } from '../../../index';
import { Loading } from '@kubed/components';

import AppContent from './AppContent';
import type { AppDetail } from '../../../types';
import { openpitrixStore } from '../../../stores';
import { UseQueryParamsOption } from '../../../hooks';

import { Desc, LoadMore, StyledEmpty, Wrapper, Title } from './styles';

const { STORE_APP_LIMIT, useAppList } = openpitrixStore;

export type AppListRefType = {
  refresh: () => void;
};

type Props = {
  title?: string;
  workspace?: string;
  parameter: Record<string, any>;
  className?: string;
  style?: CSSProperties;
  onAppItemClick?: (item: AppDetail) => void;
};

function AppList(
  { title, workspace, parameter, onAppItemClick, className, style }: Props,
  ref?: React.Ref<AppListRefType>,
): JSX.Element {
  const [appList, setAppList] = useState<AppDetail[]>([]);
  const [keepPrevious, setKeepPrevious] = useState<boolean>(false);
  const [, setCurrentCategoryAppsTotal] = useStore<number>('currentCategoryAppsTotal', 0);
  const { isLoading, total, page, reFetch, refresh } = useAppList(
    // TODO 临时取消 workspace
    { workspace },
    {
      autoFetch: !!workspace,
      onSuccess: ({ items }: any) => {
        if (!keepPrevious) {
          return setAppList(items);
        }

        setAppList(prev => [...prev, ...items]);
        setKeepPrevious(false);
      },
    },
  );

  function refetchListByParams(patchParam: Partial<UseQueryParamsOption>): void {
    const queryParams: Record<string, any> = {
      status: 'active',

      limit: STORE_APP_LIMIT,
      page: 0,
      ...patchParam,
    };

    reFetch(queryParams);
  }

  function handleShowMore(): void {
    refetchListByParams({ page: page + 1, ...parameter });
    setKeepPrevious(true);
  }

  useImperativeHandle(ref, () => ({ refresh }));

  useEffect(() => setCurrentCategoryAppsTotal(total), [total]);

  useEffect(() => refetchListByParams(parameter), [parameter]);

  return (
    <Wrapper className={className} style={style}>
      {title && <Title style={{ marginBottom: '20px' }}>{title}</Title>}
      {isLoading && <Loading className="page-loading" />}
      {!isLoading && isEmpty(appList) && (
        <StyledEmpty>
          <img src="/assets/empty-card.svg" alt="" />
          <Desc>{t('NO_RESOURCE_FOUND')}</Desc>
        </StyledEmpty>
      )}
      {!isLoading && !isEmpty(appList) && (
        <AppContent apps={appList} onAppItemClick={onAppItemClick} />
      )}
      {!isLoading && appList.length < total && (
        <LoadMore onClick={handleShowMore}>{t('VIEW_MORE')}</LoadMore>
      )}
    </Wrapper>
  );
}

export default forwardRef(AppList);
