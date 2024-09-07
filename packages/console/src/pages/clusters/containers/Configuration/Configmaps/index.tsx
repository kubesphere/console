/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useRef } from 'react';
import { merge, omit } from 'lodash';
import { useDisclosure } from '@kubed/hooks';
import { Field, notify } from '@kubed/components';
import { useParams, Link } from 'react-router-dom';

import {
  Icon,
  Column,
  TableRef,
  ListPage,
  formatTime,
  useActionMenu,
  getDisplayName,
  configMapStore,
  useCommonActions,
} from '@ks-console/shared';
import type { FormattedConfigMap } from '@ks-console/shared';

import { NAME } from './constants';
import { ConfigMapEditModal } from '../../../components';

function ConfigMaps(): JSX.Element {
  const { module, getDocsUrl, usePutMutation } = configMapStore;
  const params = useParams<'cluster' | 'namespace' | 'workspace'>();
  const { cluster = '' } = params;
  const tableRef = useRef<TableRef<FormattedConfigMap>>(null);
  const docUrl = getDocsUrl();
  const createConfigMapModal = useDisclosure();
  const configMapEditModal = useDisclosure();
  const [activeRecord, setActiveRecord] = useState<FormattedConfigMap>();
  const { mutate: mutateConfigMapSettingEdit, isLoading: isEditConfigMapLoading } = usePutMutation(
    {},
    {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleCloseConfigMapEditModal();
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    },
  );

  const desc = (
    <div className="banner-desc">
      {t('CONFIGMAP_DESC')}
      <Icon name="documentation" size={20} />
      <a href={docUrl} target="_blank">
        {t('LEARN_MORE')}
      </a>
    </div>
  );

  const banner = {
    icon: <Icon name="hammer" />,
    title: t('CONFIGMAP_PL'),
    description: docUrl ? desc : t('CONFIGMAP_DESC'),
  };

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: configMapStore,
    params: { cluster },
    callback,
  });

  const renderItemAction = useActionMenu<FormattedConfigMap>({
    authKey: module,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => !row.isFedManaged,
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'editConfigMap',
        icon: <Icon name="pen" />,
        text: t('EDIT_SETTINGS'),
        action: 'edit',
        show: row => !row.isFedManaged,
        onClick: record => {
          setActiveRecord(record);
          configMapEditModal.open();
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !row.isFedManaged,
        onClick: record => del({ ...record, type: NAME }),
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
        onClick: () => del(tableRef?.current?.getSelectedFlatRows() || []),
        props: {
          color: 'error',
        },
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
        },
        onClick: createConfigMapModal.open,
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
        return (
          <Field
            value={
              <Link to={`/clusters/${cluster}/projects/${row.namespace}/${module}/${value}`}>
                {getDisplayName(row)}
              </Link>
            }
            avatar={<Icon name="hammer" size={40} />}
            label={row.description || '-'}
          />
        );
      },
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '22%',
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
    },
    {
      title: t('FIELDS'),
      field: 'data',
      canHide: true,
      width: '13%',
      render: data => (data && Object.keys(data) ? Object.keys(data).join(',') : ''),
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
      id: 'more',
      title: ' ',
      width: 20,
      render: (_, row) => renderItemAction(row as FormattedConfigMap),
    },
  ];

  const table = {
    ref: tableRef,
    columns,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const handleEditConfigMap = (info: object) => {
    const data = merge(omit(activeRecord?._originData, 'data'), info);

    mutateConfigMapSettingEdit({
      params: {
        name: activeRecord?.name,
        namespace: activeRecord?.namespace,
      },
      data,
    });
  };

  const handleCloseConfigMapEditModal = () => {
    configMapEditModal.close();
    setActiveRecord(undefined);
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={configMapStore} hasNamespaceSelector />
      {configMapEditModal.isOpen && activeRecord && (
        <ConfigMapEditModal
          visible={true}
          isSubmitting={isEditConfigMapLoading}
          onOk={handleEditConfigMap}
          onCancel={handleCloseConfigMapEditModal}
          isFederated={false} // todo get isFederated value
          disableSelect={true}
          detail={activeRecord}
          cluster={cluster}
        />
      )}
    </>
  );
}

export default ConfigMaps;
