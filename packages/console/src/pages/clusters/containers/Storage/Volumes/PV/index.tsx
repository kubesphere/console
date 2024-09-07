/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  Column,
  formatTime,
  getDisplayName,
  PVDetail,
  ListPage,
  mapAccessModes,
  nvStore,
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
import { Link, useParams } from 'react-router-dom';
import { ModeTitleStyle } from './styles';
import { banner, getPVStatus, getStatusSelectOption, tabs } from '../constants';
// import { VolumesProps } from '../interface';

// const module = 'PV';
const { module } = nvStore;

const PV = () => {
  const tableRef = React.useRef<TableRef<any>>();
  const params = useParams();

  const { cluster } = params;
  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: nvStore,
    params: { cluster },
    callback,
  });

  const renderAccessMode = (accessModes = []) => {
    const modes = mapAccessModes(accessModes);
    return <span>{modes.join(',')}</span>;
  };

  const showAction = (row?: Record<string, any>) => {
    return !!(row && !row.isFedManaged);
  };

  const cantDelete = ({ status }: PVDetail) => ['Bound', 'Released'].includes(status.phase);

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

  const renderTableActions = useActionMenu({
    authKey: module,
    params: { cluster },
    actions: [],
  });

  const renderItemActions = useActionMenu({
    authKey: module,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => showAction(row as unknown as PVDetail),
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: row => showAction(row as unknown as PVDetail),
        onClick: editYaml,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        disabled: row => cantDelete(row as unknown as PVDetail),
        show: row => showAction(row as unknown as PVDetail),
        onClick: del,
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
      render: (value, row) => {
        const status = getPVStatus(row);
        const detailUrl = row.phase === 'Terminating' ? '' : `/clusters/${cluster}/pv/${row.name}`;

        return (
          <Avatar
            title={
              <Link to={detailUrl} replace={true}>
                {getDisplayName(row)}
              </Link>
            }
            icon={<Storage size={40} />}
            description={
              !isEmpty(status) ? (
                <StatusReason data={row} type="cluster" />
              ) : (
                <span>{row.storageClassName || '-'}</span>
              )
            }
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
        <StatusIndicator type={phase}>{t(`VOLUME_STATUS_${phase.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('CAPACITY'),
      field: 'capacity',
      canHide: true,
      width: '7%',
      render: capacity => (
        <div>
          <p>{capacity}</p>
        </div>
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
      title: t('RECLAIM_POLICY'),
      field: '_originData',
      canHide: true,
      width: '7.74%',
      render: _ => _.spec.persistentVolumeReclaimPolicy ?? '',
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
      render: (value, row) => renderItemActions(row),
    },
  ];

  const isDisableRowSelect = (record: PVDetail): boolean =>
    record.isFedManaged || ['Bound', 'Released'].indexOf(record.status.phase) > -1;

  const table = {
    ref: tableRef,
    columns,
    batchActions: renderBatchActions({}),
    toolbarRight: renderTableActions({}),
    disableRowSelect: (row?: Record<string, any>) => isDisableRowSelect(row as unknown as PVDetail),
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
        currentTab={'Volumes/PV'}
        store={nvStore}
      />
    </>
  );
};

export default PV;
