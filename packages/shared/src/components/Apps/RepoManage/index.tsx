/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Banner, BannerTip, Button, Field, notify } from '@kubed/components';

import Icon from '../../Icon';
import StatusIndicator from '../../StatusIndicator';
import { DataTable } from '../../DataTable';
import RepoManagementModal from '../../Modals/RepoManagementModal';
import { DeleteConfirmModal } from '../../Modals/DeleteConfirm';
import {
  useItemActions,
  useTableActions,
  useBatchActions,
  useListQueryParams,
} from '../../../hooks';
import { openpitrixStore } from '../../../stores';
import { getAuthKey } from '../../../utils';
import type { Column, TableRef } from '../../DataTable';
import type { RepoData } from '../../../types';

const AddButton = styled(Button)`
  min-width: 96px;
`;
const Description = styled.div`
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const { getRepoUrl, useReposDeleteMutation } = openpitrixStore;
export function RepoManage(): JSX.Element {
  const params = useParams();
  const { workspace = '' } = params;
  const repoListUrl = getRepoUrl({ workspace });
  const tableRef = useRef<TableRef>();
  const [modalType, setModalType] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<RepoData[]>();
  const { mutateAsync, isLoading } = useReposDeleteMutation(workspace);
  const tableParameters = {
    order: 'creationTimestamp',
    status: 'active',
  };
  const authKey = getAuthKey('app-repos');

  function isWorkspaceRepo(val: any) {
    return (
      val.metadata.labels['kubesphere.io/workspace'] === workspace ||
      location.pathname.includes('/apps-manage/repo')
    );
  }

  const renderItemActions = useItemActions<RepoData>({
    authKey,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: isWorkspaceRepo,
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('edit');
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        show: isWorkspaceRepo,
        action: 'delete',
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('delete');
        },
      },
    ],
  });

  const renderBatchActions = useBatchActions({
    authKey,
    params,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedRows(selectedFlatRows as any);
          setModalType('delete');
        },
        props: { color: 'error' },
      },
    ],
  });
  const renderTableActions = useTableActions({
    authKey,
    params,
    actions: [
      {
        key: 'create',
        text: t('ADD'),
        action: 'manage',
        onClick: () => setModalType('create'),
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });
  const columns: Column<RepoData>[] = [
    {
      title: t('NAME'),
      field: 'name',
      width: '25%',
      searchable: true,
      render: (_, { metadata, spec }) => (
        <Field
          value={
            metadata?.annotations?.['kubesphere.io/alias-name']
              ? `${metadata?.annotations?.['kubesphere.io/alias-name']}（${metadata?.name}）`
              : metadata?.name
          }
          // value={<Link to={record.metadata.name}>{name}</Link>}
          label={
            // @ts-ignore
            <Description title={spec?.description || '-'}>{spec?.description || '-'}</Description>
          }
          avatar={<Icon name="catalog" size={40} />}
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status.state',
      canHide: true,
      width: '15%',
      render: (status = 'syncing') => (
        // @ts-ignore TODO
        <StatusIndicator type={status}>
          {t(`APP_REPO_STATUS_${(status as string).toUpperCase()}`)}
        </StatusIndicator>
      ),
    },
    {
      title: t('URL'),
      field: 'spec.url',
      width: '45%',
    },
    {
      title: t('TYPE'),
      field: 'workspace',
      width: '45%',
      render: (_, record) => {
        const isSystem =
          record.metadata?.labels?.['kubesphere.io/workspace'] === 'system-workspace';
        return t(isSystem ? 'SYSTEM_REPO_TYPE' : 'OWNER_REPO_TYPE');
      },
    },
    {
      id: 'more',
      title: '',
      width: '15%',
      // @ts-ignore TODO
      render: renderItemActions,
    },
  ];

  function serverDataFormatter(serverData: any) {
    return serverData;
  }

  function transformRequestParams(paramData: Record<string, any>): Record<string, any> {
    const { parameters, pageIndex, filters } = paramData;
    const keyword = filters?.[0]?.value;
    const formattedParams = useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
    });

    if (!keyword) {
      return formattedParams;
    }

    return {
      ...formattedParams,
      name: keyword,
      conditions: formattedParams.conditions + `,keyword=${keyword}`,
    };
  }

  function closeModal(): void {
    setModalType('');
    setSelectedRows(undefined);
  }

  function handleManageOk(): void {
    tableRef.current?.refetch();
    closeModal();
  }

  async function handleRepoDelete(): Promise<void> {
    const reposId: string[] = selectedRows?.map(item => item.metadata.name) || [];
    await mutateAsync(reposId);
    notify.success(t('DELETED_SUCCESSFUL'));
    closeModal();
    tableRef.current?.refetch();
  }

  return (
    <>
      <Banner
        className="mb12"
        icon={<Icon name="catalog" />}
        title={t('APP_REPO')}
        description={t('APP_REPO_DESC')}
      >
        <BannerTip title={t('HOW_TO_USE_APP_REPO_Q')} key="develop">
          {t('HOW_TO_USE_APP_REPO_A')}
        </BannerTip>
      </Banner>
      <DataTable
        ref={tableRef}
        rowKey="metadata.uid"
        tableName="APP_REPOSITORY"
        url={repoListUrl}
        simpleSearch
        parameters={tableParameters}
        disableRowSelect={val => !isWorkspaceRepo(val)}
        transformRequestParams={transformRequestParams}
        columns={columns}
        useStorageState={false}
        placeholder={t('SEARCH_BY_NAME')}
        toolbarRight={renderTableActions()}
        batchActions={renderBatchActions()}
        // @ts-ignore TODO
        format={item => ({ ...item, workspace })}
        serverDataFormat={serverDataFormatter}
        emptyOptions={{
          withoutTable: true,
          createButton: !!renderTableActions() && (
            <AddButton color="secondary" onClick={() => setModalType('create')}>
              {t('ADD')}
            </AddButton>
          ),
          title: t('NO_APP_REPO_FOUND'),
          image: <Icon name="catalog" size={48} />,
          description: t('APP_REPOSITORY_EMPTY_DESC'),
        }}
      />
      {['create', 'edit'].includes(modalType) && (
        <RepoManagementModal
          visible={true}
          onCancel={closeModal}
          onOk={handleManageOk}
          detail={selectedRows?.[0]}
        />
      )}
      {modalType === 'delete' && (
        <DeleteConfirmModal
          visible={true}
          type="APP_REPOSITORY"
          resource={selectedRows?.map((item: any) => item.metadata.name)}
          onOk={handleRepoDelete}
          onCancel={closeModal}
          confirmLoading={isLoading}
        />
      )}
    </>
  );
}

export default RepoManage;
