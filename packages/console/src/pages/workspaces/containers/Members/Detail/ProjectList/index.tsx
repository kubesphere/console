/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  BaseTable,
  Column,
  FormattedCluster,
  FormattedUser,
  formatTime,
  getDisplayName,
  Pagination,
  projectStore,
  StatusReason,
  useDetailPage,
  workspaceStore,
} from '@ks-console/shared';
import { Button, Card, LoadingOverlay, Select } from '@kubed/components';
import { Exclamation, Refresh } from '@kubed/icons';
import { Action, EmptyText, EmptyTipIcon, Filter, TableWrapper, Title } from '../styles';
import { useDevopsList } from './utils';

interface ProjectListProps {
  type: 'projects' | 'devops';
}

const { useFetchWorkspaceClustersQuery } = workspaceStore;
const { useNamespaceList } = projectStore;

const CurrentSelect = styled(Select)`
  .kubed-select-selector {
    width: 250px;
  }
`;

function ProjectList({ type }: ProjectListProps) {
  const params = useParams();
  const workspace = params.workspace;
  const [cluster, setCluster] = useState<string>();
  const title = type === 'projects' ? t('PROJECTS') : t('DEVOPS_PROJECTS');
  const useListFunc = type === 'projects' ? useNamespaceList : useDevopsList;

  const { detail: formattedUser } = useDetailPage<FormattedUser>();

  const { formattedClusters = [] } = useFetchWorkspaceClustersQuery({
    workspace,
    onSuccess: data => {
      setCluster(data?.[0]?.name);
    },
  });

  const clusters = useMemo(
    () =>
      formattedClusters.map(item => ({
        label: item.name,
        value: item.name,
        cluster: item,
        disabled: !item.isReady,
      })),
    [formattedClusters],
  );

  const {
    data = [],
    reFetch,
    total,
    page,
    nextPage,
    prevPage,
    pageSize,
    refresh,
    isLoading,
  } = useListFunc(
    {
      cluster,
      workspace,
      username: formattedUser?.name,
      labelSelector: type === 'devops' ? 'devops.kubesphere.io/managed=true' : undefined,
    },
    {
      autoFetch: !!cluster,
    },
  );

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      width: '33%',
      render: (name, record) => getDisplayName(record),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      width: '33%',
      render: (createTime: string) => <p>{formatTime(createTime)}</p>,
    },
  ];

  const isDevopsDisable = (name: string) => {
    if (type !== 'devops') {
      return '';
    }
    return get(
      globals,
      `ksConfig.enabledExtensionModulesStatus.devops.clusterSchedulingStatuses.${name}`,
      false,
    )
      ? ''
      : 'NO_DEVOPS_INSTALL';
  };

  const getDisabledMsg = (item: FormattedCluster) => {
    const msg = item.isReady ? '' : 'UNREADY';
    return msg || isDevopsDisable(item.name);
  };

  const renderEmpty = () => {
    return (
      <EmptyText>
        <EmptyTipIcon>
          <Exclamation size={48} />
        </EmptyTipIcon>
        <div>{t('NO_MATCHING_RESULT_FOUND')}</div>
        <p>
          {t('YOU_CAN_TRY_TO')}
          <Action onClick={refresh}>{t('REFRESH_DATA')}</Action>
          {t('OR')}
          <Action onClick={refresh}>{t('CLEAR_SEARCH_CONDITIONS')}</Action>
        </p>
      </EmptyText>
    );
  };

  return (
    <Card padding={20}>
      <Title>{title}</Title>
      <TableWrapper>
        <LoadingOverlay visible={isLoading} />
        <Filter>
          <CurrentSelect
            // options={clusters}
            key={type}
            value={cluster}
            onChange={(newValue: string) => {
              setCluster(newValue);
              reFetch({
                cluster: newValue,
              });
            }}
          >
            {clusters.map(item => {
              const disabledMsg = getDisabledMsg(item.cluster);
              return (
                <Select.Option key={item.value} value={item.value} disabled={!!disabledMsg}>
                  <span>{item.label}</span>
                  {!!disabledMsg && (
                    <div>
                      <StatusReason data={{}} reason={disabledMsg} hasTip={false} />
                    </div>
                  )}
                </Select.Option>
              );
            })}
          </CurrentSelect>
          <Button variant="text" onClick={refresh}>
            <Refresh />
          </Button>
        </Filter>
        {isEmpty(data) ? (
          renderEmpty()
        ) : (
          //TODO: BaseTable Support Empty
          <BaseTable columns={columns} dataSource={data}></BaseTable>
        )}
        <Pagination
          totalCount={total}
          showTotal={false}
          onNextPage={nextPage}
          onPreviousPage={prevPage}
          page={page - 1}
          pageSize={pageSize}
        />
      </TableWrapper>
    </Card>
  );
}

export default ProjectList;
