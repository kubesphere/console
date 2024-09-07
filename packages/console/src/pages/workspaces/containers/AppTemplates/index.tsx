/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { Appcenter } from '@kubed/icons';
import { Link, useParams } from 'react-router-dom';
import { Banner, BannerTip, notify } from '@kubed/components';

import {
  Image,
  Column,
  TableRef,
  DataTable,
  getLocalTime,
  StatusIndicator,
  openpitrixStore,
  // useTableActions,
  transferAppStatus,
  useListQueryParams,
  AppDetail,
  getDisplayName,
} from '@ks-console/shared';

import { getAvatar } from '../../utils';
import { HelmUploadModal } from '../../components/Modals';
import CreateAppTemplateModal from './CreateAppTemplateModal';

import { TableItemField } from './styles';

enum AppType {
  'helm' = 'helm 应用',
  'yaml' = 'yaml 应用',
  'edge' = '边缘模板应用',
}

const { getBaseUrl, DEFAULT_QUERY_STATUS, createApp } = openpitrixStore;

function AppTemplates(): JSX.Element {
  const { workspace = '' } = useParams();
  const tableRef = useRef<TableRef>();
  const [modalType, setModalType] = useState<string>('');
  const tableParameters = {
    order: 'create_time',
    status: DEFAULT_QUERY_STATUS,
    statistics: true,
  };
  const columns: Column<AppDetail>[] = [
    {
      title: t('NAME'),
      field: 'metadata.name',
      width: '40%',
      searchable: true,
      render: (app_id, app) => (
        <TableItemField
          label={app_id}
          value={<Link to={`/workspaces/${workspace}/apps/${app_id}`}>{getDisplayName(app)}</Link>}
          avatar={
            <Image src={getAvatar(app.spec.icon)} iconSize={40} iconLetter={app_id as string} />
          }
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status.state',
      canHide: true,
      width: '20%',
      render: status => (
        // @ts-ignore
        <StatusIndicator type={status}>{transferAppStatus(status)}</StatusIndicator>
      ),
    },
    {
      title: t('应用类型'),
      field: 'spec.appType',
      canHide: true,
      width: '20%',
      // @ts-ignore
      render: val => AppType[val],
    },
    // {
    //   title: t('LATEST_VERSION'),
    //   field: 'latest_app_version.name',
    //   canHide: true,
    //   width: '20%',
    // },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: 'status.updateTime',
      canHide: true,
      width: 120,
      render: (time, item) =>
        getLocalTime((time || item.metadata?.creationTimestamp) as string).fromNow(),
    },
  ];
  // const tableActions = useTableActions({
  //   authKey: 'app-templates',
  //   params: { workspace },
  //   actions: [
  //     {
  //       key: 'create',
  //       text: t('CREATE'),
  //       action: 'create',
  //       onClick: () => setModalType('create'),
  //       props: {
  //         color: 'secondary',
  //         shadow: true,
  //       },
  //     },
  //   ],
  // });

  function serverDataFormatter(serverData: any) {
    return {
      ...serverData,
      totalItems: serverData.totalItems,
    };
  }

  function transformRequestParams(params: Record<string, any>): Record<string, any> {
    const { parameters, pageIndex, filters } = params;
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
      conditions: formattedParams.conditions + `,keyword=${keyword}`,
    };
  }

  function closeModal(): void {
    setModalType('');
  }

  function onUpload(): void {
    setModalType('upload');
  }

  async function handleOk(fileData: any): Promise<void> {
    await createApp({ workspace }, fileData);
    notify.success(t('UPLOAD_SUCCESSFUL'));
    tableRef.current?.refetch();
    closeModal();
  }

  return (
    <>
      <Banner
        className="mb12"
        icon={<Appcenter size={40} />}
        title={t('APP_TEMPLATE_PL')}
        description={t('APP_TEMPLATE_DESC')}
      >
        <BannerTip title={t('DEVELOP_APP_TITLE')} key="develop_app">
          {t('DEVELOP_APP_DESC')}
        </BannerTip>
        <BannerTip title={t('HOW_PUBLISH_APP_TITLE')} key="publish_app">
          t('HOW_PUBLISH_APP_DESC')
        </BannerTip>
      </Banner>
      <DataTable<AppDetail>
        ref={tableRef}
        simpleSearch
        rowKey="app_id"
        tableName="APP_TEMPLATE"
        columns={columns}
        // format={item => item}
        // TODO 此处需要 workspace
        url={getBaseUrl({}, 'apps')}
        parameters={tableParameters}
        transformRequestParams={transformRequestParams}
        serverDataFormat={serverDataFormatter}
        emptyOptions={{
          withoutTable: true,
          createButton: true,
          image: <Appcenter size={48} />,
          title: t('NO_APP_TEMPLATE_FOUND'),
          description: t('APP_TEMPLATE_EMPTY_DESC'),
          clickCreateButtonFn: () => setModalType('create'),
        }}
      />
      {modalType === 'create' && (
        <CreateAppTemplateModal visible={true} onCancel={closeModal} onUpload={onUpload} />
      )}
      {modalType === 'upload' && (
        <HelmUploadModal visible={true} onCancel={closeModal} onOk={handleOk} />
      )}
    </>
  );
}

export default AppTemplates;
