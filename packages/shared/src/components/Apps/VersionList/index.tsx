/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Refresh } from '@kubed/icons';
import { useCacheStore as useStore } from '../../../index';
import { useParams } from 'react-router-dom';
import { Button, Card, FilterInput, Loading } from '@kubed/components';

import VersionItem from './Item';
import { getAuthKey, hasPermission } from '../../../utils';
import { openpitrixStore } from '../../../stores';

import type { AppDetailStore, AppVersion } from '../../../types';

import {
  EmptyText,
  MainContent,
  ContentHeader,
  StyledTableFooter,
  CardContentWrapper,
} from './styles';
import { LoadingBox } from '../InstanceList/styles';

const { useAppVersionList, STORE_QUERY_APP_STATUS } = openpitrixStore;

type VersionDetail = AppVersion;

type Props = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  onAddVersion?: (data: any) => void;
  isAdmin?: boolean;
  refresh?: boolean;
  actionKey: Record<string, string>;
  handleDeploy?: (data: VersionDetail) => void;
};

export function VersionList({
  hideHeader,
  hideFooter,
  onAddVersion,
  isAdmin,
  handleDeploy,
  refresh,
  actionKey,
}: Props): JSX.Element {
  const { appName = '', workspace } = useParams();
  const authKey = getAuthKey(actionKey.appKey);
  const enabledActions = hasPermission({
    module: authKey,
    workspace,
    action: actionKey.create,
  });

  // const isAdmin = false; // openpitrix app store  => appStore.isAdmin;
  const [, setVersions] = useStore('versions');
  const [appDetail] = useStore<AppDetailStore>('appDetail');
  const status = isAdmin ? STORE_QUERY_APP_STATUS : undefined;
  const {
    data: versions = [],
    total,
    page,
    isLoading,
    pageSize,
    prevPage,
    nextPage,
    reFetch,
    refresh: refreshVersions,
  } = useAppVersionList(
    { appName, workspace },
    { status },
    { onSuccess: ({ items }: any) => setVersions({ items, refreshVersions }) },
  );

  useEffect(() => {
    if (refresh) {
      refreshVersions();
    }
  }, [refresh]);

  function handleSearch(keyword: string): void {
    reFetch({ keyword });
  }

  return (
    <Card sectionTitle={t('VERSIONS')}>
      <CardContentWrapper>
        {!hideHeader && (
          <ContentHeader>
            <FilterInput simpleMode placeholder={t('SEARCH_BY_NAME')} onChange={handleSearch} />
            <Button variant="text" onClick={refreshVersions}>
              <Refresh />
            </Button>
            {enabledActions && !isAdmin && (
              <Button onClick={() => onAddVersion?.(appDetail)}>{t('UPLOAD_NEW_VERSION')} </Button>
            )}
          </ContentHeader>
        )}
        <MainContent>
          {isLoading ? (
            <LoadingBox>
              <Loading className="loading" />
            </LoadingBox>
          ) : (
            <>
              {isEmpty(versions) ? (
                <EmptyText>{t('NO_RESOURCE_FOUND')}</EmptyText>
              ) : (
                versions?.map((item: VersionDetail) => (
                  <VersionItem
                    actionKey={actionKey}
                    key={item.metadata?.name}
                    appName={appName}
                    hasPermission={enabledActions}
                    handleDeploy={() => handleDeploy?.(item)}
                    isAdmin={isAdmin}
                    versionDetail={item}
                    refreshVersions={refreshVersions}
                    // TODO ?????
                    refreshAppDetails={appDetail?.refetchAppDetails}
                  />
                ))
              )}
            </>
          )}
        </MainContent>
        {!hideFooter && (
          <StyledTableFooter
            totalCount={total}
            instance={{
              state: { pageIndex: page - 1 },
              nextPage,
              previousPage: prevPage,
              pageCount: Math.ceil(total / pageSize),
            }}
          />
        )}
      </CardContentWrapper>
    </Card>
  );
}
