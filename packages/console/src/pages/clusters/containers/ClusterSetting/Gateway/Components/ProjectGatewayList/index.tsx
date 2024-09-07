/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { forwardRef, Ref, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  Column,
  DataTable,
  FormattedGateway,
  gatewayStore,
  OriginalGateway,
  TableRef,
  useActionMenu,
} from '@ks-console/shared';
import { Card, Empty, Tooltip } from '@kubed/components';
import { Appcenter, Pen, Trash, Update } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import { GatewayConfig } from '../../';

const { projectGatewayListUrl, mapper } = gatewayStore;

function ProjectGatewayList(props: {}, ref: Ref<TableRef | null>) {
  const tableRef = useRef<TableRef>();
  const { cluster } = useParams();
  const url = projectGatewayListUrl(cluster);
  const [gatewayConfigs, setGatewayConfigs] = useStore<GatewayConfig>('gatewayConfigs');
  const format = (data: OriginalGateway) => ({
    ...mapper(data),
    cluster,
    namespace: data?.metadata?.name?.split('kubesphere-router-')[1],
  });

  useImperativeHandle(ref, () => {
    return tableRef.current || null;
  });

  const getGatewayResource = (gatewayData: FormattedGateway) => {
    const name = gatewayData.name.split('kubesphere-router-')[1];
    const namespace = name === 'kubesphere-system' ? '' : name;
    return { cluster: gatewayData.cluster, namespace };
  };

  const renderDisabledTip = useCallback((record: FormattedGateway) => {
    if (!record.createTime) {
      return (
        <Tooltip content={t('UPDATE_GATEWAY_DESC')} placement="top">
          <Update size={20} color="#f5a623" fill="#ffe1be" />
        </Tooltip>
      );
    }
    return null;
  }, []);

  const renderItemActions = useActionMenu({
    authKey: 'gateways',
    params: {
      cluster,
    },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT'),
        action: 'edit',
        show: row => row.createTime,
        onClick: record => {
          setGatewayConfigs({
            ...gatewayConfigs,
            setVisible: true,
            gateway: record as FormattedGateway,
            payloads: getGatewayResource(record as FormattedGateway),
          });
        },
      },
      {
        key: 'update',
        icon: <Update />,
        text: t('UPDATE'),
        action: 'manate',
        show: row => !row.createTime,
        onClick: record => {
          setGatewayConfigs({
            ...gatewayConfigs,
            updateVisible: true,
            gateway: record as FormattedGateway,
            payloads: getGatewayResource(record as FormattedGateway),
          });
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: record => {
          setGatewayConfigs({
            ...gatewayConfigs,
            deleteVisible: true,
            gateway: record as FormattedGateway,
            payloads: {
              ...getGatewayResource(record as FormattedGateway),
              resource: record.name,
            },
          });
        },
      },
    ],
  });
  const columns: Column[] = useMemo(() => {
    return [
      {
        title: t('NAME'),
        field: 'name',
        sortable: true,
        searchable: true,
        render: (name, record) => {
          return (
            <>
              <span style={{ fontWeight: 700, cursor: 'auto', marginRight: '4px' }}>{name}</span>
              {renderDisabledTip(record as FormattedGateway)}
            </>
          );
        },
      },
      {
        title: t('ACCESS_MODE'),
        field: 'type',
      },
      {
        title: t('IP_ADDRESS'),
        field: 'defaultIngress',
        render: t => t || '',
      },
      {
        title: t('NODE_PORTS'),
        field: 'ports',
        render: (ports: FormattedGateway['ports']) => {
          return isEmpty(ports)
            ? '-'
            : ports.map(item => `${item.name?.toUpperCase()}: ${item.nodePort}`).join('/');
        },
      },
      {
        title: t('REPLICA_COUNT'),
        field: 'replicas',
      },
      {
        title: t('TRACING'),
        field: 'serviceMeshEnable',
        render: serviceMeshEnable => (serviceMeshEnable ? t('ON') : t('OFF')),
      },
      {
        id: 'more',
        title: '',
        width: 20,
        render: (value, record) => renderItemActions(record),
      },
    ];
  }, []);
  const renderBatchActions = useActionMenu({
    authKey: 'gateways',
    params: {
      cluster,
    },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          const selectNames = selectedFlatRows.map(item => item.name);
          const reqs = selectedFlatRows.map(t => {
            const name = t.name.split('kubesphere-router-')[1];
            const namespace = name === 'kubesphere-system' ? '' : name;
            return {
              namespace,
              cluster: t.cluster,
            };
          });
          setGatewayConfigs({
            ...gatewayConfigs,
            deleteVisible: true,
            payloads: {
              reqs,
              resource: selectNames.join(', '),
            },
          });
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  return (
    <DataTable
      format={data => format(data as OriginalGateway)}
      url={url}
      columns={columns}
      placeholder={t('SEARCH_BY_NAME')}
      tableName="projectGatewayList"
      rowKey="name"
      ref={tableRef}
      batchActions={renderBatchActions({})}
      emptyOptions={{
        element: (
          <Card padding="xl">
            <Empty
              title={t('EMPTY_WRAPPER', {
                resource: t('PROJECT_GATEWAY'),
              })}
              description={t('PROJECT_GATEWAY_EMPTY_DESC')}
              image={<Appcenter size={48} />}
            ></Empty>
          </Card>
        ),
        withoutTable: true,
      }}
    ></DataTable>
  );
}

export default forwardRef(ProjectGatewayList);
