/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  Column,
  FormattedWorkload,
  formatTime,
  ListPage,
  mapAccessModes,
  pvcStore,
  StatusIndicator,
  StatusReason,
  TableRef,
  useActionMenu,
  useCommonActions,
} from '@ks-console/shared';
import { Tooltip } from '@kubed/components';
import { Pen, Question, Storage, Trash } from '@kubed/icons';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ModeTitleStyle } from './styles';
import { banner, getStatusSelectOption, getVolumeStatus, LOCALES_STATUS, tabs } from '../constants';
// import { VolumesProps } from '../interface';

// const module = 'PV';
const { module } = pvcStore;

const Volume = () => {
  const tableRef = React.useRef<TableRef<any>>();
  const params = useParams();

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { cluster } = params;
  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: pvcStore,
    params: { cluster },
    callback,
  });

  const renderAccessMode = (accessModes = []) => {
    const modes = mapAccessModes(accessModes);
    return <span>{modes.join(',')}</span>;
  };

  const renderAccessTitle = () => {
    const renderModeTip = (
      <div>
        <div>{t('ACCESS_MODE_TCAP')}:</div>
        <div>RWO (ReadWriteOnce): {t('ACCESS_MODE_RWO')}</div>
        <div>ROX (ReadOnlyMany): {t('ACCESS_MODE_ROX')}</div>
        <div>RWX (ReadWriteMany): {t('ACCESS_MODE_RWX')}</div>
      </div>
    );
    return (
      <ModeTitleStyle>
        {t('ACCESS_MODE_TCAP')}
        <Tooltip content={renderModeTip}>
          <Question size={16} />
        </Tooltip>
      </ModeTitleStyle>
    );
  };

  const renderItemActions = useActionMenu({
    authKey: module,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !row.isFedManaged,
        onClick: del,
      },
    ],
  });

  const renderTableActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
          className: 'table-button',
        },
        onClick: () => {
          console.log('create');
        },
      },
    ],
  });

  const renderBatchActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
      },
    ],
  });
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, record) => {
        const status = getVolumeStatus(record);
        const detailUrl =
          record.phase === 'terminating'
            ? ''
            : `/clusters/${cluster}/projects/${record.namespace}/volumes/${value}`;
        return (
          <Avatar
            description={
              !isEmpty(status) ? (
                <StatusReason data={record} />
              ) : (
                <span>{record.storageClassName || '-'}</span>
              )
            }
            isMultiCluster={record?.isFedManaged}
            icon={<Storage size={40} />}
            record={record}
            to={detailUrl}
          />
        );
      },
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      searchable: true,
      filterOptions: getStatusSelectOption(),
      width: '15%',
      render: (value, { phase }) => (
        <StatusIndicator type={phase}>{t(phase ? LOCALES_STATUS[phase] : '')}</StatusIndicator>
      ),
    },
    {
      title: renderAccessTitle(),
      field: 'accessModes',
      canHide: true,
      width: '10%',
      render: accessModes => {
        return renderAccessMode(accessModes);
      },
    },
    {
      title: t('MOUNT_STATUS'),
      field: 'inUse',
      canHide: true,
      width: '12%',
      render: inUse => (inUse ? t('MOUNTED') : t('NOT_MOUNTED')),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '15%',
      render: time => formatTime(time),
    },
    {
      id: 'more',
      title: ' ',
      width: 20,
      render: (value, row) =>
        row.isFedManaged ? null : renderItemActions(row as FormattedWorkload),
    },
  ];

  const table = {
    ref: tableRef,
    columns,
    batchActions: renderBatchActions({}),
    toolbarRight: renderTableActions({}),
    // watchOptions: {
    //   enabled: true,
    //   url: getWatchListUrl(params),
    //   module,
    // },
  };

  return (
    <>
      <ListPage
        banner={banner()}
        table={table}
        tabs={tabs()}
        currentTab={'Volumes/Volumes'}
        store={pvcStore}
        hasNamespaceSelector
      />
    </>
  );
};

export default Volume;
