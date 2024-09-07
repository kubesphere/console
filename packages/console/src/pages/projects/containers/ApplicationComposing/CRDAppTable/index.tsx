/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { get } from 'lodash';
import { Field } from '@kubed/components';
import { Application, Pen, Trash } from '@kubed/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  Icon,
  Image,
  Column,
  TableRef,
  DataTable,
  formatTime,
  getDisplayName,
  useItemActions,
  StatusIndicator,
  useTableActions,
  useBatchActions,
} from '@ks-console/shared';

import { getBaseResourceUrl } from '../../../store';

import { EmptyPlaceholder } from '../../Applications/AppTypeTable/styles';

function CRDAppTable(): JSX.Element {
  const { pathname } = useLocation();
  const { workspace = '' } = useParams();
  const tableRef = useRef<TableRef>();
  const [, setSelectedRows] = useState<any>();
  const renderTableActions = useTableActions({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => console.log('create crd app'),
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });
  const renderBatchActions = useBatchActions({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedRows(selectedFlatRows);
          console.log('delete crd apps');
          // setModalType('delete');
        },
        props: {
          color: 'error',
        },
      },
    ],
  });
  const renderItemActions = useItemActions({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedRows(selectedFlatRows);
          console.log('edit crd app information');
          // setModalType('edit');
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedRows(selectedFlatRows);
          console.log('delete crd app');
          // setModalType('delete');
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      render: (name, record) => (
        <Field
          value={
            <Link to={`${pathname}/${name}`} replace={true}>
              {getDisplayName(record)}
            </Link>
          }
          label={get(record, 'annotations["kubesphere.io/description"]', '-')}
          avatar={
            record.icon ? (
              <Icon name={record.icon} size={40} />
            ) : (
              <Image iconSize={40} src="/assets/default-app.svg" iconLetter={name} />
            )
          }
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '20%',
      render: status => <StatusIndicator type={status}>{t(status.toUpperCase())}</StatusIndicator>,
    },
    {
      title: t('VERSION'),
      field: 'version',
      canHide: true,
      width: '20%',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 180,
      render: time => formatTime(time, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: renderItemActions,
    },
  ];

  return (
    <DataTable
      ref={tableRef}
      simpleSearch
      rowKey="name"
      tableName="apps"
      url={getBaseResourceUrl({}, 'applications')}
      columns={columns}
      useStorageState={false}
      placeholder={t('SEARCH_BY_NAME')}
      toolbarRight={renderTableActions()}
      batchActions={renderBatchActions()}
      format={item => item}
      emptyOptions={{
        element: (
          <EmptyPlaceholder
            title={t('NO_COMPOSED_APP_FOUND')}
            description={t('COMPOSED_APP_EMPTY_DESC')}
            image={<Application size={48} />}
          />
        ),
      }}
    />
  );
}

export default CRDAppTable;
