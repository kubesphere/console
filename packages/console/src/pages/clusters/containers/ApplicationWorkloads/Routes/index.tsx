/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Field } from '@kubed/components';
import {
  Icon,
  ingresStore,
  TableRef,
  getDisplayName,
  formatTime,
  useItemActions,
  ListPage,
  useActionMenu,
  useCommonActions,
} from '@ks-console/shared';
import { Avatar } from '../../../components';
import useRoutesActions from '../../../hooks/useRoutesActions';
import useRoutesAnnotations from '../../../hooks/useRoutesAnnotations';

import type { IngressDetail, Column } from '@ks-console/shared';

const module = 'ingresses';
const store = ingresStore;

const IngressRoutes = () => {
  const authKey = module;
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const tableRef = useRef<TableRef<IngressDetail>>();

  const refetch = () => {
    tableRef?.current?.refetch();
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params,
    callback: refetch,
  });

  const { editRoutesRule } = useRoutesActions({
    store,
    params,
    callback: refetch,
  });

  const { editAnnotations } = useRoutesAnnotations({
    store,
    callback: refetch,
  });

  const showAction = (record: Record<string, any>) => !record.isFedManaged;
  const renderItemActions = useItemActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: showAction,
        onClick: (_, record) => editBaseInfo(record),
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: showAction,
        onClick: (e, record) => editYaml(record),
      },
      {
        key: 'editRules',
        icon: <Icon name="firewall" />,
        text: t('EDIT_ROUTING_RULES'),
        action: 'edit',
        show: showAction,
        onClick: (_, record) => editRoutesRule({ record, originData: record._originData }),
      },
      {
        key: 'editAnnotations',
        icon: <Icon name="firewall" />,
        text: t('EDIT_ANNOTATIONS'),
        action: 'edit',
        show: showAction,
        onClick: (_, record) => editAnnotations({ detail: record }),
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: showAction,
        onClick: (e, record) => del({ type: 'ROUTE', resource: [record] }),
      },
    ],
  });
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (name, record) => (
        <Field
          avatar={<Avatar record={record} module={module} />}
          value={
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}>
              {getDisplayName<IngressDetail>(record as IngressDetail)}
            </Link>
          }
          label={record.description || '-'}
        />
      ),
    },
    {
      title: t('GATEWAY_ADDRESS_TCAP'),
      field: 'loadBalancerIngress',
      canHide: true,
      width: '22%',
      render: loadBalancerIngress => loadBalancerIngress.join('; '),
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '18%',
      render: namespace => (
        <Link to={`/clusters/${cluster}/projects/${namespace}`}>{namespace}</Link>
      ),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 150,
      render: time => formatTime(time),
    },
    {
      title: '',
      field: 'more',
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];

  const renderTableActions = useActionMenu({
    authKey,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('Create'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
          className: 'table-button',
        },
        onClick: () => {},
      },
    ],
  });

  const renderBatchActions = useActionMenu({
    authKey,
    params,
    mode: 'button',
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as IngressDetail[];
          del({ type: 'ROUTE', resource: selectedRows });
        },
      },
    ],
  });

  const table = {
    ref: tableRef,
    columns,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const banner = {
    icon: <Icon name="loadbalancer" size={48} />,
    title: t('ROUTE_PL'),
    description: t('ROUTE_DESC'),
  };

  return (
    <>
      <ListPage table={table} banner={banner} store={store} hasNamespaceSelector />
    </>
  );
};

export default IngressRoutes;
