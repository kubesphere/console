/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Refresh } from '@kubed/icons';
import { useParams } from 'react-router-dom';
import { Button, Card, FilterInput, Loading, Select } from '@kubed/components';

import InstanceItem from './Item';
import { openpitrixStore, useClusterStore } from '../../../stores';
import { getClusterAliasName } from '../../../utils';

import { EmptyText, HeaderContent, LoadingBox, MainContent, StyledTableFooter } from './styles';

const { useApplicationsList } = openpitrixStore;

type Props = {
  title?: string;
  appId?: string;
  appName?: string;
  workspace?: string;
  versionID?: string;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export function InstanceList({
  versionID,
  title,
  hideHeader,
  hideFooter,
  className,
  appName: defaultAppName,
}: Props): JSX.Element {
  const { appName = defaultAppName, workspace, cluster } = useParams();
  const hideClusters =
    location.href.includes('apps-manage/store') || location.href.includes('app-instances');
  const { clusters } = useClusterStore();
  const clusterOptions = (clusters || [])?.map(({ name }: any) => ({
    label: getClusterAliasName(name),
    value: name,
  }));
  const [name, setName] = useState('');
  const [clusterSelected, setClusterSelected] = useState(clusters?.[0]?.name || '');
  const { data, isLoading, total, page, pageSize, nextPage, prevPage, reFetch, refresh } =
    useApplicationsList({ workspace, cluster, appName, versionID }, { appName, keyword: name });

  function handleSearch(keyword: string): void {
    setName(keyword);
    reFetch({ keyword });
  }

  function handleClusterChange(clusterName: any): void {
    setClusterSelected(clusterName);
  }

  return (
    <Card className={className} sectionTitle={title || t('APP_INSTANCES')}>
      {!hideHeader && (
        <HeaderContent>
          {!isEmpty(clusters) && !hideClusters && (
            <Select
              style={{ width: '250px' }}
              value={clusterSelected}
              onChange={handleClusterChange}
              options={clusterOptions}
            />
          )}
          <FilterInput
            simpleMode
            className="filter"
            placeholder={t('SEARCH_BY_NAME')}
            onChange={handleSearch}
          />
          <Button variant="text" onClick={refresh}>
            <Refresh />
          </Button>
        </HeaderContent>
      )}
      {isLoading ? (
        <LoadingBox>
          <Loading className="loading" />
        </LoadingBox>
      ) : (
        <MainContent>
          {isEmpty(data) ? (
            <EmptyText>{t('NO_RESOURCE_FOUND')}</EmptyText>
          ) : (
            data?.map((item: any) => (
              <InstanceItem key={item.name} detail={item} showVersion={!versionID} />
            ))
          )}
        </MainContent>
      )}
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
    </Card>
  );
}
