/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { get, isUndefined } from 'lodash';
import {
  Column,
  DataTable,
  formatTime,
  getDisplayName,
  TableRef,
  getActions,
  FormattedCRD,
  useDetailPage,
  crdResourceStore,
  useCommonActions,
  useActionMenu,
} from '@ks-console/shared';
import { Card, Field } from '@kubed/components';
import { Eye, Pen, Trash } from '@kubed/icons';

const { mapper: formatCRDResources, getListUrl } = crdResourceStore;

function ResourceStatus() {
  const { cluster } = useParams();
  const tableRef = useRef<TableRef>();
  const totalItems = useRef<number>(0);
  const continueTokens = useRef<Record<number, string | null>>({ 0: null });
  const [parameters, setParameters] = useState<{ continue?: string; fieldSelector?: string }>({});
  const { detail } = useDetailPage<FormattedCRD>();
  const { group, latestVersion, module } = detail || {};

  const url = useMemo(() => {
    if (detail) {
      const resourceServed =
        detail?._originData?.metadata?.labels?.['kubesphere.io/resource-served'];
      return getListUrl({
        ksApi: resourceServed === 'true' || resourceServed === true,
        group,
        latestVersion,
        cluster,
        module,
      } as any);
    }

    return '';
  }, [detail]);

  const { editYaml, del } = useCommonActions({
    store: crdResourceStore,
    callback: () => {
      tableRef.current?.refetch();
    },
    // TODO: useCommonAction params should support more than pathParams
    params: {
      group,
      latestVersion,
      cluster,
      module,
    } as any,
  });

  const renderItemActions = useActionMenu({
    authKey: 'customresourcedefinitions',
    params: { cluster: cluster as string },
    actions: [
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'viewYaml',
        icon: <Eye />,
        text: t('VIEW_YAML'),
        action: 'view',
        show: !getActions({
          module: 'customresourcedefinitions',
          cluster,
        }).includes('edit'),
        onClick: record =>
          editYaml({
            ...record,
            readOnly: true,
          }),
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: del,
      },
    ],
  });
  const columns: Column[] = useMemo(() => {
    return [
      {
        title: t('NAME'),
        field: 'name',
        searchable: true,
        render: (_, record) => <Field value={getDisplayName(record)} label={record.description} />,
      },
      ...(detail?.scope === 'Namespaced'
        ? [
            {
              title: t('PROJECT_DEVOPS_PROJECT'),
              field: 'namespace',
            },
          ]
        : []),
      {
        title: t('CREATION_TIME_TCAP'),
        field: 'createTime',
        render: time => formatTime(time),
      },
      {
        title: ' ',
        width: 20,
        render: (value, record) => renderItemActions({ ...record }),
      },
    ];
  }, [detail]);

  const formatServerData = useCallback((serverData: Record<string, any>) => {
    // @ts-ignore
    const currentIndex = tableRef.current?.instance.state.pageIndex;
    let totals = totalItems.current;
    if (currentIndex === 0) {
      totals = serverData.items?.length + get(serverData, 'metadata.remainingItemCount', 0);
      totalItems.current = totals;
    }

    if (!isUndefined(currentIndex)) {
      continueTokens.current[currentIndex + 1] = get(serverData, 'metadata.continue', '');
    }

    return {
      ...serverData,
      totalItems: totals,
    };
  }, []);

  const handlePageChange = (pageIndex: number) => {
    const continueStr = continueTokens.current[pageIndex];
    setParameters({
      ...parameters,
      continue: pageIndex === 0 ? '' : (continueStr ?? ''),
    });
  };

  const handleFilterInputChange = (value: string) => {
    const resourceServed = detail?._originData?.metadata?.labels?.['kubesphere.io/resource-served'];
    if (resourceServed === 'true' || resourceServed === true) {
      return;
    }
    if (value) {
      setParameters({
        ...parameters,
        fieldSelector: `metadata.name=${value}`,
      });
    } else {
      Reflect.deleteProperty(parameters, 'fieldSelector');
      setParameters({ ...parameters });
    }
  };

  return (
    <>
      <Card sectionTitle={t('CUSTOM_RESOURCE_PL')} padding={0}>
        <DataTable
          ref={tableRef}
          url={url}
          columns={columns}
          tableName={`CRDResources${detail?.name}`}
          rowKey="name"
          onPageChange={handlePageChange}
          placeholder={t('SEARCH_BY_NAME')}
          serverDataFormat={formatServerData}
          simpleSearch={true}
          format={formatCRDResources}
          onFilterInputChange={handleFilterInputChange}
          parameters={parameters}
          hideSettingMenu={true}
        />
      </Card>
    </>
  );
}

export default ResourceStatus;
