/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Field, Text, Tooltip } from '@kubed/components';
import Avatar from '../../../components/Avatar';
import {
  Icon,
  serviceStore,
  getDisplayName,
  formatTime,
  useItemActions,
  TableRef,
  useActionMenu,
  ListPage,
  useCommonActions,
} from '@ks-console/shared';
import useEditServiceModal from '../../../hooks/useServiceModal';
import useServiceGateway from '../../../hooks/useServiceGateway';

import type { Column } from '@ks-console/shared';

import { TextWrapper } from './styles';

const module = 'services';
const TYPE = 'SERVICE';
const store = serviceStore;
const { SERVICE_TYPES } = store;

const Services = () => {
  const authKey = module;
  const params = useParams();
  const { cluster } = params;
  const tableRef = useRef<TableRef>();

  const refetch = () => {
    tableRef.current?.refetch();
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store,
    params,
    callback: refetch,
  });

  const { editServiceModal } = useEditServiceModal({ store, callback: refetch });
  const { editServiceGateway } = useServiceGateway({ store, callback: refetch });

  const showAction = (record: any) => !record.isFedManaged;
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
        onClick: (_, record) => editYaml(record),
      },
      {
        key: 'editService',
        icon: <Icon name="network-router" />,
        text: t('EDIT_SERVICE'),
        action: 'edit',
        show: showAction,
        onClick: (_, record) => editServiceModal({ detail: record }),
      },
      {
        key: 'editGateway',
        icon: <Icon name="ip" />,
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: record => showAction(record) && record.type === SERVICE_TYPES.VirtualIP,
        onClick: (_, record) => editServiceGateway({ detail: record }),
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: showAction,
        onClick: (_, record) => del({ type: TYPE, resource: [record] }),
      },
    ],
  });

  const renderExternalService = (data: Record<string, any>) => {
    const text = {
      des: '-',
      title: '-',
    };

    if (data.specType === 'NodePort') {
      text.des = t('PORT_PL');
      text.title = data.ports
        .filter((port: Record<string, any>) => port.nodePort)
        .map((port: Record<string, any>) => `${port.nodePort}/${port.protocol}`)
        .join('; ');
    }

    if (data.specType === 'LoadBalancer') {
      text.des =
        data.loadBalancerIngress.length > 1 ? t('LOAD_BALANCERS_SCAP') : t('LOAD_BALANCER_SCAP');
      text.title = data.loadBalancerIngress.join('; ');
    }

    if (data.externalName) {
      return (
        <Text>
          <TextWrapper>
            <Tooltip content={data.externalName}>
              <span>{text.title}</span>
            </Tooltip>
          </TextWrapper>
        </Text>
      );
    }

    return (
      <Text>
        <TextWrapper>
          <div>{text.title}</div>
          <div>{t(`${text.des}`)}</div>
        </TextWrapper>
      </Text>
    );
  };

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (value, record) => (
        <Field
          avatar={<Avatar record={record} module={module} />}
          label={record.description || '-'}
          value={
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${record.name}`}>
              {getDisplayName(record)}
            </Link>
          }
        />
      ),
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '15%',
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
    },
    {
      title: t('INTERNAL_ACCESS_PL'),
      field: 'annotations["kubesphere.io/serviceType"]',
      canHide: true,
      width: '15%',
      render: (_, record) => {
        return (
          <Text>
            <TextWrapper>
              <div>{record.clusterIP || ''}</div>
              <div>{t(`${record.type}`)}</div>
            </TextWrapper>
          </Text>
        );
      },
    },
    {
      title: t('EXTERNAL_ACCESS'),
      field: 'specType',
      canHide: true,
      width: '20%',
      render: (_, record) => renderExternalService(record),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '12%',
      render: time => formatTime(time),
    },
    {
      title: '',
      field: 'more',
      canHide: true,
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
          const selectedRows = tableRef.current?.getSelectedFlatRows() as Record<string, any>[];
          del({ type: TYPE, resource: selectedRows });
        },
      },
    ],
  });

  const banner = {
    icon: <Icon name="appcenter" size={40} />,
    title: t('SERVICE'),
    description: t('SERVICE_DESC'),
  };

  const table = {
    ref: tableRef,
    columns,
    disableRowSelect: (row?: Record<string, any>) => row?.isFedManaged || false,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={store} hasNamespaceSelector />
    </>
  );
};

export default Services;
